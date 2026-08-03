const runtimeConfig = window.ASL_STUDY_RUNTIME || {};
const API_BASE = String(runtimeConfig.apiBase || '').replace(/\/$/, '');
function apiUrl(url) { return `${API_BASE}${url}`; }

const app = document.querySelector('#app');
const headerStatus = document.querySelector('#headerStatus');
const toast = document.querySelector('#toast');

const ACTIVE_SESSION_KEY = 'asl-motion-study-v2.active-session';
const progressKey = (sessionId) => `asl-motion-study-v2.progress.${sessionId}`;
const receiptKey = (sessionId) => `asl-motion-study-v2.receipt.${sessionId}`;

let study = null;
let session = null;
let progress = null;
let resumableSession = null;
let toastTimer = null;
let saveTimer = null;
const playbackRuntime = new Map();

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function api(url, options = {}) {
  const response = await fetch(apiUrl(url), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    // A missing JSON body is handled by the generic status message below.
  }

  if (!response.ok) {
    throw new Error(body?.error || `Request failed with status ${response.status}.`);
  }
  return body;
}

function showToast(message, isError = false) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.toggle('error', isError);
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

function loadLocalJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function saveLocalJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The study remains usable even if private browsing blocks local storage.
  }
}

function removeLocal(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage failures.
  }
}

function createEmptyProgress(currentSession) {
  const answers = {};
  for (const question of currentSession.questions) {
    for (const candidate of question.candidates) {
      answers[candidate.candidateId] = {
        questionId: question.id,
        scores: {},
        telemetry: {
          playCount: 0,
          watchedSeconds: 0,
          completedPlayback: false,
          maxProgressFraction: 0,
        },
      };
    }
  }

  return {
    schemaVersion: 2,
    startedAt: new Date().toISOString(),
    currentIndex: 0,
    answers,
  };
}

function normalizeProgress(currentSession, savedProgress) {
  const normalized = createEmptyProgress(currentSession);
  if (!savedProgress || savedProgress.schemaVersion !== 2) {
    return normalized;
  }

  normalized.startedAt = savedProgress.startedAt || normalized.startedAt;
  normalized.currentIndex = Math.max(
    0,
    Math.min(
      currentSession.questions.length - 1,
      Number(savedProgress.currentIndex) || 0
    )
  );

  for (const [candidateId, savedAnswer] of Object.entries(
    savedProgress.answers || {}
  )) {
    if (!normalized.answers[candidateId]) {
      continue;
    }
    normalized.answers[candidateId].scores = {
      ...(savedAnswer.scores || {}),
    };
    normalized.answers[candidateId].telemetry = {
      ...normalized.answers[candidateId].telemetry,
      ...(savedAnswer.telemetry || {}),
    };
  }
  return normalized;
}

function persistProgress(immediately = false) {
  if (!session || !progress) {
    return;
  }

  const saveNow = () => {
    progress.lastSavedAt = new Date().toISOString();
    saveLocalJson(progressKey(session.sessionId), progress);
    const status = document.querySelector('#autosave');
    if (status) {
      status.textContent = 'Saved on this device';
    }
  };

  clearTimeout(saveTimer);
  if (immediately) {
    saveNow();
  } else {
    saveTimer = setTimeout(saveNow, 120);
  }
}

function getAnswer(candidateId) {
  if (!progress.answers[candidateId]) {
    progress.answers[candidateId] = {
      scores: {},
      telemetry: {
        playCount: 0,
        watchedSeconds: 0,
        completedPlayback: false,
        maxProgressFraction: 0,
      },
    };
  }
  return progress.answers[candidateId];
}

function isCandidateComplete(candidateId) {
  const score = Number(
    progress?.answers?.[candidateId]?.scores?.overallQuality
  );
  return Number.isInteger(score) && score >= 1 && score <= 10;
}

function isQuestionComplete(question) {
  return question.candidates.every((candidate) =>
    isCandidateComplete(candidate.candidateId)
  );
}

function completionStats() {
  let completedQuestions = 0;
  let completedCandidates = 0;
  let totalCandidates = 0;

  for (const question of session.questions) {
    if (isQuestionComplete(question)) {
      completedQuestions += 1;
    }
    for (const candidate of question.candidates) {
      totalCandidates += 1;
      if (isCandidateComplete(candidate.candidateId)) {
        completedCandidates += 1;
      }
    }
  }

  return {
    completedQuestions,
    completedCandidates,
    totalCandidates,
  };
}

function renderLandingPage() {
  headerStatus.textContent = `${study.questionCount} items · ${study.estimatedTime}`;

  const resumeCard =
    resumableSession && !resumableSession.submitted
      ? `
        <section class="resume-card">
          <div>
            <strong>Continue your saved session</strong>
            <p>Your candidate order and completed scores will be restored on this device.</p>
          </div>
          <div class="button-row">
            <button class="btn btn-secondary" id="discardSession" type="button">Start new</button>
            <button class="btn btn-primary" id="resumeSession" type="button">Resume</button>
          </div>
        </section>
      `
      : '';

  app.innerHTML = `
    ${resumeCard}
    <section class="landing-card">
      <div class="landing-copy">
        <p class="eyebrow">Academic user study</p>
        <h1>${escapeHtml(study.title)}</h1>
        <p class="landing-lead">
          For each English sentence, watch three anonymized American Sign Language
          motion renderings and assign one <strong>Overall Quality</strong> score to
          each candidate.
        </p>

        <div class="study-facts" aria-label="Study overview">
          <span><b>${study.questionCount}</b> sentence-level items</span>
          <span><b>3</b> blinded candidates per item</span>
          <span><b>1–10</b> overall rating scale</span>
        </div>

        <div class="rating-brief">
          <div class="rating-brief-title">When assigning the overall score, consider</div>
          <div class="consideration-list">
            ${study.considerations
              .map((item) => `<span>${escapeHtml(item)}</span>`)
              .join('')}
          </div>
          <p>
            Focus on the signed motion rather than mesh color, camera framing,
            or rendering appearance. Videos may be replayed as needed.
          </p>
        </div>

        <div class="landing-actions">
          <button class="btn btn-primary btn-large" id="beginStudy" type="button">
            Start study <span aria-hidden="true">→</span>
          </button>
          <p>${escapeHtml(study.privacyNotice)}</p>
        </div>

        <p class="voluntary-note">
          Participation is voluntary. You may stop at any time before submission.
        </p>
        <p class="inline-error" id="landingError" hidden></p>
      </div>
    </section>
  `;

  document
    .querySelector('#beginStudy')
    .addEventListener('click', beginAnonymousSession);

  document.querySelector('#resumeSession')?.addEventListener('click', () => {
    session = resumableSession;
    progress = normalizeProgress(
      session,
      loadLocalJson(progressKey(session.sessionId))
    );
    renderQuestion(progress.currentIndex);
  });

  document.querySelector('#discardSession')?.addEventListener('click', () => {
    if (resumableSession?.sessionId) {
      removeLocal(progressKey(resumableSession.sessionId));
    }
    removeLocal(ACTIVE_SESSION_KEY);
    resumableSession = null;
    renderLandingPage();
  });
}

async function beginAnonymousSession() {
  const button = document.querySelector('#beginStudy');
  const errorBox = document.querySelector('#landingError');
  button.disabled = true;
  button.textContent = 'Creating blinded assignment…';
  errorBox.hidden = true;

  try {
    session = await api('/api/session', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    progress = createEmptyProgress(session);
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, session.sessionId);
    } catch {
      // The study remains usable without persistence.
    }
    persistProgress(true);
    renderQuestion(0);
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.hidden = false;
    button.disabled = false;
    button.innerHTML = 'Start study <span aria-hidden="true">→</span>';
  }
}

function renderScoreScale(candidateId) {
  const selected = Number(
    progress.answers[candidateId]?.scores?.overallQuality
  );

  let buttons = '';
  for (let score = 1; score <= 10; score += 1) {
    const active = selected === score;
    buttons += `
      <button
        type="button"
        class="score-btn${active ? ' selected' : ''}"
        role="radio"
        aria-checked="${active}"
        aria-label="Overall Quality ${score} out of 10"
        data-candidate-id="${candidateId}"
        data-score="${score}"
      >${score}</button>
    `;
  }

  return `
    <div class="score-scale-wrap">
      <div class="score-scale" role="radiogroup" aria-label="Overall Quality rating">
        ${buttons}
      </div>
      <div class="scale-anchors">
        <span>1 · Very poor</span>
        <span>5 · Acceptable</span>
        <span>10 · Excellent</span>
      </div>
    </div>
  `;
}

function renderCandidateCard(candidate) {
  const complete = isCandidateComplete(candidate.candidateId);
  return `
    <article class="candidate-card">
      <header class="candidate-header">
        <div class="candidate-identity">
          <span class="candidate-badge">${candidate.label}</span>
          <div>
            <h2 class="candidate-title">Candidate ${candidate.label}</h2>
            <p class="candidate-subtitle">Anonymized ASL motion rendering</p>
          </div>
        </div>
        <span
          class="completion-badge${complete ? ' complete' : ''}"
          data-completion-badge="${candidate.candidateId}"
        >${complete ? 'Score selected' : 'Score required'}</span>
      </header>

      <div class="video-wrap">
        <div class="blind-mask">Candidate ${candidate.label}</div>
        <video
          src="${escapeHtml(candidate.videoUrl)}"
          controls
          controlslist="nodownload nofullscreen noremoteplayback"
          disablepictureinpicture
          muted
          playsinline
          preload="metadata"
          data-video-id="${candidate.candidateId}"
        ></video>
      </div>

      <section class="overall-rating-section">
        <div class="overall-rating-copy">
          <div>
            <span class="rating-label">Overall Quality</span>
            <span class="rating-subline">Select one score from 1 to 10.</span>
          </div>
          <span class="rating-scale-note">Higher is better</span>
        </div>
        ${renderScoreScale(candidate.candidateId)}
      </section>
    </article>
  `;
}

function renderQuestion(index) {
  const boundedIndex = Math.max(
    0,
    Math.min(session.questions.length - 1, index)
  );
  progress.currentIndex = boundedIndex;
  persistProgress(true);

  const question = session.questions[boundedIndex];
  const stats = completionStats();
  const percentage = ((boundedIndex + 1) / session.questions.length) * 100;
  headerStatus.textContent = `Question ${boundedIndex + 1} of ${session.questions.length}`;

  app.innerHTML = `
    <nav class="study-nav" aria-label="Study progress">
      <div class="progress-meta">
        <span>Question ${boundedIndex + 1} of ${session.questions.length}</span>
        <span>${stats.completedQuestions} completed</span>
      </div>
      <div class="progress-track" aria-hidden="true">
        <div class="progress-fill" style="width: ${percentage}%"></div>
      </div>
    </nav>

    <section class="question-head">
      <div class="question-kicker">
        <span class="question-number">Evaluation item ${String(
          boundedIndex + 1
        ).padStart(2, '0')}</span>
        <span class="autosave-status" id="autosave">Saved on this device</span>
      </div>

      <article class="sentence-card">
        <div class="sentence-label">Target English sentence</div>
        <h1 class="question-title">${escapeHtml(question.text)}</h1>
      </article>

      <div class="playback-toolbar">
        <p>Videos are muted. Use synchronized controls for direct comparison.</p>
        <div class="toolbar-actions">
          <button class="btn btn-ghost" id="pauseAll" type="button">Pause all</button>
          <button class="btn btn-secondary" id="restartAll" type="button">Restart all</button>
          <button class="btn btn-primary" id="playAll" type="button">Play all</button>
        </div>
      </div>
    </section>

    <section class="candidate-stack">
      ${question.candidates.map(renderCandidateCard).join('')}
    </section>

    <nav class="question-actions" aria-label="Question navigation">
      <button
        class="btn btn-secondary"
        id="previousQuestion"
        type="button"
        ${boundedIndex === 0 ? 'disabled' : ''}
      >← Previous</button>

      <p class="next-hint" id="nextHint">
        ${
          isQuestionComplete(question)
            ? 'All three Overall Quality scores are complete.'
            : 'Select one Overall Quality score for each candidate.'
        }
      </p>

      <button
        class="btn btn-accent"
        id="nextQuestion"
        type="button"
        ${isQuestionComplete(question) ? '' : 'disabled'}
      >${
        boundedIndex === session.questions.length - 1
          ? 'Review responses'
          : 'Next item'
      } →</button>
    </nav>
  `;

  document.querySelectorAll('.score-btn').forEach((button) => {
    button.addEventListener('click', handleScoreSelection);
  });
  document.querySelector('#previousQuestion').addEventListener('click', () => {
    renderQuestion(boundedIndex - 1);
  });
  document.querySelector('#nextQuestion').addEventListener('click', () => {
    if (boundedIndex === session.questions.length - 1) {
      renderReview();
    } else {
      renderQuestion(boundedIndex + 1);
    }
  });
  document.querySelector('#playAll').addEventListener('click', () => {
    playAllVideos(true);
  });
  document.querySelector('#pauseAll').addEventListener('click', pauseAllVideos);
  document.querySelector('#restartAll').addEventListener('click', restartAllVideos);

  attachPlaybackTelemetry();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function handleScoreSelection(event) {
  const button = event.currentTarget;
  const candidateId = button.dataset.candidateId;
  const score = Number(button.dataset.score);
  getAnswer(candidateId).scores.overallQuality = score;

  const scale = button.closest('[role="radiogroup"]');
  scale.querySelectorAll('.score-btn').forEach((scoreButton) => {
    const isSelected = Number(scoreButton.dataset.score) === score;
    scoreButton.classList.toggle('selected', isSelected);
    scoreButton.setAttribute('aria-checked', String(isSelected));
  });

  const question = session.questions[progress.currentIndex];
  for (const candidate of question.candidates) {
    const complete = isCandidateComplete(candidate.candidateId);
    const badge = document.querySelector(
      `[data-completion-badge="${CSS.escape(candidate.candidateId)}"]`
    );
    if (badge) {
      badge.textContent = complete ? 'Score selected' : 'Score required';
      badge.classList.toggle('complete', complete);
    }
  }

  const complete = isQuestionComplete(question);
  document.querySelector('#nextQuestion').disabled = !complete;
  document.querySelector('#nextHint').textContent = complete
    ? 'All three Overall Quality scores are complete.'
    : 'Select one Overall Quality score for each candidate.';
  persistProgress();
}

function activeVideos() {
  return [...document.querySelectorAll('video[data-video-id]')];
}

async function playAllVideos(restart = false) {
  if (restart) {
    activeVideos().forEach((video) => {
      video.currentTime = 0;
    });
  }
  await Promise.allSettled(activeVideos().map((video) => video.play()));
}

function pauseAllVideos() {
  activeVideos().forEach((video) => video.pause());
}

function restartAllVideos() {
  activeVideos().forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
}

function attachPlaybackTelemetry() {
  for (const video of activeVideos()) {
    const candidateId = video.dataset.videoId;
    const answer = getAnswer(candidateId);
    playbackRuntime.set(candidateId, { lastTime: video.currentTime });

    video.addEventListener('play', () => {
      answer.telemetry.playCount = Number(answer.telemetry.playCount || 0) + 1;
      playbackRuntime.set(candidateId, { lastTime: video.currentTime });
      persistProgress();
    });

    video.addEventListener('seeking', () => {
      playbackRuntime.set(candidateId, { lastTime: video.currentTime });
    });

    video.addEventListener('timeupdate', () => {
      const runtime = playbackRuntime.get(candidateId) || {
        lastTime: video.currentTime,
      };
      const delta = video.currentTime - runtime.lastTime;
      if (delta > 0 && delta <= 1.5) {
        answer.telemetry.watchedSeconds =
          Number(answer.telemetry.watchedSeconds || 0) + delta;
      }
      runtime.lastTime = video.currentTime;
      playbackRuntime.set(candidateId, runtime);

      if (video.duration > 0) {
        answer.telemetry.maxProgressFraction = Math.max(
          Number(answer.telemetry.maxProgressFraction || 0),
          Math.min(1, video.currentTime / video.duration)
        );
      }
      persistProgress();
    });

    video.addEventListener('ended', () => {
      answer.telemetry.completedPlayback = true;
      answer.telemetry.maxProgressFraction = 1;
      persistProgress();
    });
  }
}

function renderReview() {
  pauseAllVideos();
  const stats = completionStats();
  const complete = stats.completedQuestions === session.questions.length;
  headerStatus.textContent = 'Review and submit';

  app.innerHTML = `
    <section class="review-head">
      <p class="eyebrow">Final review</p>
      <h1 class="review-title">Review your scores.</h1>
      <p class="review-lead">
        Every item should contain one Overall Quality score for each of the
        three anonymized candidates. You may return to any item before submitting.
      </p>

      <div class="meta-row">
        <span class="meta-chip"><i></i>${stats.completedQuestions} of ${
          session.questions.length
        } items complete</span>
        <span class="meta-chip"><i></i>${stats.completedCandidates} of ${
          stats.totalCandidates
        } candidate scores complete</span>
      </div>

      <div class="review-grid">
        ${session.questions
          .map(
            (question, index) => `
              <button
                class="review-item${isQuestionComplete(question) ? ' complete' : ''}"
                data-question-index="${index}"
                type="button"
              >
                <strong>Item ${String(index + 1).padStart(2, '0')}</strong>
                <span>${
                  isQuestionComplete(question)
                    ? 'Complete'
                    : 'Incomplete — return to score'
                }</span>
              </button>
            `
          )
          .join('')}
      </div>

      <section class="review-submit">
        <p>
          ${
            complete
              ? 'All required scores are complete. Submission is final for this session.'
              : 'Some items are incomplete.'
          }
        </p>
        <div class="button-row">
          <button class="btn btn-secondary" id="returnToStudy" type="button">
            Return to study
          </button>
          <button
            class="btn btn-accent"
            id="submitStudy"
            type="button"
            ${complete ? '' : 'disabled'}
          >Submit responses</button>
        </div>
      </section>
    </section>
  `;

  document.querySelectorAll('[data-question-index]').forEach((button) => {
    button.addEventListener('click', () => {
      renderQuestion(Number(button.dataset.questionIndex));
    });
  });
  document.querySelector('#returnToStudy').addEventListener('click', () => {
    renderQuestion(progress.currentIndex);
  });
  document.querySelector('#submitStudy').addEventListener('click', submitStudy);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function submitStudy() {
  if (completionStats().completedQuestions !== session.questions.length) {
    showToast('Complete every candidate score before submitting.', true);
    return;
  }

  const submitButton = document.querySelector('#submitStudy');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting securely…';

  const answers = [];
  for (const question of session.questions) {
    for (const candidate of question.candidates) {
      const answer = getAnswer(candidate.candidateId);
      answers.push({
        questionId: question.id,
        candidateId: candidate.candidateId,
        scores: answer.scores,
        telemetry: answer.telemetry,
      });
    }
  }

  try {
    const receipt = await api('/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: session.sessionId,
        startedAt: progress.startedAt,
        answers,
      }),
    });
    saveLocalJson(receiptKey(session.sessionId), receipt);
    renderCompletion(receipt);
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit responses';
    showToast(error.message, true);
  }
}

function renderCompletion(receipt) {
  headerStatus.textContent = 'Submission complete';
  app.innerHTML = `
    <section class="complete-card">
      <div class="complete-icon">✓</div>
      <p class="eyebrow">Response recorded</p>
      <h1 class="complete-title">Thank you.</h1>
      <p class="complete-lead">
        Your ASL motion-quality scores have been submitted successfully.
        You may now close this browser window.
      </p>
      <div class="receipt">
        <span>Anonymous response receipt</span>
        <code>${escapeHtml(receipt.responseId || 'Recorded')}</code>
        <span>${escapeHtml(receipt.submittedAt || '')}</span>
      </div>
    </section>
  `;
}

async function initialize() {
  try {
    study = await api('/api/study');

    let activeSessionId = null;
    try {
      activeSessionId = localStorage.getItem(ACTIVE_SESSION_KEY);
    } catch {
      // No local resume support in this browser.
    }

    if (activeSessionId) {
      try {
        const candidateSession = await api(
          `/api/session/${encodeURIComponent(activeSessionId)}`
        );

        if (candidateSession.studyVersion !== study.version) {
          removeLocal(ACTIVE_SESSION_KEY);
          removeLocal(progressKey(activeSessionId));
        } else if (candidateSession.submitted) {
          renderCompletion(
            loadLocalJson(receiptKey(activeSessionId)) || {
              responseId: candidateSession.responseId,
            }
          );
          return;
        } else {
          resumableSession = candidateSession;
        }
      } catch {
        removeLocal(ACTIVE_SESSION_KEY);
      }
    }

    renderLandingPage();
  } catch (error) {
    headerStatus.textContent = 'Unavailable';
    app.innerHTML = `
      <section class="complete-card">
        <div class="complete-icon failure">!</div>
        <p class="eyebrow">Study unavailable</p>
        <h1 class="complete-title">The study could not be loaded.</h1>
        <p class="complete-lead">${escapeHtml(error.message)}</p>
      </section>
    `;
  }
}

initialize();

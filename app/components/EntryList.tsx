import type { Entry } from '../content';

export default function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="entries">
      {entries.map((entry) => (
        <li key={`${entry.org}-${entry.period}`} className="entry">
          <p className="date">{entry.period}</p>
          <div>
            <p className="entry-head">
              <span className="entry-org">
                {entry.orgUrl ? (
                  <a href={entry.orgUrl} target="_blank" rel="noopener noreferrer">
                    {entry.org}
                  </a>
                ) : (
                  entry.org
                )}
              </span>
              {entry.place ? <span className="entry-place">{entry.place}</span> : null}
            </p>
            <p className="entry-role">{entry.role}</p>
            {entry.note ? <p className="entry-note">{entry.note}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

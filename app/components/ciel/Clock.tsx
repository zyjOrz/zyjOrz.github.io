'use client';

import { useEffect, useState } from 'react';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const pad = (n: number) => String(n).padStart(2, '0');

// Ticks once a second after hydration; before that the build date is shown.
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

export function DateStamp({ built, children }: { built: string; children?: React.ReactNode }) {
  const now = useNow();
  const date = now ? `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())}` : built;
  const weekday = now ? WEEKDAYS[now.getDay()] : '';
  const time = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : '--:--:--';

  return (
    <div className="datestamp" aria-hidden="true">
      <p className="datestamp-date">
        {date}
        {weekday ? <span className="tag-ink">{weekday}</span> : null}
      </p>
      <p className="datestamp-meta">
        {children}
        <span className="datestamp-time">{time}</span>
      </p>
    </div>
  );
}

export function Greeting() {
  const now = useNow();
  const hour = now ? now.getHours() : 9;
  const text = hour >= 5 && hour < 12 ? 'Bonjour,' : hour >= 12 && hour < 18 ? 'Bon après-midi,' : 'Bonsoir,';
  return (
    <p className="greeting" lang="fr">
      {text}
    </p>
  );
}

export function TimeOnly() {
  const now = useNow();
  return <span>{now ? `${pad(now.getHours())}:${pad(now.getMinutes())}` : '--:--'}</span>;
}

import type { Entry } from '../content';
import { pad2, span } from './format';

export default function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ol className="rows">
      {entries.map((entry, index) => {
        const [from, to] = span(entry.period);
        return (
          <li key={`${entry.org}-${entry.period}`} className="row entry">
            <span className="row-index" aria-hidden="true">
              {pad2(index + 1)}
            </span>
            <div className="row-main">
              <p className="entry-org">
                {entry.orgUrl ? (
                  <a href={entry.orgUrl} target="_blank" rel="noopener noreferrer">
                    {entry.org}
                  </a>
                ) : (
                  entry.org
                )}
              </p>
              <p className="entry-role">{entry.role}</p>
              {entry.note ? <p className="entry-note">{entry.note}</p> : null}
              {entry.place ? <p className="row-meta">{entry.place}</p> : null}
            </div>
            <p className="row-date">
              <span>{from}</span>
              {to ? <span>— {to}</span> : null}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

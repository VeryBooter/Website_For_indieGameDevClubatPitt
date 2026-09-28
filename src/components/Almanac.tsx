import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { events } from '../data/club';
export function monthCells(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return Array.from({ length: Math.ceil((first + days) / 7) * 7 }, (_, index) => index >= first && index < first + days ? index - first + 1 : null);
}
export function CalendarFrame({ className = '' }: { className?: string }) {
  return <svg className={`calendar-frame ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><rect x=".5" y=".5" width="99" height="99" pathLength="1" vectorEffect="non-scaling-stroke" /></svg>;
}
export function Almanac() {
  // Deterministic first render keeps generated HTML and hydration consistent.
  const [month, setMonth] = useState({ year: 2026, month: 8 });
  const [today, setToday] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [turn, setTurn] = useState(0);
  const [ready, setReady] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const locked = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    const date = new Date();
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setMonth({ year: date.getFullYear(), month: date.getMonth() }); setToday(iso);
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting && entries[0].intersectionRatio >= .25), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); clearTimeout(timeout.current); };
  }, []);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout> | undefined;
    const begin = () => {
      clearTimeout(timer);
      if (!visible || preference.matches) { setReady(true); return; }
      setReady(false);
      timer = setTimeout(() => setReady(true), 4200);
    };
    begin();
    preference.addEventListener('change', begin);
    return () => { clearTimeout(timer); preference.removeEventListener('change', begin); };
  }, [visible, turn]);
  const change = (delta: number) => {
    if (locked.current) return;
    locked.current = true;
    setTurn(value => value + 1); setSelected(null);
    setMonth(value => { const date = new Date(Date.UTC(value.year, value.month + delta, 1)); return { year: date.getUTCFullYear(), month: date.getUTCMonth() }; });
    timeout.current = setTimeout(() => { locked.current = false; }, 600);
  };
  const title = new Date(Date.UTC(month.year, month.month)).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const toISO = (day: number) => `${month.year}-${String(month.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const matching = events.filter(event => selected ? event.date === selected : event.date.startsWith(`${month.year}-${String(month.month + 1).padStart(2, '0')}`));
  return <div ref={root} className={`almanac${visible ? ' is-visible' : ''}${!ready ? ' is-animating' : ''}`}>
    <span className="calendar-terminal-cursor" aria-hidden="true" /><div className="almanac-header"><span className="eyebrow">CLUB ALMANAC</span><span className="almanac-year">{month.year}</span></div>
    <div className="almanac-navigation"><button aria-label="Previous month" onClick={() => change(-1)}>←</button><h3 aria-live="polite">{title}</h3><button aria-label="Next month" onClick={() => change(1)}>→</button></div>
    <div className="calendar-paper" key={`${month.year}-${month.month}-${turn}`} >
      <div className="calendar-weekdays" aria-hidden="true">{['S','M','T','W','T','F','S'].map((day, index) => <span key={index}>{day}</span>)}</div>
      <div className="calendar-grid" role="group" aria-label={title} inert={!ready || undefined}>{monthCells(month.year, month.month).map((day, index) => {
        const date = day ? toISO(day) : '';
        const hasEvent = events.some(event => event.date === date);
        return <div className="calendar-cell" key={index} style={{ '--cell': index } as CSSProperties}>
          <CalendarFrame />
          <svg className="calendar-wave" viewBox="0 0 60 50" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d={index % 2 === 0 ? 'M0 25C15 0 45 0 60 25' : 'M0 25C15 50 45 50 60 25'} /><circle className={index % 2 ? 'eye-ccw' : 'eye-cw'} pathLength="1" cx="30" cy="25" r="3" /></svg>
          {day && <button className={hasEvent ? 'has-event' : undefined} aria-label={`${title} ${day}${hasEvent ? ', club event' : ''}`} aria-current={date === today ? 'date' : undefined} aria-pressed={date === selected} onClick={() => setSelected(date === selected ? null : date)}>{day}</button>}
        </div>;
      })}</div>
    </div>
    <div className="almanac-agenda" aria-live="polite" aria-busy={!ready}><div className="almanac-agenda-content" inert={!ready || undefined}>{selected && <p className="small-label">{selected}</p>}{matching.length ? matching.map(event => <div key={event.id}><strong>{event.title}</strong><p>{event.date} · {event.time} · {event.location}</p>{event.url && <a className="text-link" href={event.url}>Event details ↗</a>}</div>) : <p>{selected ? 'No confirmed events on this date.' : 'No confirmed events this month.'}</p>}</div></div>
  </div>;
}

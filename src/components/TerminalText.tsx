import { useEffect, useState } from 'react';

/** Keeps the final text's layout and accessible name while the cursor types it. */
export function TerminalText({ text, play, replay = 0, delay = 0 }: { text: string; play: boolean; replay?: number; delay?: number }) {
  const [count, setCount] = useState(text.length);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const finish = () => { cancelled = true; clearTimeout(timer); setCount(text.length); };
    if (!play || motion.matches) { setCount(text.length); return; }
    setCount(0);
    let next = 0;
    const type = () => {
      if (cancelled) return;
      setCount(++next);
      if (next < text.length) timer = setTimeout(type, 45);
    };
    timer = setTimeout(type, delay + 120);
    motion.addEventListener('change', finish);
    return () => { finish(); motion.removeEventListener('change', finish); };
  }, [text, play, replay, delay]);
  return <span className="terminal-text"><span className="sr-only">{text}</span><span aria-hidden="true"><span className={`terminal-prefix${count < text.length ? ' is-typing' : ''}`}>{text.slice(0, count)}</span><span className="terminal-remainder">{text.slice(count)}</span></span></span>;
}

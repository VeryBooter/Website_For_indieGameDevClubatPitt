import { useEffect, useRef } from 'react';

/** One pen cursor follows the same row paths and timing as the calendar wave. */
export function CalendarWaveCursor({ rows, active, replay }: { rows: number; active: boolean; replay: number }) {
  const svg = useRef<SVGSVGElement>(null);
  const cursor = useRef<SVGGElement>(null);
  useEffect(() => {
    const pen = cursor.current;
    const paths = svg.current?.querySelectorAll<SVGPathElement>('path');
    if (!pen || !paths) return;
    pen.style.opacity = '0';
    if (!active || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lengths = Array.from(paths, path => path.getTotalLength());
    const started = performance.now();
    let frame = 0;
    const draw = (time: number) => {
      const elapsed = time - started - 500;
      const row = Math.floor(elapsed / 420);
      if (row >= rows) { pen.style.opacity = '0'; return; }
      if (row >= 0) {
        const point = paths[row].getPointAtLength((elapsed % 420) / 420 * lengths[row]);
        pen.setAttribute('transform', `translate(${point.x} ${point.y})`);
        pen.style.opacity = '1';
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); pen.style.opacity = '0'; };
  }, [rows, active, replay]);
  return <svg ref={svg} className="calendar-wave-cursor" viewBox={`0 0 420 ${rows * 50}`} preserveAspectRatio="none" aria-hidden="true">
    {Array.from({ length: rows }, (_, row) => <path key={row} fill="none" stroke="none" d={`M0 ${row * 50 + 25}` + Array.from({ length: 7 }, (_, column) => {
      const x = column * 60;
      const y = row * 50 + ((row * 7 + column) % 2 === 0 ? 0 : 50);
      return `C${x + 15} ${y} ${x + 45} ${y} ${x + 60} ${row * 50 + 25}`;
    }).join('')} />)}
    <g ref={cursor} style={{ opacity: 0 }}><rect x="-3" y="-8" width="6" height="16" fill="#39ed16" /></g>
  </svg>;
}

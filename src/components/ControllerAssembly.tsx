import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';

const outline = 'M30 29c-5 1-8 6-10 14l-6 25c-3 15 6 22 16 17 9-4 15-13 19-20h29c5 8 11 18 19 21 10 4 17-4 15-16l-6-29c-2-9-5-12-11-12H79l-3-5H55l-3 5H30Z';
const lights = [
  { x: 89, y: 41, color: '#8000ff' },
  { x: 97, y: 49, color: '#ff0022' },
  { x: 89, y: 57, color: '#00ef30' },
  { x: 81, y: 49, color: '#001dff' },
];
export function ControllerAssembly() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const arc = useRef<SVGGElement>(null);
  const played = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [replay, setReplay] = useState(0);
  const id = useId();
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false, frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!inView || played.current || motion.matches || document.documentElement.dataset.pageLoading || document.querySelector('.opening-stage,.page-transition')) return;
        played.current = true;
        setPlaying(true);
      });
    };
    const visibility = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting && entry.intersectionRatio >= .4; check(); }, { threshold: .4 });
    if (root.current) visibility.observe(root.current);
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('pitt:loaded', check);
    const reduce = () => { if (motion.matches) setPlaying(false); else check(); };
    motion.addEventListener('change', reduce);
    check();
    return () => { visibility.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('pitt:loaded', check); motion.removeEventListener('change', reduce); };
  }, []);
  useEffect(() => {
    if (!playing || !path.current || !arc.current) return;
    const curve = path.current, spark = arc.current;
    const length = curve.getTotalLength();
    const started = performance.now();
    let frame = 0;
    const trace = (time: number) => {
      const progress = Math.min(1, Math.max(0, (time - started - 250) / 2400));
      const point = curve.getPointAtLength(progress * length);
      spark.setAttribute('transform', `translate(${point.x} ${point.y})`);
      if (progress < 1) frame = requestAnimationFrame(trace);
    };
    frame = requestAnimationFrame(trace);
    const done = setTimeout(() => setPlaying(false), 5400);
    return () => { cancelAnimationFrame(frame); clearTimeout(done); };
  }, [playing, replay]);
  return <figure ref={root} className="hero-art controller-assembly">
    <div className={`controller-stage${playing ? ' is-playing' : ''}`} key={replay}>
      <svg viewBox="0 0 128 128" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>iGDC controller logo: welded outline, assembled controls, and four colored buttons</title>
        <defs><filter id={`${id}-glow`} x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="1.5" /></filter></defs>
        <rect width="128" height="128" rx="2" fill="#080b0a" />
        <path className="assembly-guide" d={outline} fill="none" stroke="#34443d" strokeWidth=".3" strokeDasharray="1 2" />
        <path ref={path} className="assembly-outline" d={outline} pathLength="1" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <g className="assembly-shoulders" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"><path d="M32 28l2-5c2-3 10-3 13-1l2 6m31 0 1-5c2-3 10-3 13-1l2 7" /></g>
        <g className="assembly-dpad"><path d="M36 39h6v7h7v6h-7v7h-6v-7h-7v-6h7Z" fill="#fff" /></g>
        {lights.map((light, index) => <g className="assembly-button" key={light.color} style={{ '--light-delay': `${3750 + index * 280}ms` } as CSSProperties}>
          <circle className="assembly-button-glow" cx={light.x} cy={light.y} r="6" fill={light.color} filter={`url(#${id}-glow)`} />
          <circle cx={light.x} cy={light.y} r="4" fill={light.color} />
        </g>)}
        <g className="assembly-lettering" fill="#fff"><path d="M38 94h5v18h-5Z" /><path d="M47 94h19v5H52v8h9v-4h5v9H47Z" /><path d="M70 94h13l7 9-7 9H70Zm5 5v8h5l4-4-4-4Z" fillRule="evenodd" /></g>
        <g ref={arc} className="assembly-arc" aria-hidden="true">
          <circle r="5" fill="#a9edff" filter={`url(#${id}-glow)`} />
          <g className="arc-sparks" stroke="#ffc77a" strokeWidth=".55" strokeLinecap="round">{Array.from({ length: 10 }, (_, index) => <path key={index} d={`M${2 + index % 2} 0L${7 + index % 4 * 2} ${index % 2 ? 1 : -1}`} transform={`rotate(${index * 36})`} />)}</g>
          <path d="M-3-1l2-2 1 3 2-2 1 3" fill="none" stroke="#c5f5ff" strokeWidth="1" />
          <circle r="1.8" fill="white" />
        </g>
      </svg>
    </div>
    <figcaption><span>Imagine. Make. Play.</span><button className="logo-replay" disabled={playing} onClick={() => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { setReplay(value => value + 1); setPlaying(true); } }} aria-label="Replay logo assembly">Replay ↺</button></figcaption>
  </figure>;
}

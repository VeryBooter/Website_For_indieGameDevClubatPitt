import { useEffect, useRef, useState } from 'react';
import { club } from '../data/club';
import { shouldPlayIntro } from './introPolicy';
export const INTRO_KEY = 'pitt-igdc:opening-seen:v1';
export const INTRO_DURATION = 2400;
/** A decorative enhancement: it never owns scrolling, focus, or the content. */
export function OpeningPlan({ replay = 0 }: {
    replay?: number;
}) {
    const [playing, setPlaying] = useState(false);
    const skipButton = useRef<HTMLButtonElement>(null);
    const lastReplay = useRef(0);
    const finish = () => {
        if (document.activeElement === skipButton.current)
            document.getElementById('hero-title')?.focus({ preventScroll: true });
        setPlaying(false);
    };
    useEffect(() => {
        if (!club.introEnabled)
            return;
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const requested = replay > lastReplay.current;
        lastReplay.current = replay;
        let seen = false;
        try {
            seen = sessionStorage.getItem(INTRO_KEY) === '1';
        }
        catch { /* Storage may be unavailable. */ }
        if (!shouldPlayIntro({ enabled: club.introEnabled, reducedMotion: motion.matches, replay: requested, seen, deepLink: Boolean(window.location.hash) }))
            return;
        try {
            sessionStorage.setItem(INTRO_KEY, '1');
        }
        catch { /* Animation never depends on storage. */ }
        setPlaying(true);
        const timeout = window.setTimeout(finish, INTRO_DURATION);
        const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape')
            finish(); };
        const onMotion = () => { if (motion.matches)
            finish(); };
        window.addEventListener('keydown', onKey);
        motion.addEventListener('change', onMotion);
        return () => { clearTimeout(timeout); window.removeEventListener('keydown', onKey); motion.removeEventListener('change', onMotion); };
    }, [replay]);
    if (!playing)
        return null;
    return <div className="opening-stage" data-testid="opening-plan">
    <div className="intro-veil" aria-hidden="true"/>
    <div className="unfolding-plan" aria-hidden="true">
      <div className="plan-panel panel-left"><span className="plan-cross">+</span><span className="plan-label">01 / IMAGINE</span></div>
      <div className="plan-panel panel-center"><svg className="plan-route" viewBox="0 0 260 300"><path d="M25 250V175H115V110H210V40"/><circle cx="25" cy="250" r="8"/><rect x="199" y="29" width="22" height="22"/><path d="m100 100 15-10 15 10-15 10Z"/></svg><span className="plan-label">02 / MAKE</span></div>
      <div className="plan-panel panel-right"><span className="plan-cross">+</span><span className="plan-label">03 / PLAY</span></div>
    </div>
    <svg className="plan-maker" viewBox="0 0 130 155" aria-hidden="true">
      <g fill="none" stroke="#2c342e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M51 107 43 141 30 144M73 109 82 139 94 142"/>
        <path d="M47 66Q62 58 76 68L79 112 43 112Z" fill="#e4e7dc"/>
        <circle cx="62" cy="42" r="18" fill="#f5f3ec"/>
        <path d="M44 41q-1-23 18-22 21 2 19 21l-13-9-21 6" fill="#2c342e"/>
        <path d="M58 48h12M57 41h1M68 41h1" strokeWidth="2"/>
        <g className="maker-arm arm-left"><path d="M47 72 25 91 12 76"/><circle cx="12" cy="76" r="4" fill="#f5f3ec"/></g>
        <g className="maker-arm arm-right"><path d="M76 72 96 87 119 71"/><circle cx="119" cy="71" r="4" fill="#f5f3ec"/></g>
        <path d="M58 71h10v12H58z" stroke="#9b4033" strokeWidth="2"/>
      </g>
    </svg>
    <button ref={skipButton} className="intro-skip" onClick={finish}>Skip opening <span aria-hidden="true">↗</span></button>
  </div>;
}

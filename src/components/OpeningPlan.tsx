import { useEffect, useRef, useState } from 'react';
import { club } from '../data/club';
import { shouldPlayIntro } from './introPolicy';
export const INTRO_KEY = 'pitt-igdc:scroll-opening-seen:v2';
export const INTRO_DURATION = 2400;
/** A decorative enhancement: it never owns scrolling, focus, or the content. */
export function OpeningPlan({ replay = 0 }: {
    replay?: number;
}) {
    const [playing, setPlaying] = useState(false);
    const [pageReady, setPageReady] = useState(false);
    useEffect(() => {
        const ready = () => setPageReady(true);
        if (!document.documentElement.dataset.pageLoading) ready();
        window.addEventListener('pitt:loaded', ready);
        return () => window.removeEventListener('pitt:loaded', ready);
    }, []);
    const skipButton = useRef<HTMLButtonElement>(null);
    const lastReplay = useRef(0);
    const finish = () => {
        if (document.activeElement === skipButton.current)
            document.getElementById('hero-title')?.focus({ preventScroll: true });
        setPlaying(false);
    };
    useEffect(() => {
        if (!pageReady || !club.introEnabled)
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
    }, [replay, pageReady]);
    if (!playing)
        return null;
    return <div className="opening-stage scroll-opening" data-testid="opening-plan">
      <div className="intro-veil" aria-hidden="true" />
      <div className="scroll-sheet" aria-hidden="true">
        <span className="scroll-caption">INDIE GAME DEV CLUB @ PITT · WORLD IN PROGRESS</span>
        <svg viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M70 320H260V200H430V90H640V190H800" strokeDasharray="8 7"/><path d="m240 185 35-20 35 20-35 20Zm190-100 35-20 35 20-35 20Zm340 100 35-20 35 20-35 20Z"/><circle cx="70" cy="320" r="14"/><path d="M70 300v40m-20-20h40"/><rect x="787" y="177" width="26" height="26" stroke="#9b4033"/></g></svg>
        <span className="scroll-caption scroll-caption-bottom">IMAGINE / MAKE / PLAY</span>
      </div>
      <div className="scroll-roller" aria-hidden="true"><span /><span /></div>
    <svg className="scroll-maker" viewBox="0 0 130 155" aria-hidden="true">
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

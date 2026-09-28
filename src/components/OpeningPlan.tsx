import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { club } from '../data/club';
import { shouldPlayIntro } from './introPolicy';
export const INTRO_KEY = 'pitt-igdc:map-unroll-seen:v3';
export const INTRO_DURATION = 2800;
/** Unrolls the actual home surface by uncovering it behind a moving paper curl. */
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
    useEffect(() => {
        const main = document.getElementById('main');
        if (!playing || !main) return;
        const wasInert = main.inert;
        main.inert = true;
        return () => { main.inert = wasInert; };
    }, [playing]);
    const skipButton = useRef<HTMLButtonElement>(null);
    const lastReplay = useRef(0);
    const finish = () => {
        if (document.activeElement === skipButton.current)
            requestAnimationFrame(() => document.getElementById('hero-title')?.focus({ preventScroll: true }));
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
    return <div className="opening-stage map-opening" data-testid="opening-plan" style={{ '--unroll-duration': `${INTRO_DURATION}ms` } as CSSProperties}>
      <div className="map-table-cover" aria-hidden="true" />
      <div className="map-paper-curl" aria-hidden="true"><span className="map-curl-cap cap-top" /><span className="map-curl-cap cap-bottom" /></div>
      <button ref={skipButton} className="intro-skip" onClick={finish}>Skip opening <span aria-hidden="true">↗</span></button>
    </div>;
}

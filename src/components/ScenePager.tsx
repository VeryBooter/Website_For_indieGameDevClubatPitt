import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { GESTURE_GAP, SCENE_DURATION, ScrollIntent } from '../navigation/scrollIntent';
export type Scene = { id: string; label: string; content: ReactNode };
export function ScenePager({ scenes }: { scenes: Scene[] }) {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [moving, setMoving] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const [reading, setReading] = useState(false);
  const readingRef = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const busyUntil = useRef(0);
  const lastWheel = useRef(-Infinity);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const progressTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const intent = useRef(new ScrollIntent());
  const reduced = useRef(false);
  const go = useCallback((index: number, instant = false) => {
    const next = Math.max(0, Math.min(scenes.length - 1, index));
    if (next === current.current || (!instant && performance.now() < busyUntil.current)) return;
    const duration = instant || reduced.current ? 0 : SCENE_DURATION;
    busyUntil.current = performance.now() + duration;
    intent.current.reset(); setProgress(0); setMoving(duration > 0);
    readingRef.current = false; setReading(false);
    // Only relocate focus when its former scene is becoming inert.
    const focused = document.activeElement;
    const oldScene = root.current?.querySelector(`[data-scene-index="${current.current}"]`);
    if (focused && oldScene?.contains(focused)) document.getElementById('main')?.focus({ preventScroll: true });
    current.current = next; setActive(next);
    if (!instant) history.replaceState(null, '', `#scene-${scenes[next].id}`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMoving(false), duration);
  }, [scenes]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMedia = () => { reduced.current = media.matches; };
    onMedia(); media.addEventListener('change', onMedia);
    setEnabled(true); document.documentElement.classList.add('scene-mode');
    const anchorIndex = (hash: string) => {
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return -1; }
      if (!id || id === 'main') return 0;
      const target = document.getElementById(id);
      const scene = target?.closest<HTMLElement>('[data-scene-index]');
      return scene ? Number(scene.dataset.sceneIndex) : -1;
    };
    const onHash = () => { const index = anchorIndex(location.hash); if (index >= 0) go(index, true); };
    onHash(); window.scrollTo(0, 0);
    window.addEventListener('hashchange', onHash);
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href);
      if (url.pathname !== location.pathname || url.origin !== location.origin || !url.hash) return;
      const index = anchorIndex(url.hash);
      if (index < 0) return;
      event.preventDefault(); history.pushState(null, '', url.hash); go(index);
      if (url.hash === '#main') document.getElementById('main')?.focus({ preventScroll: true });
    };
    document.addEventListener('click', click);
    const editable = (target: EventTarget | null) => target instanceof Element && !!target.closest('input,textarea,select,[contenteditable="true"],video');
    const blocked = () => !!document.querySelector('.page-transition,.opening-stage,.nav-disclosure[aria-expanded="true"]') || document.querySelector('.menu-toggle')?.getAttribute('aria-expanded') === 'true';
    const onWheel = (event: WheelEvent) => {
      if (readingRef.current || event.ctrlKey || editable(event.target) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      const gap = now - lastWheel.current; lastWheel.current = now;
      if (blocked() || now < busyUntil.current) { intent.current.reset(); return; }
      // The remainder of the gesture that caused a transition must go quiet first.
      if (busyUntil.current > 0 && gap < GESTURE_GAP) { intent.current.reset(); return; }
      busyUntil.current = 0;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      const result = intent.current.feed(delta, now);
      setProgress(result.progress);
      clearTimeout(progressTimer.current);
      progressTimer.current = setTimeout(() => { intent.current.reset(); setProgress(0); }, GESTURE_GAP);
      if (result.direction) go(current.current + result.direction);
    };
    let touchY = 0, touchX = 0, touching = false, touchConsumed = false;
    const touchStart = (event: TouchEvent) => {
      touching = event.touches.length === 1 && !editable(event.target); touchConsumed = false;
      intent.current.reset();
      if (touching) { touchY = event.touches[0].clientY; touchX = event.touches[0].clientX; }
    };
    const touchMove = (event: TouchEvent) => {
      if (!touching || event.touches.length !== 1 || readingRef.current) return;
      const y = event.touches[0].clientY, x = event.touches[0].clientX;
      const delta = touchY - y; touchY = y;
      if (Math.abs(x - touchX) > 60 && Math.abs(delta) < 5) return;
      event.preventDefault();
      if (touchConsumed || blocked() || performance.now() < busyUntil.current) return;
      const result = intent.current.feed(delta, performance.now(), true);
      setProgress(result.progress);
      if (result.direction) { touchConsumed = true; go(current.current + result.direction); }
    };
    const touchEnd = () => { touching = false; intent.current.reset(); setProgress(0); };
    const onKey = (event: KeyboardEvent) => {
      if (readingRef.current || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || editable(event.target) || blocked()) return;
      if (event.target instanceof Element && event.target.closest('button,a,summary')) return;
      let next: number | undefined;
      if (['ArrowDown', 'PageDown'].includes(event.key) || (event.key === ' ' && !event.shiftKey)) next = current.current + 1;
      if (['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey)) next = current.current - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = scenes.length - 1;
      if (next !== undefined) { event.preventDefault(); if (!event.repeat) go(next); }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', touchStart, { passive: true });
    window.addEventListener('touchmove', touchMove, { passive: false });
    window.addEventListener('touchend', touchEnd);
    window.addEventListener('touchcancel', touchEnd);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('scene-mode');
      media.removeEventListener('change', onMedia); window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', click); window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', touchStart); window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd); window.removeEventListener('touchcancel', touchEnd); window.removeEventListener('keydown', onKey);
      clearTimeout(timer.current); clearTimeout(progressTimer.current);
    };
  }, [go, scenes.length]);
  useEffect(() => {
    if (!enabled) return;
    const area = root.current?.querySelector<HTMLElement>(`[data-scene-index="${active}"] .scene-content`);
    if (!area) return;
    const measure = () => setOverflowing(area.scrollHeight > area.clientHeight + 4);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(area);
    for (const child of area.children) observer.observe(child);
    area.addEventListener('toggle', measure, true);
    return () => { observer.disconnect(); area.removeEventListener('toggle', measure, true); };
  }, [active, enabled]);
  return <div ref={root} className={`scene-pager${enabled ? ' is-paged' : ''}`} data-active-scene={active} data-moving={moving}>
    <div className="scene-window"><div className="scene-track" style={enabled ? { transform: `translate3d(0, -${active * 100}%, 0)` } : undefined}>
      {scenes.map((scene, index) => <div key={scene.id} id={`scene-${scene.id}`} className="page-scene" data-scene-index={index} inert={enabled && index !== active ? true : undefined} aria-hidden={enabled && index !== active ? true : undefined}>
        <div className="scene-content">{scene.content}</div>
      </div>)}
    </div></div>
    {enabled && <nav className="scene-controls" aria-label="Page scenes">
      <span className="sr-only" aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')} <span>{scenes[active].label}</span></span>
      {overflowing && <button className="reading-toggle" aria-pressed={reading} onClick={() => { readingRef.current = !reading; setReading(!reading); intent.current.reset(); setProgress(0); }}>{reading ? 'Back to page turns' : 'Read this scene'}</button>}
      <span className="gesture-hint"><span className="gesture-meter" style={{ '--progress': progress } as CSSProperties} aria-hidden="true" /></span>
      <div className="scene-buttons"><button onClick={() => go(active - 1)} disabled={active === 0 || moving} aria-label="Previous scene">↑</button><button onClick={() => go(active + 1)} disabled={active === scenes.length - 1 || moving} aria-label="Next scene">↓</button></div>
    </nav>}
  </div>;
}

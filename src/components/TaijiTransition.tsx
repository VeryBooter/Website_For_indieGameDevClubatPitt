import { useEffect, useRef, useState } from 'react';
import { pages } from '../navigation/pages';
/** Adapted from the supplied taiji-loading.html: a fixed circle with a left-moving sine wave. */
export function drawTaiji(ctx: CanvasRenderingContext2D, progress: number) {
  const size = 512, center = 256, radius = 216, wavelength = radius * 2;
  const amplitude = radius / Math.PI, eyeHeight = radius * .5 / Math.PI, eyeRadius = radius * .28 / Math.PI;
  const left = center - radius;
  ctx.clearRect(0, 0, size, size); ctx.save();
  ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(size, 0);
  for (let x = size; x >= 0; x -= .5) ctx.lineTo(x, center - amplitude * Math.sin(2 * Math.PI * ((x - left) / wavelength + progress)));
  ctx.closePath(); ctx.fillStyle = '#000'; ctx.fill();
  const first = Math.floor(-left / wavelength + progress) - 1;
  const last = Math.ceil((size - left) / wavelength + progress) + 1;
  for (let k = first; k <= last; k++) {
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(left + (k + .25 - progress) * wavelength, center - eyeHeight, eyeRadius, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(left + (k + .75 - progress) * wavelength, center + eyeHeight, eyeRadius, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore(); ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
}
function TaijiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext('2d'); if (!ctx) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, started = performance.now();
    const draw = (time: number) => { drawTaiji(ctx, motion.matches ? 0 : ((time - started) / 1500) % 1); if (!motion.matches) frame = requestAnimationFrame(draw); };
    draw(started);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={ref} width="512" height="512" aria-hidden="true" />;
}
export function TaijiTransition() {
  const [destination, setDestination] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const reset = () => { clearTimeout(timeout); pending.current = null; setDestination(null); };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      if (!['http:', 'https:'].includes(url.protocol)) return;
      if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search) return;
      event.preventDefault();
      if (pending.current) return;
      pending.current = url.href;
      const targetPage = Object.values(pages).find(page => url.pathname.endsWith('/' + page.file));
      setDestination(targetPage?.label || link.getAttribute('aria-label') || link.textContent?.trim() || 'Next page');
      // Paint the outgoing overlay, then keep it mounted until the next document takes over.
      timeout = setTimeout(() => location.assign(url.href), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 120);
    };
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') reset(); };
    document.addEventListener('click', click); window.addEventListener('keydown', key); window.addEventListener('pageshow', reset);
    return () => { reset(); document.removeEventListener('click', click); window.removeEventListener('keydown', key); window.removeEventListener('pageshow', reset); };
  }, []);
  return destination ? <div className="page-transition" role="status" aria-live="polite" aria-label={`Opening ${destination}`}><TaijiCanvas /><p>Opening <strong className="transition-destination">{destination}</strong></p><span>ESC TO CANCEL</span></div> : null;
}

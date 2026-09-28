import { useEffect, useRef, useState, type ReactNode } from 'react';

/** A decorative pen stroke, replayed when its heading enters the viewport. */
export function DrawnUnderline({ children }: { children: ReactNode }) {
  const element = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!element.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.6);
    }, { threshold: [0, 0.6] });
    observer.observe(element.current);
    return () => observer.disconnect();
  }, []);

  return <span ref={element} className={`drawn-heading${visible ? ' is-visible' : ''}`}>
    {children}
    <svg className="heading-stroke" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M 5 7 C 102 17, 271 18, 395 6" pathLength="1" />
    </svg>
  </span>;
}

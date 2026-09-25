import { useEffect } from 'react';
export function ScrollReveals() {
    useEffect(() => {
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motion.matches || !('IntersectionObserver' in window))
            return;
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries)
                if (entry.isIntersecting) {
                    // Animate on entry, but never hide content while waiting for an observer.
                    entry.target.animate([{ opacity: .55, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, easing: 'cubic-bezier(.2,.6,.3,1)' });
                    observer.unobserve(entry.target);
                }
        }, { threshold: .12 });
        document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
        const stop = () => { if (motion.matches) {
            observer.disconnect();
            document.getAnimations().forEach(animation => animation.cancel());
        } };
        motion.addEventListener('change', stop);
        return () => { observer.disconnect(); motion.removeEventListener('change', stop); };
    }, []);
    return null;
}

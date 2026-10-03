import { useEffect } from 'react';
export function ScrollReveals() {
    useEffect(() => {
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motion.matches || !('IntersectionObserver' in window))
            return;
        const observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    // Cinematic entrance: moving from thin air with subtle blur and upward float
                    entry.target.animate([
                        { opacity: 0, transform: 'translateY(24px) scale(0.98)', filter: 'blur(6px)' },
                        { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
                    ], {
                        duration: 850,
                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                        fill: 'both'
                    });
                    observer.unobserve(entry.target);
                }
            }
        }, { threshold: 0.1 });

        const selectors = [
            '[data-reveal]',
            '.hero-copy > *',
            '.hero #hero-title',
            '.about-club-content > *',
            '.why-join-card',
            '.spec-card',
            '.event-entry',
            '.page-scene-title',
            '.centered-intro > *',
            '.join-steps li',
            '.gbm-schedule-banner',
        ];
        document.querySelectorAll(selectors.join(',')).forEach(element => observer.observe(element));
        const stop = () => { if (motion.matches) {
            observer.disconnect();
            document.getAnimations().forEach(animation => animation.cancel());
        } };
        motion.addEventListener('change', stop);
        return () => { observer.disconnect(); motion.removeEventListener('change', stop); };
    }, []);
    return null;
}

import { useEffect, useRef, useState } from 'react';
import { navigation } from '../data/club';
export function Header() {
    const [open, setOpen] = useState(false);
    const button = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) {
            setOpen(false);
            button.current?.focus();
        } };
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, [open]);
    return <header className="site-header wrap">
    <a className="brand" href="#home" aria-label="Indie Game Dev Club at Pitt home"><span className="brand-seal" aria-hidden="true">i<span>g</span></span><span>Indie Game Dev<span className="brand-sub">CLUB AT PITT</span></span></a>
    <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'}>{navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}<a className="nav-join" href="#join" onClick={() => setOpen(false)}>Join the club <span aria-hidden="true">↗</span></a></nav>
  </header>;
}

import { useEffect, useRef, useState } from 'react';
import { pages, type PageId } from '../navigation/pages';
import { navigation } from '../data/club';
export function Header({ page }: { page: PageId }) {
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
    <a className="brand" href="./index.html" aria-label="Indie Game Dev Club at Pitt home"><img className="club-logo" src="./assets/club-logo.svg" width="56" height="56" alt="" /><span>Indie Game Dev<span className="brand-sub">CLUB AT PITT</span></span></a>
    <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'}>{navigation.map(item => <a key={item.href} href={item.href} aria-current={item.href === `./${pages[page].file}` ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}<a className="nav-join" href="./join.html" onClick={() => setOpen(false)}>Join the club <span aria-hidden="true">↗</span></a></nav>
  </header>;
}

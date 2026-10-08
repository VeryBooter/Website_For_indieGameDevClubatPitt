import { useEffect, useRef, useState } from 'react';
import { pages, type PageId } from '../navigation/pages';
import { navigation } from '../data/club';
export function Header({ page }: { page: PageId }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const disclosure = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (expanded) { setExpanded(null); disclosure.current?.focus(); }
      else if (open) { setOpen(false); button.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) { setExpanded(null); setOpen(false); }
    };
    window.addEventListener('keydown', close); document.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [open, expanded]);
  const current = `./${pages[page].file}`;
  const finish = () => { setOpen(false); setExpanded(null); };
  return <header ref={root} className="site-header wrap">
  return <header ref={root} className="site-header">
    <a className="brand" href="./index.html" aria-label="Indie Game Dev Club at Pitt home"><img className="club-logo" src="./assets/club-logo.svg" width="56" height="56" alt="" /></a>
    <button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'}>
      {navigation.map(item => <div className="nav-group" key={item.label} data-current={item.href === current || item.children?.some(child => child.href === current)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(value => value === item.label ? null : value); }}>
        <div className="nav-parent"><a href={item.href} aria-current={item.href === current ? 'page' : undefined} onClick={finish}>{item.label}</a>{item.children && <button className="nav-disclosure" aria-label={`${item.label} pages`} aria-expanded={expanded === item.label} aria-controls={`nav-${item.label}`} onClick={event => { disclosure.current = event.currentTarget; setExpanded(expanded === item.label ? null : item.label); }}><span aria-hidden="true">⌄</span></button>}</div>
        {item.children && <div id={`nav-${item.label}`} className="nav-submenu" hidden={expanded !== item.label}>{item.children.map(child => <div key={child.href}>{child.group && <span className="nav-category">{child.group}</span>}<a href={child.href} aria-current={current === child.href ? 'page' : undefined} onClick={finish}>{child.label}</a></div>)}</div>}
      </div>)}
      <a className="nav-join" href="./join.html" onClick={finish}>Join us <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}

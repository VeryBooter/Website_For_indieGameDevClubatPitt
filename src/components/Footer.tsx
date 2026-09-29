import { club, destinations, relatedOrganizations, contactEmail, gameJam, joinEmailUrl } from '../data/club';
import { DestinationLink } from './ui';
import { SocialBar } from './SocialBar';
export const footerGroups = [
  { label: 'Home', href: './index.html', links: [{ label: 'TBD', href: './untitled.html' }, { label: 'Join us', href: './join.html' }] },
  { label: 'Projects', href: './projects.html', links: [{ label: 'Legio Astralis', href: './project.html' }, { label: 'Proposal form', href: './proposal.html' }, { label: 'Game Jam', href: gameJam.url }] },
  { label: 'About the club', href: './about.html', links: [{ label: 'History', href: './history.html' }, { label: 'Gallery', href: './history.html#gallery' }, { label: 'Team', href: './members.html' }, { label: 'Club overview', href: './team.html' }, { label: 'Events', href: './events.html' }] },
  { label: 'Wiki', href: './wiki.html', links: [{ label: 'Untitled', href: './wiki.html#untitled-wiki' }] },
  { label: 'Sponsorship', href: './sponsorship.html', links: [{ label: 'Supporters', href: './sponsorship.html#supporters' }, { label: 'Why sponsor?', href: './sponsorship.html#why-sponsor' }, { label: 'Levels', href: './sponsorship.html#levels' }, { label: 'Contact', href: './sponsorship.html#sponsor-contact' }] },
];
export function Footer({ onReplay }: { onReplay?: () => void }) {
  const mailing = destinations.find(destination => destination.label === 'Mailing list');
  return <footer className="site-footer wrap">
    <div className="footer-masthead"><a href="./index.html" className="brand"><img className="club-logo" src="./assets/club-logo.svg" width="48" height="48" alt="" /><span className="brand-name">Indie Game Dev Club at Pitt</span></a><span>Imagine. Make. Play.</span></div>
    <div className="footer-layout"><nav className="footer-directory" aria-label="All website pages">{footerGroups.map(group => <div className="footer-links" key={group.label}><a className="footer-category" href={group.href}>{group.label}</a>{group.links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</div>)}</nav>
    <div className="footer-contact"><p className="eyebrow">{mailing?.url ? 'GET THE LATEST BY EMAIL' : 'GET IN TOUCH'}</p><a className="mail-bar" href={mailing?.url || joinEmailUrl}><img src="./assets/sealed-letter.svg" width="52" height="40" alt="Sealed letter" /><span>{mailing?.url ? 'Join the mailing list' : 'Say hello by email'}</span><span aria-hidden="true">↗</span></a><a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail}</a></div>
    <div className="related-orgs"><span className="small-label">RELATED WEBSITES</span>{relatedOrganizations.length ? relatedOrganizations.map(destination => <DestinationLink key={destination.label} destination={destination}/>) : <span>Club links coming soon.</span>}</div>
    <SocialBar /></div>
    <div className="footer-bottom"><span>{club.name}</span>{club.introEnabled && onReplay && <button className="replay-button" onClick={onReplay}>Replay opening <span aria-hidden="true">↺</span></button>}<a href="#main">Back to top ↑</a></div>
  </footer>;
}

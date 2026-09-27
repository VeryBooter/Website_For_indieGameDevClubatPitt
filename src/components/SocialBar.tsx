import { destinations } from '../data/club';
const channels = ['YouTube', 'Instagram', 'X', 'Facebook'] as const;
export function SocialIcon({ name }: { name: typeof channels[number] }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">{name === 'YouTube' ? <><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" /><path d="m10 9 6 3-6 3Z" fill="var(--paper)" /></> : name === 'Instagram' ? <g stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></g> : name === 'X' ? <path d="M4 3h4.5L20 21h-4.5L4 3Zm15 0L5 21" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /> : <path d="M14 22v-9h3l.5-4H14V7c0-1 .4-1.5 1.8-1.5H18V2.2c-.6-.1-1.8-.2-3-.2-3 0-5 1.8-5 5v2H7v4h3v9Z" fill="currentColor" />}</svg>;
}
export function SocialBar() {
  return <div className="follow-us"><p className="eyebrow">FOLLOW US</p><div className="social-bar" aria-label="Social channels">{channels.map(name => {
    const destination = destinations.find(item => item.label === name);
    return destination?.url ? <a key={name} href={destination.url} aria-label={name} title={name}><SocialIcon name={name} /></a> : <span key={name} className="social-pending" role="img" aria-label={`${name} — link pending`} title={`${name} — link pending`}><SocialIcon name={name} /></span>;
  })}</div><span className="social-note">Official links coming soon.</span></div>;
}

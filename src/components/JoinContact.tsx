import { destinations, joinEmailUrl } from '../data/club';
import { SocialIcon } from './SocialBar';

const channels = ['Discord', 'LinkedIn', 'GitHub', 'Email', 'Instagram'] as const;
export function JoinContact() {
  return <aside className="join-contact" aria-label="Keep in contact">
    <div className="join-contact-panel">
      {channels.map(name => {
        const url = name === 'Email' ? joinEmailUrl : destinations.find(item => item.label === name)?.url;
        const icon = name === 'Email' ? <img src="./assets/sealed-letter.svg" alt="" width="64" height="48" /> : <SocialIcon name={name} />;
        const contents = <>{icon}<span>{name}</span>{!url && <small>TBD</small>}</>;
        return url ? <a key={name} href={url} className="join-contact-icon" aria-label={name}>{contents}</a> : <span key={name} className="join-contact-icon is-pending" aria-label={`${name} — link pending`}>{contents}</span>;
      })}
    </div>
  </aside>;
}

import { club, destinations } from '../data/club';
import { DestinationLink, SectionHeading } from '../components/ui';
export function Join() {
    return <section className="join-band" id="join" aria-labelledby="join-title"><div className="section wrap join-inner"><div data-reveal><SectionHeading number="06" label="YOUR NEXT CHAPTER"><span id="join-title">Bring your curiosity.<br /><em>Let’s make something.</em></span></SectionHeading><p className="section-description">{club.pending.join}</p></div><div className="join-destinations" data-reveal><p className="eyebrow">JOIN & STAY IN THE LOOP</p>{destinations.slice(0, 3).map(destination => <DestinationLink key={destination.label} destination={destination}/>)}<p className="join-note">No signup is collected on this site yet.</p></div></div></section>;
}

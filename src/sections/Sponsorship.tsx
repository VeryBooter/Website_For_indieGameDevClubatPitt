import { club, sponsors, sponsorshipContact, sponsorshipLevels, type Sponsor, type SponsorshipLevel } from '../data/club';
import { DraftNote, SectionHeading } from '../components/ui';
export function SponsorMark({ sponsor }: {
    sponsor: Sponsor;
}) {
    const logo = <img src={sponsor.logo} alt={sponsor.name} loading="lazy" width="180" height="80"/>;
    return sponsor.url ? <a href={sponsor.url}>{logo}</a> : <div>{logo}</div>;
}
export function SponsorLevel({ level }: {
    level: SponsorshipLevel;
}) {
    if (!level.approved)
        return null;
    return <article className="sponsor-level"><h3>{level.name}</h3>{level.amount && <p>{level.amount}</p>}<p>{level.description}</p><ul>{level.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></article>;
}
export function Sponsorship() {
    const approvedLevels = sponsorshipLevels.filter(level => level.approved);
    return <section className="section wrap sponsorship-section" id="sponsorship" aria-labelledby="sponsorship-title"><div data-reveal><SectionHeading number="05" label="SPONSORSHIP"><span id="sponsorship-title">{club.sponsorIntro}</span></SectionHeading><DraftNote /><p className="section-description">{club.sponsorshipRationale}</p><DraftNote />
    {sponsorshipContact.url ? <a className="text-link" href={sponsorshipContact.url}>Talk with the club ↗</a> : <p className="contact-pending">{sponsorshipContact.pending}</p>}</div>
    <div className="sponsorship-details" data-reveal><details><summary><span><span className="detail-number" aria-hidden="true">01</span>Our supporters</span><span aria-hidden="true">+</span></summary>{sponsors.length ? <div className="sponsor-marks">{sponsors.map(sponsor => <SponsorMark sponsor={sponsor} key={sponsor.name}/>)}</div> : <p>{club.pending.supporters}</p>}</details><details><summary><span><span className="detail-number" aria-hidden="true">02</span>Sponsorship opportunities</span><span aria-hidden="true">+</span></summary>{approvedLevels.length ? approvedLevels.map(level => <SponsorLevel level={level} key={level.name}/>) : <p>{club.pending.levels}</p>}</details><details><summary><span><span className="detail-number" aria-hidden="true">03</span>Get in touch</span><span aria-hidden="true">+</span></summary>{sponsorshipContact.url ? <a className="text-link" href={sponsorshipContact.url}>Contact the club ↗</a> : <p>{club.pending.contact}</p>}</details></div>
  </section>;
}

import { club, people } from '../data/club';
import { DraftNote, SectionHeading } from '../components/ui';
export function People() {
    return <section className="people-band" id="people" aria-labelledby="people-title"><div className="wrap section people-inner">
    <div data-reveal><SectionHeading number="03" label="THE PEOPLE"><span id="people-title">Good games begin<br />with <em>different people.</em></span></SectionHeading></div>
    <div data-reveal><p className="body-large">{club.peopleIntro}</p><DraftNote />{people.length ? <div className="people-list">{people.map(person => <article key={`${person.name}-${person.role}`}>{person.photo && <img src={person.photo} alt={person.name} loading="lazy" width="120" height="120"/>}<div><span className="small-label">{person.group}</span><h3>{person.name}</h3><p>{person.role}</p><p>{person.bio}</p></div></article>)}</div> : <div className="people-empty"><span className="small-label">MEMBERS / OFFICERS / ADVISORS</span><p>{club.pending.people}</p></div>}<a className="text-link" href="#join">Find your way in <span aria-hidden="true">↗</span></a></div>
  </div></section>;
}

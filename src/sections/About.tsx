import { club, gallery, history } from '../data/club';
import { DraftNote, SectionHeading } from '../components/ui';
export function About() {
    return <section id="about" className="section wrap about-section" aria-labelledby="about-title">
    <div data-reveal><SectionHeading number="01" label="THE CLUB"><span id="about-title">Different minds.<br /><em>Shared possibility.</em></span></SectionHeading></div>
    <div className="about-body" data-reveal><p className="body-large">{club.mission}</p><DraftNote />
      <div className="discipline-row" aria-label="Creative disciplines"><span>Art & design</span><span>Code & systems</span><span>Sound & story</span></div>
      <div className="about-notes"><details><summary>Our story <span aria-hidden="true">+</span></summary>{history.length ? history.map(item => <p key={item.year}><strong>{item.year}</strong> — {item.text}</p>) : <p>{club.pending.history}</p>}</details><details id="gallery"><summary>From the club <span aria-hidden="true">+</span></summary>{gallery.length ? gallery.map(item => <figure key={item.src}><img src={item.src} alt={item.alt} loading="lazy"/><figcaption>{item.caption}</figcaption></figure>) : <p>{club.pending.gallery}</p>}</details></div>
    </div>
  </section>;
}

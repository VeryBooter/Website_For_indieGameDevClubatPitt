import { destinations, gameJam, contactEmail, joinEmailUrl } from '../data/club';
import { DrawnUnderline } from '../components/DrawnUnderline';
import { JoinContact } from '../components/JoinContact';
export function Join({ first = false }: { first?: boolean }) {
  const Heading = first ? 'h1' : 'h2';
  const discord = destinations.find(destination => destination.label === 'Discord')!;
  const mailing = destinations.find(destination => destination.label === 'Mailing list');
  const calendar = destinations.find(destination => destination.label === 'Calendar');
  return <section className="join-simple wrap" id="join" aria-labelledby="join-title">
    <p className="eyebrow">IMAGINE. MAKE. PLAY.</p>
    <Heading id="join-title"><DrawnUnderline>Join <em>iGDC at Pitt</em></DrawnUnderline></Heading>
    <div className="join-simple-body"><ol className="join-steps">
      <li><span className="join-step-number" aria-hidden="true">1.</span><div><a className="button button-join" href={discord.url!}>Join our Discord <span aria-hidden="true">↗</span></a><p>Say hello and meet the club.</p></div></li>
      <li><span className="join-step-number" aria-hidden="true">2.</span><div><a className="button button-outline" href={mailing?.url || joinEmailUrl}>{mailing?.url ? 'Join the email list' : 'Say hello by email'} <span aria-hidden="true">↗</span></a><p>{mailing?.url ? 'Get club updates in your inbox.' : contactEmail}</p></div></li>
      <li><span className="join-step-number" aria-hidden="true">3.</span><div><a className="button button-outline" href={calendar?.url || './events.html'}>{calendar?.url ? 'Add the club calendar' : 'Find an event'} <span aria-hidden="true">↗</span></a><p>Join our weekly GBM every Saturday (now until 12/13) from 2–3 PM in Lawrence 104.</p></div></li>
    </ol><JoinContact /><div className="join-contact-cue"><p>Keep in contact!</p><svg viewBox="0 0 340 130" fill="none" aria-hidden="true"><path d="M12 16C95 98 191 139 320 32m-34 2 34-2-2 33" pathLength="1" /></svg></div></div>
    <aside className="join-jam join-jam-strip"><p className="eyebrow">GAME JAM</p><h3>Games 4 <em>Social Impact.</em></h3><p>{gameJam.dates}</p><a className="text-link" href={gameJam.url}>View the jam on itch.io ↗</a></aside>
  </section>;
}

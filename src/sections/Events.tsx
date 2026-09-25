import { club, destinations, events, type ClubEvent } from '../data/club';
import { SectionHeading } from '../components/ui';
export function EventEntry({ event }: {
    event: ClubEvent;
}) {
    const date = new Date(`${event.date}T12:00:00Z`);
    return <article className="event-entry"><time dateTime={event.date}><span>{date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })}</span><strong>{date.getUTCDate()}</strong></time><div><h3>{event.title}</h3><p>{event.time} · {event.location}</p><p>{event.description}</p>{event.url && <a className="text-link" href={event.url}>Event details ↗</a>}</div></article>;
}
export function Events() {
    const calendar = destinations.find(destination => destination.label === 'Calendar');
    return <section id="events" className="section wrap events-section" aria-labelledby="events-title"><div data-reveal><SectionHeading number="04" label="CLUB ALMANAC"><span id="events-title">Make time<br />to make things.</span></SectionHeading><p className="section-description">{club.pending.events && !events.length ? club.pending.events : 'Gatherings, workshops, and moments from the club.'}</p></div>
    <div className="calendar-area" data-reveal><div className="calendar-top"><span className="eyebrow">ON THE CALENDAR</span><span aria-hidden="true">↗</span></div>{events.length ? events.map(event => <EventEntry key={event.id} event={event}/>) : <div className="calendar-empty"><span className="calendar-mark" aria-hidden="true">—</span><h3>The next page is open.</h3><p>No confirmed events published yet.</p></div>}<div className="calendar-bottom">{calendar?.url ? <a className="text-link" href={calendar.url}>Open the club calendar ↗</a> : <span>Shared calendar <span className="pending-tag">LINK PENDING</span></span>}</div></div>
  </section>;
}

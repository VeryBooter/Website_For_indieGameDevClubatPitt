import { club, events, gameJam, type ClubEvent } from '../data/club';
import { Almanac, CalendarFrame } from '../components/Almanac';
import { SocialBar } from '../components/SocialBar';
import { SectionHeading } from '../components/ui';
export function EventEntry({ event }: {
    event: ClubEvent;
}) {
    const date = new Date(`${event.date}T12:00:00Z`);
    return <article className="event-entry"><time dateTime={event.date}><span>{date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })}</span><strong>{date.getUTCDate()}</strong></time><div><h3>{event.title}</h3><p>{event.time} · {event.location}</p><p>{event.description}</p>{event.url && <a className="text-link" href={event.url}>Event details ↗</a>}</div></article>;
}
export function Events() {
    return <section id="events" className="section wrap events-section" aria-labelledby="events-title"><div><SectionHeading number="03" label="WHERE & WHEN"><span id="events-title">Make time<br />to make things.</span></SectionHeading>
      <div className="gbm-schedule-banner">
        <span className="gbm-badge">WEEKLY GENERAL BODY MEETING</span>
        <p className="gbm-highlight">Every Saturday throughout the semester (now until 12/13)</p>
        <p className="gbm-details">2:00 PM – 3:00 PM · Lawrence Hall 104</p>
      </div>
      <p className="section-description">{club.pending.events && !events.length ? club.pending.events : 'Gatherings, workshops, and moments from the club.'}</p><p className="jam-notice"><a href={gameJam.url}>Game Jam · {gameJam.dates} ↗</a></p><SocialBar /><a className="text-link" href="./members.html">Members & events ↗</a></div>
    <div className="calendar-area"><CalendarFrame className="calendar-outer-frame" /><Almanac /></div>
  </section>;
}

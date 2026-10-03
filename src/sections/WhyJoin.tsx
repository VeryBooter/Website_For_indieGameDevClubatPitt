import { DrawnUnderline } from '../components/DrawnUnderline';

export function WhyJoin() {
  const cards = [
    {
      num: '01',
      title: 'Experience',
      description: 'Get started with Unity development. Familiarize yourself with game dev cycle, or just collaborate with coders as an artist.',
      tag: 'Unity Dev · Pipeline · Assets',
    },
    {
      num: '02',
      title: 'Collaboration',
      description: 'The club is meant to help people with less experience in game dev, also to collaborate and learn.',
      tag: 'Beginners Welcome · Mentorship · Teamwork',
    },
    {
      num: '03',
      title: 'Fun',
      description: 'You get to decide what to be built next time.',
      tag: 'Member Decisions · Creative Autonomy · Game Jams',
    },
  ];

  return (
    <section className="wrap scene-section why-join-scene cinematic-enter" id="why-join" aria-labelledby="why-join-title">
      <div className="page-scene-title">
        <p className="eyebrow cinematic-fade-1"><span className="red-dash"/> WHY JOIN US</p>
        <h2 id="why-join-title" className="cinematic-fade-2">
          <DrawnUnderline>Why <em>Join?</em></DrawnUnderline>
        </h2>
      </div>
      <div className="why-join-grid">
        {cards.map((card, idx) => (
          <article className={`why-join-card cinematic-card-${idx + 1}`} key={card.title}>
            <div className="why-join-card-header">
              <span className="card-num">{card.num}</span>
              <span className="card-tag">{card.tag}</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
      <div className="why-join-actions cinematic-fade-5">
        <a className="button button-join" href="./join.html">Join us <span aria-hidden="true">↗</span></a>
        <a className="text-link" href="#events">Club almanac & events ↓</a>
      </div>
    </section>
  );
}


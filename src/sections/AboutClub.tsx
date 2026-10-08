import { DrawnUnderline } from '../components/DrawnUnderline';

export function AboutClub() {
  return (
    <section className="wrap scene-section about-club-scene cinematic-enter" id="about" aria-labelledby="about-club-title">
    <section className="scene-section about-club-scene cinematic-enter" id="about" aria-labelledby="about-club-title">
      <div className="about-club-container">
        <div className="about-club-video-bg" aria-hidden="true">
          <div className="video-atmosphere-glow" />
          <div className="space-starfield" />
          <div className="spaceship-silhouette">
            <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="spaceship-svg">
              <path d="M200 40 L230 110 L320 140 L340 180 L230 170 L210 200 L190 200 L170 170 L60 180 L80 140 L170 110 Z" stroke="var(--ink)" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M190 60 L200 40 L210 60 L205 130 L195 130 Z" fill="var(--action)" opacity="0.35" />
              <circle cx="200" cy="110" r="14" stroke="var(--action)" strokeWidth="1.5" opacity="0.6" />
              <line x1="200" y1="15" x2="200" y2="40" stroke="var(--action)" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="160" y1="180" x2="140" y2="215" stroke="var(--ink)" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
              <line x1="240" y1="180" x2="260" y2="215" stroke="var(--ink)" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="video-meta-badge">
            <span className="video-rec-indicator" />
            <span>BACKGROUND VIDEO CONTAINER · SPACESHIP GAME IN PROGRESS</span>
          </div>
        </div>

        <div className="about-club-content">
          <p className="eyebrow cinematic-fade-1"><span className="red-dash"/> WHO WE ARE</p>
          <h2 id="about-club-title" className="cinematic-fade-2">
            <DrawnUnderline>About our <em>club</em></DrawnUnderline>
          </h2>
          <p className="about-club-statement cinematic-fade-3">
            Our club is a newly founded, project-focused indie game dev club. Currently working on a spaceship game, writing all of the code, articulate art assets, composing music.
          </p>
          <div className="about-club-highlights cinematic-fade-4">
            <div className="about-highlight-card">
              <span className="highlight-tag">CURRENT PROJECT</span>
              <strong>Spaceship Game</strong>
              <p>Active production across code, assets, audio, and gameplay systems.</p>
            </div>
            <div className="about-highlight-card">
              <span className="highlight-tag">STUDENT RUN</span>
              <strong>Pitt Game Makers</strong>
              <p>Weekly GBM every Saturday throughout the semester (until 12/13) in Lawrence 104.</p>
            </div>
          </div>
          <div className="about-club-actions cinematic-fade-5">
            <a className="button button-ink" href="./projects.html#project-preview">Explore spaceship game ↗</a>
            <a className="text-link" href="#why-join">Why join? ↓</a>
          </div>
        </div>
      </div>
    </section>
  );
}


import { club } from '../data/club';
import { DraftNote } from '../components/ui';
export function Hero() {
    return <section className="hero wrap" id="home" aria-labelledby="hero-title">
    <div className="hero-rail" aria-hidden="true"><span>IMAGINE · MAKE · PLAY</span><span className="rail-line"/></div>
    <div className="hero-copy"><p className="eyebrow"><span className="red-dash"/> A SPACE FOR GAME MAKERS</p>
      <h1 id="hero-title" tabIndex={-1}>Indie Game<br />Dev Club <em>at Pitt.</em></h1>
      <p className="hero-tagline">{club.tagline}</p><DraftNote />
      <div className="hero-actions"><a className="button button-ink" href="./join.html">Join the club <span aria-hidden="true">↗</span></a><a className="text-link" href="./about.html">Explore the club <span aria-hidden="true">↓</span></a></div>
    </div>
    <figure className="hero-art"><div className="art-frame"><img src="./assets/world-sketch.png" width="1536" height="1024" alt="Concept illustration of a floating game level, with ink-wash terrain, stairways, and unfinished wireframe paths." fetchPriority="high"/><span className="art-coordinate" aria-hidden="true">WORLD_01<br />A WORK IN IMAGINATION</span></div><figcaption><span>From a blank page, a playable world.</span><span>Concept artwork · not a club project</span></figcaption></figure>
    <div className="hero-bottom"><span>A PLACE TO BEGIN. ROOM TO EXPLORE.</span><a href="#discover">Unfold the possibilities <span aria-hidden="true">↓</span></a><span className="page-index">01 — 03</span></div>
  </section>;
}

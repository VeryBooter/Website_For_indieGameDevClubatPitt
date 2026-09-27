import { club } from '../data/club';
export function Hero() {
  return <section className="hero wrap" id="home" aria-labelledby="hero-title">
    <div className="hero-rail" aria-hidden="true"><div className="vertical-terminal"><span className="terminal-letters">{Array.from('Imagine·Make·Play').map((letter, index) => <span key={index}>{letter}</span>)}</span><span className="terminal-cursor" /></div><span className="rail-line" /></div>
    <h1 id="hero-title" tabIndex={-1}>Indie Game Dev Club <em>at Pitt</em></h1>
    <p className="eyebrow hero-eyebrow"><span className="red-dash"/> A SPACE FOR GAME MAKERS</p>
    <div className="hero-copy">
      <p className="hero-tagline">{club.tagline}</p>
      <div className="hero-actions"><a className="button button-join" href="./join.html">Join us <span aria-hidden="true">↗</span></a><a className="text-link" href="./untitled.html">Untitled <span aria-hidden="true">↗</span></a></div>
    </div>
    <figure className="hero-art"><div className="art-frame"><img src="./assets/world-sketch.png" width="1536" height="1024" alt="Concept illustration of a floating game level, with ink-wash terrain, stairways, and unfinished wireframe paths." fetchPriority="high" /></div><figcaption><span>From a blank page, a playable world.</span><span>Concept artwork · not a club project</span></figcaption></figure>

  </section>;
}

import { ControllerAssembly } from '../components/ControllerAssembly';
import { DrawnUnderline } from '../components/DrawnUnderline';
import { club } from '../data/club';
export function Hero() {
  return <section className="hero wrap" id="home" aria-labelledby="hero-title">
    <div className="hero-rail" aria-hidden="true"><div className="vertical-terminal"><span className="terminal-letters">{Array.from('Imagine·Make·Play').map((letter, index) => <span key={index}>{letter}</span>)}</span><span className="terminal-cursor" /></div><span className="rail-line" /></div>
    <h1 id="hero-title" tabIndex={-1}><DrawnUnderline>Indie Game Dev Club <em>at Pitt</em></DrawnUnderline></h1>
    <p className="eyebrow hero-eyebrow"><span className="red-dash"/> A SPACE FOR GAME MAKERS</p>
    <div className="hero-copy">
      <p className="hero-tagline">Indie games develop, articulate, construct by Pitt students</p>
      <p className="hero-gbm-note">Weekly GBM: Every Saturday throughout the semester (now until 12/13) · 2:00 PM – 3:00 PM in Lawrence 104.</p>
      <p className="vibe-coded-note">This website is vibe coded with AI assistance.</p>
      <div className="hero-actions"><a className="button button-join" href="./join.html">Join us <span aria-hidden="true">↗</span></a><a className="text-link" href="#about">About our club <span aria-hidden="true">↓</span></a></div>
      <div className="hero-actions"><a className="button button-join" href="./join.html">Join us <span aria-hidden="true">↗</span></a></div>
    </div>
    <ControllerAssembly />

  </section>;
}

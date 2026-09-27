import { useState } from 'react';
import { proposalDestination } from '../data/club';
export function Proposal() {
  const [saved, setSaved] = useState(false);
  return <section className="wrap proposal-page" id="propose"><p className="eyebrow">PROJECTS / PROPOSAL</p><h1>Have <em>an idea?</em></h1><p className="body-large">Start with the idea. Outline what it needs to become a game.</p>
    <form className="proposal-form" onChange={() => setSaved(false)} onSubmit={event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const text = `# Project proposal\n\n## Why this idea?\n${data.get('why')}\n\n## What do you propose?\n${data.get('idea')}\n\n## People, time, and budget\n${data.get('resources')}\n`;
      const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'project-proposal.md'; anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000); setSaved(true);
    }}>
      <label>Why this idea?<textarea name="why" rows={3} required placeholder="What makes this idea worth exploring?" /></label>
      <label>What do you propose?<textarea name="idea" rows={5} required placeholder="Describe the game, its players, and the experience." /></label>
      <label>People, time, and budget<textarea name="resources" rows={4} required placeholder="What skills, time, equipment, or funding would it need?" /></label>
      <div className="proposal-actions"><button className="button button-ink" type="submit">Download your draft ↓</button>{proposalDestination.url ? <a className="text-link" href={proposalDestination.url}>Open the submission form ↗</a> : <p>Microsoft Forms submission link coming soon. Downloading saves a copy to your device; it does not submit the proposal.</p>}</div>
      <p role="status">{saved ? 'Your draft download is ready. It has not been sent to the club.' : 'Your answers stay in this page until you download them. Leaving or reloading clears them.'}</p>
    </form>
  </section>;
}

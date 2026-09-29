import { useEffect, useMemo, useState } from 'react';
import { SiteSeal } from './components/SiteSeal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OpeningPlan } from './components/OpeningPlan';
import { TaijiTransition } from './components/TaijiTransition';
import { pageScenes } from './pages/PageScenes';
import type { PageId } from './navigation/pages';
export function App({ page = 'home' }: { page?: PageId }) {
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    // Resolve incoming anchors after React and the loading screen are ready.
    let frame = 0;
    const restoreAnchor = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' }); }
        catch { /* Malformed fragments leave the document at its normal position. */ }
      });
    };
    document.documentElement.classList.remove('scene-mode');
    window.addEventListener('pitt:loaded', restoreAnchor);
    if (!document.documentElement.dataset.pageLoading) restoreAnchor();
    window.dispatchEvent(new Event('pitt:app-ready'));
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pitt:loaded', restoreAnchor); };
  }, []);
  const scenes = useMemo(() => [...pageScenes(page), { id: 'footer', label: 'Site directory', content: <Footer onReplay={page === 'home' ? () => { location.hash = 'home'; setReplay(value => value + 1); } : undefined} /> }], [page]);
  return <><a className="skip-link" href="#main">Skip to content</a><Header page={page} /><main id="main" tabIndex={-1}><div className="continuous-page">{scenes.map(scene => <div key={scene.id} id={`scene-${scene.id}`}>{scene.content}</div>)}</div></main>{page === 'home' && <OpeningPlan replay={replay} />}<TaijiTransition /><SiteSeal /></>;
}

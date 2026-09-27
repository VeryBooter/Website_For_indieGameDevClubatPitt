import { useMemo, useState } from 'react';
import { SiteSeal } from './components/SiteSeal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OpeningPlan } from './components/OpeningPlan';
import { ScenePager } from './components/ScenePager';
import { TaijiTransition } from './components/TaijiTransition';
import { pageScenes } from './pages/PageScenes';
import type { PageId } from './navigation/pages';
export function App({ page = 'home' }: { page?: PageId }) {
  const [replay, setReplay] = useState(0);
  const scenes = useMemo(() => [...pageScenes(page), { id: 'footer', label: 'Site directory', content: <Footer onReplay={page === 'home' ? () => { location.hash = 'home'; setReplay(value => value + 1); } : undefined} /> }], [page]);
  return <><a className="skip-link" href="#main">Skip to content</a><Header page={page} /><main id="main" tabIndex={-1}>{page === 'history' || page === 'proposal' ? <div className="continuous-page">{scenes.map(scene => <div key={scene.id} id={`scene-${scene.id}`}>{scene.content}</div>)}</div> : <ScenePager scenes={scenes} />}</main>{page === 'home' && <OpeningPlan replay={replay} />}<TaijiTransition /><SiteSeal /></>;
}

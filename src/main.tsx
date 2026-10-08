import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { pageFromPath, pages, legacyProjectRedirect } from './navigation/pages';
import './styles.css';
import './pages.css';
import './revision.css';
import './components/game-backdrop.css';
const legacyTarget = legacyProjectRedirect(location.pathname);
if (legacyTarget) {
  const target = new URL(legacyTarget, location.href);
  target.search = location.search;
  location.replace(target.href);
} else {
document.documentElement.classList.add('js');
const page = pageFromPath(location.pathname);
document.title = pages[page].title;
const loadingTitle = document.querySelector('#boot-loader strong');
if (loadingTitle) loadingTitle.textContent = pages[page].label;
document.querySelector('meta[name="description"]')?.setAttribute('content', pages[page].description);
const root = document.getElementById('root')!;
if (document.documentElement.dataset.pageLoading) {
  root.inert = true;
  window.addEventListener('pitt:loaded', () => { root.inert = false; }, { once: true });
}
if (root.hasChildNodes()) hydrateRoot(root, <App page={page} />);
else createRoot(root).render(<App page={page} />);

}

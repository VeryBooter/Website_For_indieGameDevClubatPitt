import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const source = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
const listeners = new Map();
const timers = [];
let removed = 0, resolveFonts;
const documentElement = { dataset: {} };
const context = new Proxy({}, { get: (_, key) => key === 'canvas' ? {} : () => {}, set: () => true });
const overlay = { hidden: true, remove: () => removed++, querySelector: selector => selector === 'canvas' ? { getContext: () => context } : { addEventListener: () => {} } };
const window = {
  addEventListener: (name, callback) => { const group = listeners.get(name) || []; group.push(callback); listeners.set(name, group); },
  dispatchEvent: event => { for (const callback of listeners.get(event.type) || []) callback(event); },
};
vm.runInNewContext(source, {
  document: { getElementById: () => overlay, documentElement, readyState: 'loading', fonts: { ready: new Promise(resolve => { resolveFonts = resolve; }) } },
  window, performance: { now: () => 0 }, matchMedia: () => ({ matches: true }),
  requestAnimationFrame: () => 1, cancelAnimationFrame: () => {},
  setTimeout: callback => { timers.push(callback); }, Event, Promise,
});
assert.equal(overlay.hidden, false, 'Loader starts before app code');
window.dispatchEvent(new Event('pitt:app-ready'));
assert.equal(timers.length, 0, 'App readiness alone cannot dismiss a loading page');
window.dispatchEvent(new Event('load'));
assert.equal(timers.length, 0, 'Wait for fonts as well as the document');
resolveFonts();
await new Promise(resolve => setImmediate(resolve));
assert.equal(timers.length, 1);
assert.equal(removed, 0);
timers[0]();
assert.equal(removed, 1);
assert.equal(documentElement.dataset.pageLoading, undefined);
window.dispatchEvent(Object.assign(new Event('pageshow'), { persisted: true }));
assert.equal(removed, 1, 'Restoring from browser cache is safe');
console.log('Passed loading lifecycle: initial display, app/document/fonts readiness, completion, and browser cache restore.');

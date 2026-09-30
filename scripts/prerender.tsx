import { readFile, writeFile } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { pages, legacyProjectRoutes, type PageId } from '../src/navigation/pages';
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
for (const page of Object.keys(pages) as PageId[]) {
  const metadata = pages[page];
  const html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(metadata.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(metadata.description)}" />`)
    .replace('<div id="root"></div>', `<div id="root">${renderToString(<App page={page} />)}</div>`);
  await writeFile(new URL(`../dist/${metadata.file}`, import.meta.url), html);
}
console.log(`Prerendered ${Object.keys(pages).length} independent HTML pages. Each supports direct entry, reload, and static hosting.`);

for (const [file, target] of Object.entries(legacyProjectRoutes)) {
  await writeFile(new URL(`../dist/${file}`, import.meta.url), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=${escape(target)}"><title>Projects | iGDC at Pitt</title><link rel="canonical" href="./projects.html"></head><body><p>Project content has moved to one page. <a href="${escape(target)}">Continue to Projects</a>.</p></body></html>`);
}

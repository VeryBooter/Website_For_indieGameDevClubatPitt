import { readFile, writeFile } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
const file = new URL('../dist/index.html', import.meta.url);
const template = await readFile(file, 'utf8');
await writeFile(file, template.replace('<div id="root"></div>', `<div id="root">${renderToString(<App />)}</div>`));
console.log('Static HTML generated: content and navigation work without JavaScript.');

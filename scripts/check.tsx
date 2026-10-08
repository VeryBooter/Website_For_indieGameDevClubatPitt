import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../src/App';
import { Footer } from '../src/components/Footer';
import { monthCells } from '../src/components/Almanac';
import { pages, pageFromPath, legacyProjectRedirect, type PageId } from '../src/navigation/pages';
import { pageScenes } from '../src/pages/PageScenes';
import { ScrollIntent } from '../src/navigation/scrollIntent';
import { shouldPlayIntro } from '../src/components/introPolicy';
import { DestinationLink } from '../src/components/ui';
import { ProjectCard } from '../src/sections/Projects';
import { EventEntry } from '../src/sections/Events';
import { SponsorLevel } from '../src/sections/Sponsorship';
import { destinations, projects, sponsorshipContact, proposalDestination, relatedOrganizations, events, gameJam, contactEmail } from '../src/data/club';
const rendered = new Map<string, string>((Object.keys(pages) as PageId[]).map(page => [pages[page].file, renderToStaticMarkup(<App page={page} />)]));
let checkedLinks = 0;
for (const [file, html] of rendered) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: IDs must be unique`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: one main heading`);
  assert(!html.includes('href="#"'), `${file}: no dead links`);
  assert(html.includes('class="continuous-page"') && !html.includes('class="scene-pager'), `${file}: uses native document scrolling`);
  assert(!html.includes('scene-controls'), `${file}: no page-turn controls`);
  assert(!html.includes('opening-stage'), `${file}: static HTML starts usable`);
  assert(!html.includes('>People</a>'), `${file}: navigation uses Team`);
  assert(!html.includes('class="site-seal"') && !html.includes('zaojing-chengyou-seal.svg'), `${file}: Chinese seal removed from general page`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('#') && !href.startsWith('./')) continue;
    const url = new URL(href, `https://example.com/club/${file}`);
    const targetFile = url.pathname.split('/').pop()!;
    if (!targetFile.endsWith('.html')) continue;
    const targetHtml = rendered.get(targetFile);
    assert(targetHtml, `${file}: missing destination ${href}`);
    if (url.hash) assert(targetHtml.includes(`id="${url.hash.slice(1)}"`), `${file}: missing fragment ${href}`);
    checkedLinks++;
  }
}
assert.equal(pages.home.title, 'Building Our Game Dev Community @ Pitt | Indie Game Dev Club @ Pitt');
for (const page of Object.keys(pages) as PageId[]) assert.equal(pageFromPath(`/repository/${pages[page].file}`), page);
assert.equal(pageScenes('sponsorship').length, 5);
assert.equal(pageScenes('team').length, 3);
assert.equal(pageScenes('home').length, 4);
assert.equal(pageScenes('artTeam').length, 1);
assert.equal(pageScenes('codeTeam').length, 1);
const joining = rendered.get('join.html')!;
assert(rendered.has('wiki.html') && !rendered.has('docs.html'), 'Wiki replaces the Docs route');
for (const html of rendered.values()) assert(!/href="[^\"]*docs\.html/.test(html), 'No navigation points to the removed Docs page');
assert(joining.includes('https://discord.gg/kqns4AvEN'), 'Joining uses the supplied Discord invitation');
assert(joining.includes(`mailto:${contactEmail}?subject=`), 'Joining offers a prefilled email');
assert(!joining.includes('<form') && !joining.includes('Join the email list'), 'A contact email must not masquerade as newsletter signup');
assert(joining.includes(gameJam.url) && joining.includes('./events.html'), 'Joining exposes the jam and event calendar');
assert(!joining.includes('class="scene-pager'), 'The simplified Join page uses continuous reading');
const urlIsValid = (url: string) => /^(https:\/\/|mailto:|\.\/|#)/.test(url);
for (const destination of [...destinations, sponsorshipContact, proposalDestination, ...relatedOrganizations]) {
    assert(destination.url === null || urlIsValid(destination.url), `Unsupported URL: ${destination.label}`);
    const output = renderToStaticMarkup(<DestinationLink destination={destination}/>);
    assert.equal(output.includes('<a '), destination.url !== null, `Pending destinations must not be links: ${destination.label}`);
}
for (const project of projects) {
    assert(/^[a-z0-9-]+$/.test(project.id), 'Project ID must be an anchor-safe slug');
    if (project.artwork)
        assert(project.artworkAlt.trim(), 'Project artwork needs alt text');
    for (const url of [project.detailUrl, project.documentationUrl, project.githubUrl])
        assert(url === null || urlIsValid(url));
}
for (const event of events)
    assert(/^\d{4}-\d{2}-\d{2}$/.test(event.date) && !Number.isNaN(Date.parse(event.date)), 'Event needs an ISO date');
// Fixtures exercise the publishing path even though actual club records are empty.
const project = renderToStaticMarkup(<ProjectCard project={{ id: 'test-only', name: 'Fixture project', description: 'Test data only', artwork: null, artworkAlt: '', contributors: ['Fixture contributor'], status: 'In development', technologies: ['Fixture engine'], detailUrl: null, documentationUrl: 'https://example.com/docs', githubUrl: null }}/>);
assert(project.includes('Fixture contributor') && project.includes('Fixture engine') && project.includes('https://example.com/docs'));
const event = renderToStaticMarkup(<EventEntry event={{ id: 'test-only', title: 'Fixture gathering', date: '2026-10-04', time: '6 pm ET', location: 'Fixture room', description: '', url: null }}/>);
assert(event.includes('Oct') && event.includes('>4<') && event.includes('2026-10-04'));
const draftLevel = { name: 'DO NOT PUBLISH', description: 'Unapproved', amount: null, benefits: [], approved: false };
assert.equal(renderToStaticMarkup(<SponsorLevel level={draftLevel}/>), '');
assert(renderToStaticMarkup(<SponsorLevel level={{ ...draftLevel, approved: true, name: 'Fixture level' }}/>).includes('Fixture level'));
console.log(`Passed: ${rendered.size} pages, ${checkedLinks} cross-page/anchor links, one heading per page, Team navigation, populated records, and sponsor approval gate.`);
const firstVisit = { enabled: true, reducedMotion: false, replay: false, seen: false, deepLink: false };
assert(shouldPlayIntro(firstVisit));
assert(!shouldPlayIntro({ ...firstVisit, seen: true }));
assert(!shouldPlayIntro({ ...firstVisit, deepLink: true }));
assert(!shouldPlayIntro({ ...firstVisit, reducedMotion: true, replay: true }));
assert(!shouldPlayIntro({ ...firstVisit, enabled: false, replay: true }));
assert(shouldPlayIntro({ ...firstVisit, seen: true, replay: true }));
console.log('Passed intro policy: first visit, repeat visit, deep links, reduced motion, disabled intro, replay.');

const gesture = new ScrollIntent();
assert.equal(gesture.feed(2000, 0).direction, 0, 'One large wheel tick must not move a scene');
gesture.reset();
assert.equal(gesture.feed(70, 0).direction, 0);
assert.equal(gesture.feed(70, 100).direction, 0);
assert.equal(gesture.feed(70, 250).direction, 1, 'A sustained gesture advances exactly one scene');
gesture.reset();
gesture.feed(90, 0); gesture.feed(90, 100);
assert.equal(gesture.feed(-90, 250).direction, 0, 'Reversing direction resets accumulated intent');
gesture.reset(); gesture.feed(90, 0);
assert.equal(gesture.feed(90, 400).progress, 0, 'Separated wheel ticks do not accumulate');
gesture.reset(); gesture.feed(-30, 0, true); gesture.feed(-30, 100, true);
assert.equal(gesture.feed(-30, 250, true).direction, -1, 'Sustained upward swipe returns a scene');
console.log('Passed sustained scroll intent: isolated ticks, threshold, pause, reversal, touch direction.');

const directory = renderToStaticMarkup(<Footer />);
for (const metadata of Object.values(pages)) {
  assert(directory.includes(`href="./${metadata.file}"`), `Footer must reach ${metadata.file}`);
}
const homepage = rendered.get('index.html')!;
assert(!homepage.includes('WORLD_01') && !homepage.includes('Keep scrolling'));
assert(!homepage.includes('href="./untitled.html"'));
assert(homepage.includes('href="#about"'));
assert(homepage.includes('href="#why-join"'));
assert(homepage.includes('id="about"'));
assert(homepage.includes('id="why-join"'));
assert(!homepage.match(/<h1[^>]*>[\s\S]*?<br\s*\/?>([\s\S]*?)<\/h1>/));
for (const channel of ['YouTube', 'Instagram', 'X', 'Facebook']) assert(directory.includes(`${channel} — link pending`));
const projectsPage = rendered.get('projects.html')!;
assert(!rendered.has('project.html') && !rendered.has('proposal.html'), 'Projects has one canonical content page');
for (const id of ['projects', 'project-preview', 'resources', 'propose']) assert(projectsPage.includes(`id="${id}"`), `Merged Projects contains ${id}`);
assert(projectsPage.includes('<form') && projectsPage.includes('Download your draft'), 'The full proposal form is embedded in Projects');
assert.equal(legacyProjectRedirect('/club/project.html'), './projects.html#project-preview');
assert.equal(legacyProjectRedirect('/club/proposal.html'), './projects.html#propose');
assert.equal(legacyProjectRedirect('/club/projects.html'), undefined);
for (const html of rendered.values()) {
  assert(!/href="\.\/(?:project|proposal)\.html/.test(html), 'Site navigation uses the merged page');
  assert(html.includes('This website is vibe coded with AI assistance.'), 'Every page identifies the website as vibe coded');
}
assert(!rendered.get('history.html')!.includes('class="scene-pager'), 'History timeline uses continuous reading');
const leap = monthCells(2028, 1);
assert.equal(leap.filter(Boolean).length, 29, 'Leap-year February has 29 days');
assert.equal(monthCells(2027, 1).filter(Boolean).length, 28);
assert.equal(monthCells(2026, 7).length, 42, 'Six-week months retain every date');
assert.equal(monthCells(2026, 1)[0], 1, 'Sunday-start month has no leading blanks');
const indexSource = await readFile(new URL('../index.html', import.meta.url), 'utf8');
assert(indexSource.includes('id="boot-loader"') && indexSource.includes('zaojing-chengyou-seal.svg'), 'Loading page retains Chinese seal');
console.log('Passed fourth revision: footer covers all routes, independent Untitled page, continuous forms/history, social bar, leap years and six-week calendars.');

import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../src/App';
import { shouldPlayIntro } from '../src/components/introPolicy';
import { DestinationLink } from '../src/components/ui';
import { ProjectCard } from '../src/sections/Projects';
import { EventEntry } from '../src/sections/Events';
import { SponsorLevel } from '../src/sections/Sponsorship';
import { destinations, projects, sponsorshipContact, proposalDestination, relatedOrganizations, events } from '../src/data/club';
const html = renderToStaticMarkup(<App />);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
const anchors = [...html.matchAll(/href="#([^"]*)"/g)].map(match => match[1]);
for (const anchor of anchors)
    assert(ids.includes(anchor), `Missing anchor: ${anchor}`);
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'One main heading');
assert(!html.includes('href="#"'), 'No dead links');
assert(!html.includes('opening-stage'), 'Static/reduced-enhancement HTML must start usable');
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
console.log(`Passed: ${ids.length} unique targets, ${anchors.length} working anchors, pending links, static fallback, populated project/event records, sponsor approval gate.`);
const firstVisit = { enabled: true, reducedMotion: false, replay: false, seen: false, deepLink: false };
assert(shouldPlayIntro(firstVisit));
assert(!shouldPlayIntro({ ...firstVisit, seen: true }));
assert(!shouldPlayIntro({ ...firstVisit, deepLink: true }));
assert(!shouldPlayIntro({ ...firstVisit, reducedMotion: true, replay: true }));
assert(!shouldPlayIntro({ ...firstVisit, enabled: false, replay: true }));
assert(shouldPlayIntro({ ...firstVisit, seen: true, replay: true }));
console.log('Passed intro policy: first visit, repeat visit, deep links, reduced motion, disabled intro, replay.');

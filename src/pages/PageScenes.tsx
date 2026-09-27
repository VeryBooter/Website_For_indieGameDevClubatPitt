import type { ReactNode } from 'react';
import { Proposal } from './Proposal';
import type { Scene } from '../components/ScenePager';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { About } from '../sections/About';
import { Events } from '../sections/Events';
import { Join } from '../sections/Join';
import { SponsorLevel, SponsorMark } from '../sections/Sponsorship';
import { DestinationLink, DraftNote } from '../components/ui';
import { club, people, teamPhoto, sponsors, sponsorshipLevels, sponsorshipContact, sponsorshipPacket, destinations, projectPreview, gallery, history } from '../data/club';
import type { PageId } from '../navigation/pages';
function Title({ label, children, first = false }: { label: string; children: ReactNode; first?: boolean }) {
  const Tag = first ? 'h1' : 'h2';
  return <div className="page-scene-title"><p className="eyebrow">{label}</p><Tag>{children}</Tag></div>;
}
function ClubIntroduction() {
  return <section className="wrap scene-section centered-intro" id="team"><p className="eyebrow">INDIE GAME DEV CLUB @ PITT</p><h1>About our <em>club.</em></h1><p className="intro-lead">{club.mission}</p><DraftNote /><div className="intro-links"><a className="text-link" href="#community">Our community ↓</a><a className="text-link" href="./members.html">Meet the team ↓</a><a className="button button-ink" href="./join.html">Join us ↗</a></div></section>;
}
function Community() {
  return <section className="wrap scene-section scene-split" id="community"><div><Title label="OUR COMMUNITY">Supporting game<br />makers <em>at Pitt.</em></Title><p className="body-large">{club.peopleIntro}</p><DraftNote /><a className="text-link" href="./history.html">Our history & gallery ↗</a></div><figure className="photo-slot">{teamPhoto ? <img src={teamPhoto.src} alt={teamPhoto.alt} loading="lazy" /> : <div><span className="eyebrow">THE COMMUNITY</span><h3>Room for<br />every perspective.</h3><p>A club photo will appear here once supplied and approved.</p></div>}</figure></section>;
}
function TeamDirectory() {
  return <section className="wrap scene-section" id="directory"><Title label="TEAM / MEMBERS / ADVISORS">The people behind <em>the play.</em></Title>{people.length ? <div className="team-directory">{people.map(person => <article key={person.name}>{person.photo && <img src={person.photo} alt={person.name} loading="lazy" />}<h3>{person.name}</h3><p>{person.role}</p><p>{person.bio}</p>{person.linkedinUrl && <a className="text-link" href={person.linkedinUrl}>LinkedIn ↗</a>}</article>)}</div> : <div className="directory-pending"><span className="eyebrow">PROFILES TO COME</span><p>{club.pending.people}</p><p>Names, roles, portraits, and LinkedIn profiles will be added after confirmation.</p></div>}</section>;
}
function Discover() {
  return <section className="wrap scene-section" id="discover"><Title label="UNTITLED">Untitled</Title><div className="discovery-grid">{[1, 2, 3, 4].map((item, index) => <a key={item} className={index === 0 ? 'discovery-feature' : undefined} href={`./untitled.html${index ? '#details' : ''}`} aria-label={`Untitled — preview ${item}`}><span className="eyebrow">0{item}</span><h3>Untitled</h3><span>Untitled ↗</span></a>)}</div></section>;
}
function SponsorshipIntro() {
  return <section className="wrap scene-section centered-intro" id="sponsorship"><Title label="SPONSORSHIP" first>{club.sponsorIntro}</Title><DraftNote /><p className="intro-lead">Explore the club’s supporters, purpose, sponsorship opportunities, and contact information.</p><div className="sponsor-index"><a href="#supporters"><span>01</span>Our supporters ↓</a><a href="#why-sponsor"><span>02</span>Why sponsor? ↓</a><a href="#levels"><span>03</span>Sponsorship levels ↓</a><a href="#sponsor-contact"><span>04</span>Contact ↓</a><a href="./projects.html"><span>05</span>Our projects ↗</a><a href="./team.html"><span>06</span>Our team ↗</a></div></section>;
}
function Supporters() {
  return <section className="wrap scene-section" id="supporters"><Title label="OUR SUPPORTERS">A place for those<br />who <em>help us grow.</em></Title><div className="supporter-wall">{sponsors.length ? sponsors.map(sponsor => <SponsorMark key={sponsor.name} sponsor={sponsor} />) : <><span className="eyebrow">SUPPORTER INFORMATION PENDING</span><p>{club.pending.supporters}</p></>}</div></section>;
}
function WhySponsor() {
  return <section className="wrap scene-section scene-split" id="why-sponsor"><div><Title label="WHY SPONSOR?">Support the process.<br /><em>See what takes shape.</em></Title><p className="body-large">{club.sponsorshipRationale}</p><DraftNote /></div><div className="sponsor-document"><span className="eyebrow">SPONSORSHIP INFORMATION</span><h3>The next chapter<br />starts with a conversation.</h3><DestinationLink destination={sponsorshipPacket} /></div></section>;
}
function Levels() {
  const approved = sponsorshipLevels.filter(level => level.approved);
  return <section className="wrap scene-section" id="levels"><Title label="SPONSORSHIP LEVELS">Ways to <em>support.</em></Title>{approved.length ? <div className="level-grid">{approved.map(level => <SponsorLevel level={level} key={level.name} />)}</div> : <div className="levels-pending"><span className="eyebrow">DETAILS UNDER REVIEW</span><h3>Good partnerships<br />begin with clear expectations.</h3><p>{club.pending.levels}</p><p>Confirmed contributions and benefits will be published here together.</p></div>}</section>;
}
function SponsorContact() {
  return <section className="wrap scene-section" id="sponsor-contact"><Title label="CONTACT">Let’s begin<br /><em>a conversation.</em></Title><div className="contact-layout"><div className="sponsor-document"><span className="eyebrow">INFORMATION PACKET</span><DestinationLink destination={sponsorshipPacket} /></div><div><h3>Speak with the club</h3><DestinationLink destination={sponsorshipContact} /><div className="contact-options"><a className="text-link" href="./team.html">Meet the team ↗</a><a className="text-link" href="./projects.html">Explore the work ↗</a></div></div></div></section>;
}
function Resources() {
  return <section className="wrap scene-section scene-split" id="resources"><Title label="DOCUMENTATION">Open the<br /><em>notebook.</em></Title><div><p className="body-large">Project documentation and development notes.</p><a className="text-link" href="./docs.html">Documentation ↗</a><a className="text-link" href="./proposal.html">Propose a project ↗</a></div></section>;
}
function Propose() {
  return <section className="wrap scene-section scene-split" id="propose"><Title label="A NEW START">Have <em>an idea?</em></Title><div><p className="body-large">Describe the idea and what it needs to take shape.</p><a className="text-link" href="./proposal.html">Start your proposal ↗</a></div></section>;
}
function Documentation() {
  return <section className="wrap scene-section docs-page" id="documentation"><Title label="DOCUMENTATION" first>Untitled</Title><div className="docs-layout"><nav aria-label="Documentation contents"><span className="eyebrow">CONTENTS</span><a href="#untitled-doc">01 / Untitled</a></nav><article id="untitled-doc"><p className="eyebrow">01 / UNTITLED</p><h2>Untitled</h2><p>Untitled</p><details><summary>Untitled <span aria-hidden="true">+</span></summary><p>Untitled</p></details></article></div><a className="text-link" href="./projects.html">All projects ↗</a></section>;
}
function UntitledIntro() {
  return <section className="wrap scene-section scene-split" id="untitled"><div><Title label="UNTITLED" first>Untitled</Title><p className="body-large">Untitled</p><a className="button button-ink" href="#details" aria-label="Read Untitled details">Untitled ↓</a></div><div className="untitled-visual" role="img" aria-label="Untitled image placeholder"><span>Untitled</span></div></section>;
}
function UntitledDetails() {
  return <section className="wrap scene-section" id="details"><Title label="UNTITLED">Untitled</Title><div className="untitled-grid">{[1,2,3].map(item => <article key={item}><span className="eyebrow">0{item}</span><h3>Untitled</h3><p>Untitled</p><details><summary>Untitled</summary><p>Untitled</p></details></article>)}</div><a className="text-link" href="#next">Untitled ↓</a></section>;
}
function UntitledNext() {
  return <section className="wrap scene-section centered-intro" id="next"><Title label="UNTITLED">Untitled</Title><p className="intro-lead">Untitled</p><div className="intro-links"><a className="button button-join" href="./join.html" aria-label="Join us">Untitled ↗</a><a className="text-link" href="./index.html#discover" aria-label="Back to Home">Untitled ↗</a></div></section>;
}
function ProjectDetail() {
  return <section className="wrap scene-section scene-split" id="project-preview"><div><Title label="PROJECT PREVIEW" first>{projectPreview.title}</Title><span className="draft-note">{projectPreview.titleStatus}</span><p className="body-large">{projectPreview.description}</p>{projectPreview.githubUrl ? <a className="button button-ink" href={projectPreview.githubUrl}>GitHub ↗</a> : <p className="pending-line">GitHub repository · awaiting a verified link</p>}<a className="text-link" href="./projects.html">All projects ↗</a></div><div className="demo-area">{projectPreview.videoUrl ? <video controls preload="metadata" poster={projectPreview.poster ?? undefined} src={projectPreview.videoUrl} aria-label={`${projectPreview.title} demonstration`} /> : <div><span className="eyebrow">GAME DEMONSTRATION</span><h3>A window into<br />the work.</h3><p>The project demo video has not been supplied yet.</p></div>}</div></section>;
}
function Gallery() {
  return <section className="wrap scene-section" id="gallery"><Title label="GALLERY">Moments <em>from the club.</em></Title>{gallery.length ? <div className="gallery-grid gallery-mosaic">{gallery.map(item => <figure key={item.src}><img src={item.src} alt={item.alt} loading="lazy" /><figcaption>{item.caption}</figcaption></figure>)}</div> : <><p className="gallery-note">{club.pending.gallery}</p><div className="gallery-mosaic" aria-label="Gallery awaiting photographs">{[1,2,3,4,5,6].map(item => <div className="gallery-placeholder" key={item}><span>Untitled</span></div>)}</div></>}</section>;
}
function History({ first = false }: { first?: boolean }) {
  return <section className="wrap scene-section" id="history"><Title label="OUR HISTORY" first={first}>Every community<br />has <em>a beginning.</em></Title><p className="gallery-note">{club.pending.history}</p><div className="history-timeline">{history.length ? history.map(item => <article key={item.year}><span className="timeline-dot" /><h3>{item.year}</h3><p>{item.text}</p></article>) : [1,2,3,4].map(item => <article key={item}><span className="timeline-dot" /><span className="eyebrow">0{item}</span><h3>Untitled</h3><p>Untitled</p></article>)}</div><a className="text-link" href="#gallery">Gallery ↓</a></section>;
}
function Elsewhere() {
  return <section className="wrap scene-section scene-split" id="elsewhere"><Title label="STAY CONNECTED">Keep the<br /><em>conversation going.</em></Title><div className="social-directory">{destinations.slice(3).map(destination => <DestinationLink key={destination.label} destination={destination} />)}</div></section>;
}
export function pageScenes(page: PageId): Scene[] {
  switch (page) {
    case 'home': return [{ id: 'home', label: 'Home', content: <Hero /> }, { id: 'discover', label: 'Untitled', content: <Discover /> }, { id: 'events', label: 'Club almanac', content: <Events /> }];
    case 'projects': return [{ id: 'projects', label: 'Project notebook', content: <><h1 className="sr-only">Projects</h1><Projects showSidebar={false} /></> }, { id: 'resources', label: 'Documentation', content: <Resources /> }, { id: 'propose', label: 'Propose a project', content: <Propose /> }];
    case 'docs': return [{ id: 'documentation', label: 'Documentation', content: <Documentation /> }];
    case 'proposal': return [{ id: 'propose', label: 'Propose a project', content: <Proposal /> }];
    case 'history': return [{ id: 'history', label: 'History', content: <History first /> }, { id: 'gallery', label: 'Gallery', content: <Gallery /> }];
    case 'members': return [{ id: 'directory', label: 'Members', content: <><h1 className="sr-only">Members</h1><TeamDirectory /></> }, { id: 'events', label: 'Events', content: <Events /> }];
    case 'untitled': return [{ id: 'untitled', label: 'Untitled', content: <UntitledIntro /> }, { id: 'details', label: 'Untitled', content: <UntitledDetails /> }, { id: 'next', label: 'Untitled', content: <UntitledNext /> }];
    case 'project': return [{ id: 'project-preview', label: 'Project preview', content: <ProjectDetail /> }];
    case 'team': return [{ id: 'team', label: 'About our club', content: <ClubIntroduction /> }, { id: 'community', label: 'Our community', content: <Community /> }, { id: 'directory', label: 'Team directory', content: <TeamDirectory /> }, { id: 'join', label: 'Join us', content: <Join /> }];
    case 'sponsorship': return [{ id: 'sponsorship', label: 'Sponsorship', content: <SponsorshipIntro /> }, { id: 'supporters', label: 'Our supporters', content: <Supporters /> }, { id: 'why-sponsor', label: 'Why sponsor?', content: <WhySponsor /> }, { id: 'levels', label: 'Sponsorship levels', content: <Levels /> }, { id: 'sponsor-contact', label: 'Contact', content: <SponsorContact /> }];
    case 'about': return [{ id: 'about', label: 'Our purpose', content: <><h1 className="sr-only">About the club</h1><About /></> }, { id: 'history', label: 'Our history', content: <History /> }, { id: 'gallery', label: 'Gallery', content: <Gallery /> }];
    case 'events': return [{ id: 'events', label: 'Club almanac', content: <><h1 className="sr-only">Events</h1><Events /></> }];
    case 'join': return [{ id: 'join', label: 'Join us', content: <><h1 className="sr-only">Join us</h1><Join /></> }, { id: 'elsewhere', label: 'Stay connected', content: <Elsewhere /> }];
  }
}

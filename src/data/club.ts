/** Editorial source of truth. Null URLs mean pending; never substitute '#'.
 * Publish only verified records. Draft copy is explicitly labeled in the UI.
 * Asset paths are relative (assets/...) so GitHub Pages project paths work.
 */
export type Destination = {
    label: string;
    url: string | null;
    pending: string;
};
export type Project = {
    id: string;
    name: string;
    description: string;
    artwork: string | null;
    artworkAlt: string;
    contributors: string[];
    status: string;
    technologies: string[];
    detailUrl: string | null;
    documentationUrl: string | null;
    githubUrl: string | null;
};
export type Person = {
    name: string;
    role: string;
    group: 'member' | 'officer' | 'advisor';
    linkedinUrl?: string | null;
    photo: string | null;
    bio: string;
};
export type ClubEvent = {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    url: string | null;
};
export type Sponsor = {
    name: string;
    logo: string;
    url: string | null;
};
export type SponsorshipLevel = {
    name: string;
    description: string;
    benefits: string[];
    amount: string | null;
    approved: boolean;
};
export const club = {
    name: 'Indie Game Dev Club @ Pitt',
    shortName: 'iGDC',
    introEnabled: false,
    copyStatus: 'draft' as 'draft' | 'approved',
    tagline: 'A little curiosity. A world of possibilities.',
    mission: 'A space for different perspectives to meet through making games. Bring your ideas, explore the craft, and find your next collaborator.',
    peopleIntro: 'Art. Code. Sound. Story. Different ways of thinking, with a shared curiosity for games.',
    sponsorIntro: 'Help make room for the next idea.',
    sponsorshipRationale: 'Game development brings creative and technical disciplines together. Support can help turn student curiosity into opportunities to learn and make.',
    pending: {
        projects: 'Project details are being prepared for this site. Published work, contributors, and development notes will appear here once confirmed.',
        people: 'Member, officer, and advisor profiles are awaiting confirmation.',
        events: 'The next gathering has not been published here yet. Dates, locations, and a shared calendar will appear when confirmed.',
        history: 'The club’s story is awaiting an approved history.',
        gallery: 'Club photos and captions will be added with permission.',
        supporters: 'Supporter information has not been published.',
        levels: 'Sponsorship levels and benefits have not yet been approved.',
        contact: 'A verified sponsorship contact is not yet available on this site.',
        join: 'Official joining details are being confirmed. Discord, mailing list, and meeting information will appear here as soon as verified.',
        proposal: 'A project proposal channel is not yet available. Joining details will be added below when confirmed.',
    },
};
export type NavigationItem = { label: string; href: string; children?: { label: string; href: string; group?: string }[] };
export const navigation: NavigationItem[] = [
    { label: 'Home', href: './index.html' },
    { label: 'Projects', href: './projects.html' },
    { label: 'Team', href: './team.html', children: [
      { label: 'Art Team', href: './art-team.html' },
      { label: 'Code Team', href: './code-team.html' },
      { label: 'Members & Events', href: './members.html' },
      { label: 'History & Gallery', href: './history.html' },
    ] },
    { label: 'Wiki', href: './wiki.html' },
    { label: 'Sponsorship', href: './sponsorship.html' },
    { label: 'Game Jam', href: 'https://itch.io/jam/pitt-games-4-social-impact-2026' },
];
export const destinations: Destination[] = [
    { label: 'Discord', url: 'https://discord.gg/kqns4AvEN', pending: 'Invite pending' },
    { label: 'Mailing list', url: null, pending: 'Signup pending' },
    { label: 'Calendar', url: null, pending: 'Link pending' },
    { label: 'LinkedIn', url: null, pending: 'Link pending' },
    { label: 'GitHub', url: null, pending: 'Club profile pending' },
    { label: 'Instagram', url: null, pending: 'Link pending' },
    { label: 'YouTube', url: null, pending: 'Link pending' },
    { label: 'X', url: null, pending: 'Link pending' },
    { label: 'Facebook', url: null, pending: 'Link pending' },
];
export const projects: Project[] = [];
export const people: Person[] = [];
// Schedule published on the event's itch.io page, checked September 28, 2026.
export const gameJam = {
    title: "Pitt’s Games 4 Social Impact 2026",
    url: 'https://itch.io/jam/pitt-games-4-social-impact-2026',
    dates: 'October 16–18, 2026',
};
export const events: ClubEvent[] = [
    { id: 'g4si-orientation-2026', title: 'Games 4 Social Impact · Orientation', date: '2026-10-16', time: '5–9 pm', location: 'University of Pittsburgh · see event details', description: 'Orientation, team registration, keynote, and meeting fellow jammers.', url: gameJam.url },
    { id: 'g4si-jam-2026', title: 'Games 4 Social Impact · Game Jam', date: '2026-10-17', time: '9 am Saturday–noon Sunday', location: 'University of Pittsburgh · see event details', description: 'Create a digital or analog game about social impact. See the event page for registration and eligibility.', url: gameJam.url },
    { id: 'g4si-showcase-2026', title: 'Games 4 Social Impact · Judging & Awards', date: '2026-10-18', time: 'Judging 2–4 pm · Awards 4–5 pm', location: 'University of Pittsburgh · see event details', description: 'Evaluation by judges and participants, followed by the awards ceremony.', url: gameJam.url },
];
export const sponsors: Sponsor[] = [];
export const sponsorshipLevels: SponsorshipLevel[] = [];
export const sponsorshipContact: Destination = { label: 'Contact the club', url: null, pending: club.pending.contact };
export const proposalDestination: Destination = { label: 'Propose a project', url: null, pending: club.pending.proposal };
export const relatedOrganizations: Destination[] = [];
// No claims about founding dates, membership counts, or sponsor commitments are approved.
export const history: {
    year: string;
    text: string;
}[] = [];
export const gallery: {
    src: string;
    alt: string;
    caption: string;
}[] = [];

// The sketch names this project provisionally. Never present it as a released game.
export const projectPreview = {
  title: 'Legio Astralis', titleStatus: 'Demo · title up to Board',
  description: 'Project details are awaiting confirmation. This page reserves space for the game, its development team, and a playable demonstration.',
  githubUrl: null as string | null, videoUrl: null as string | null, poster: null as string | null,
};
export const teamPhoto: { src: string; alt: string } | null = null;
export const sponsorshipPacket: Destination = { label: 'Sponsorship information', url: null, pending: 'Approved sponsorship document pending' };

export const contactEmail = 'yul424@pitt.edu';
export const joinEmailUrl = `mailto:${contactEmail}?subject=${encodeURIComponent('Joining iGDC at Pitt')}&body=${encodeURIComponent('Hi!\n\nI would like to join iGDC at Pitt.\n\nMy name: \nMy interests: \n\nThank you!')}`;

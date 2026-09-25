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
    name: 'Indie Game Dev Club at Pitt',
    shortName: 'Indie Game Dev',
    introEnabled: true,
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
export const navigation = [
    { label: 'Home', href: '#home' }, { label: 'Projects', href: '#projects' },
    { label: 'People', href: '#people' }, { label: 'Sponsorship', href: '#sponsorship' },
    { label: 'About', href: '#about' },
];
export const destinations: Destination[] = [
    { label: 'Discord', url: null, pending: 'Invite pending' },
    { label: 'Mailing list', url: null, pending: 'Signup pending' },
    { label: 'Calendar', url: null, pending: 'Link pending' },
    { label: 'LinkedIn', url: null, pending: 'Link pending' },
    { label: 'GitHub', url: null, pending: 'Club profile pending' },
    { label: 'Instagram', url: null, pending: 'Link pending' },
    { label: 'YouTube', url: null, pending: 'Link pending' },
];
export const projects: Project[] = [];
export const people: Person[] = [];
export const events: ClubEvent[] = [];
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

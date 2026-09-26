export const pages = {
  home: { file: 'index.html', label: 'Home', title: 'Building Our Game Dev Community @ Pitt | Indie Game Dev Club @ Pitt', description: 'Building our game development community at Pitt. Explore projects, meet the team, and find out how to join.' },
  projects: { file: 'projects.html', label: 'Projects', title: 'Projects | Indie Game Dev Club @ Pitt', description: 'Game projects, development documentation, and project proposals.' },
  project: { file: 'project.html', label: 'Project preview', title: 'Project Preview | Indie Game Dev Club @ Pitt', description: 'A project detail preview with space for a game demonstration and development resources.' },
  team: { file: 'team.html', label: 'Team', title: 'Team | Indie Game Dev Club @ Pitt', description: 'Meet the team and learn about the game development community at Pitt.' },
  sponsorship: { file: 'sponsorship.html', label: 'Sponsorship', title: 'Sponsorship | Indie Game Dev Club @ Pitt', description: 'Supporters, reasons to sponsor, approved sponsorship opportunities, and contact information.' },
  about: { file: 'about.html', label: 'About', title: 'About | Indie Game Dev Club @ Pitt', description: 'The club’s purpose, history, gallery, and events.' },
  events: { file: 'events.html', label: 'Events', title: 'Events | Indie Game Dev Club @ Pitt', description: 'The club almanac, meeting details, and shared calendar.' },
  join: { file: 'join.html', label: 'Join', title: 'Join | Indie Game Dev Club @ Pitt', description: 'Joining information, mailing list, and verified club social channels.' },
} as const;
export type PageId = keyof typeof pages;
export function pageFromPath(path: string): PageId {
  const file = path.split('/').filter(Boolean).pop() ?? 'index.html';
  return (Object.keys(pages) as PageId[]).find(id => pages[id].file === file) ?? 'home';
}
export function pageHref(id: PageId, anchor?: string) { return `./${pages[id].file}${anchor ? `#${anchor}` : ''}`; }

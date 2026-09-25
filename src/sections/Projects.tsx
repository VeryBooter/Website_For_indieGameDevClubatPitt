import { club, projects, proposalDestination, type Project } from '../data/club';
import { SectionHeading } from '../components/ui';
export function ProjectCard({ project, featured = false }: {
    project: Project;
    featured?: boolean;
}) {
    return <article className={`project-card ${featured ? 'featured-project' : ''}`}>
    {project.artwork && <img src={project.artwork} alt={project.artworkAlt} loading="lazy" width="900" height="600"/>}
    <div className="project-card-copy"><p className="eyebrow">{project.status}</p><h3>{project.name}</h3><p>{project.description}</p>
      <details id={`project-${project.id}`}><summary>Project details <span aria-hidden="true">+</span></summary><p>Contributors: {project.contributors.length ? project.contributors.join(', ') : 'Awaiting confirmation'}</p><p>Technologies: {project.technologies.length ? project.technologies.join(', ') : 'Awaiting confirmation'}</p><div className="resource-links">{project.detailUrl && <a href={project.detailUrl}>Full project page ↗</a>}{project.documentationUrl && <a href={project.documentationUrl}>Documentation ↗</a>}{project.githubUrl && <a href={project.githubUrl}>GitHub ↗</a>}</div></details>
    </div></article>;
}
export function Projects() {
    return <section className="section wrap projects-section" id="projects" aria-labelledby="projects-title">
    <div className="section-top" data-reveal><SectionHeading number="02" label="PROJECT NOTEBOOK"><span id="projects-title">Ideas, taking shape.</span></SectionHeading><span className="section-aside">FROM FIRST SKETCH TO PLAYABLE THING</span></div>
    <div className="project-layout" data-reveal>
      {projects.length ? <div className="project-list">{projects.map((project, i) => <ProjectCard project={project} featured={i === 0} key={project.id}/>)}</div> : <article className="project-empty"><div className="notebook-head"><span>THE WORK</span><span>01 / OPEN PAGE</span></div><div className="notebook-center"><span className="outline-plus" aria-hidden="true">+</span><h3>A space for<br />what comes next.</h3></div><p>{club.pending.projects}</p><span className="small-label">PROJECT SHOWCASE · AWAITING SUBMISSIONS</span></article>}
      <aside className="project-sidebar"><div id="resources"><p className="eyebrow">BEHIND THE BUILD</p><h3>More than<br />the final game.</h3><p>Project documentation, experiments, and development notes will live alongside each published project.</p><span className="small-label">RESOURCES PENDING</span></div><div id="propose"><p className="eyebrow">A NEW START</p><h3>Have an idea?</h3>{proposalDestination.url ? <a className="text-link" href={proposalDestination.url}>Propose a project <span aria-hidden="true">↗</span></a> : <><p>{proposalDestination.pending}</p><a className="text-link" href="#join">Joining information <span aria-hidden="true">↗</span></a></>}</div></aside>
    </div>
  </section>;
}

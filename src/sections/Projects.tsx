import { projectPreview, projects, proposalDestination, type Project } from '../data/club';
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
export function Projects({ showSidebar = true }: { showSidebar?: boolean }) {
    return <section className="section wrap projects-section" id="projects" aria-labelledby="projects-title">
    <div className="section-top" data-reveal><SectionHeading number="02" label="PROJECT NOTEBOOK"><span id="projects-title">{projectPreview.title}</span></SectionHeading></div>
    <div className={`project-layout${showSidebar ? '' : ' showcase-only'}`} data-reveal>
      {projects.length ? <div className="project-list">{projects.map((project, i) => <ProjectCard project={project} featured={i === 0} key={project.id}/>)}</div> : <article className="project-demo-layout"><div className="project-demo-copy"><p className="eyebrow">THE WORK</p><h3>Title up to Board</h3><p>Explanation up to Board</p><a className="text-link" href="./project.html">View the project ↗</a></div><div className="project-video-slot">{projectPreview.videoUrl ? <video controls preload="metadata" poster={projectPreview.poster ?? undefined} src={projectPreview.videoUrl} aria-label="Legio Astralis video demo" /> : <div><span className="eyebrow">VIDEO DEMO</span><h3>Demo</h3><p>Up to Board</p></div>}</div></article>}
      {showSidebar && <aside className="project-sidebar"><div id="resources"><p className="eyebrow">BEHIND THE BUILD</p><h3>More than<br />the final game.</h3><p>Project documentation, experiments, and development notes will live alongside each published project.</p><span className="small-label">RESOURCES PENDING</span></div><div id="propose"><p className="eyebrow">A NEW START</p><h3>Have an idea?</h3>{proposalDestination.url ? <a className="text-link" href={proposalDestination.url}>Propose a project <span aria-hidden="true">↗</span></a> : <><p>{proposalDestination.pending}</p><a className="text-link" href="./join.html">Joining information <span aria-hidden="true">↗</span></a></>}</div></aside>}
    </div>
  </section>;
}

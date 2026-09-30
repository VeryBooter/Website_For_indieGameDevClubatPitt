import { projectPreview, projects, type Project } from '../data/club';
import { DrawnUnderline } from '../components/DrawnUnderline';
export function ProjectCard({ project, featured = false }: {
    project: Project;
    featured?: boolean;
}) {
    return <article className={`project-card ${featured ? 'featured-project' : ''}`}>
    {project.artwork && <img src={project.artwork} alt={project.artworkAlt} loading="lazy" width="900" height="600"/>}
    <div className="project-card-copy"><p className="eyebrow">{project.status}</p><h3>{project.name}</h3><p>{project.description}</p>
      <details id={`project-${project.id}`}><summary>Project details <span aria-hidden="true">+</span></summary><p>Contributors: {project.contributors.length ? project.contributors.join(', ') : 'Awaiting confirmation'}</p><p>Technologies: {project.technologies.length ? project.technologies.join(', ') : 'Awaiting confirmation'}</p><div className="resource-links">{project.detailUrl && <a href={project.detailUrl}>Full project page ↗</a>}{project.documentationUrl && <a href={project.documentationUrl}>Wiki ↗</a>}{project.githubUrl && <a href={project.githubUrl}>GitHub ↗</a>}</div></details>
    </div></article>;
}
export function Projects() {
  return <section className="wrap scene-section projects-overview" id="projects" aria-labelledby="projects-title">
    <p className="eyebrow">PROJECT NOTEBOOK</p>
    <h1 id="projects-title"><DrawnUnderline>Our <em>projects.</em></DrawnUnderline></h1>
    <p className="body-large">Explore the work, find development resources, or propose our next game.</p>
    <nav className="project-page-nav" aria-label="On this Projects page">
      <a href="#project-preview">{projectPreview.title} ↓</a>
      <a href="#resources">Wiki & resources ↓</a>
      <a href="#propose">Propose a project ↓</a>
    </nav>
    {projects.length > 0 && <div className="project-list">{projects.map((project, i) => <ProjectCard project={project} featured={i === 0} key={project.id} />)}</div>}
  </section>;
}

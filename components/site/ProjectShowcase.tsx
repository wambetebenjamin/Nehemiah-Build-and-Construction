"use client";

import { TransitionLink } from "@/components/site/Navigation";
import { useEffect, useMemo, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { projects, type Project } from "@/lib/content";

const filters = ["All", "Residential", "Commercial", "Civil"] as const;
type Filter = (typeof filters)[number];

export function ProjectShowcase({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [loading, setLoading] = useState(true);
  const filtered = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.category === filter), [filter]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className={`projects-section section-space${compact ? " projects-section-compact" : ""}`} id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-heading section-heading-split">
          <div><span className="eyebrow">Selected work</span><h2 id="projects-title">Built for life.<br /><em>Made to last.</em></h2></div>
          <div className="projects-heading-aside"><p>Every site tells a different story. Explore a few representative project profiles.</p><p className="sample-disclosure">Illustrative portfolio content · replace with approved project records before launch.</p></div>
        </div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="projects-grid" aria-busy={loading} aria-live="polite">
          {loading ? Array.from({ length: Math.max(filtered.length, 3) }).map((_, index) => <ProjectSkeleton key={`skeleton-${filter}-${index}`} />) : filtered.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0 && filter === "All"} />)}
        </div>
        {!loading && filtered.length === 0 && <p className="empty-state">No projects in this category yet.</p>}
        <div className="projects-bottom"><span className="projects-counter"><b>{String(filtered.length).padStart(2, "0")}</b> / {String(projects.length).padStart(2, "0")} profiles</span>{compact ? <TransitionLink href="/#contact" className="button button-dark">Discuss a project <ArrowRight aria-hidden="true" /></TransitionLink> : <TransitionLink href="/projects" className="button button-dark">Explore all projects <ArrowRight aria-hidden="true" /></TransitionLink>}</div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const handleTilt = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${Math.max(-3.5, Math.min(3.5, -y * 7))}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${Math.max(-3.5, Math.min(3.5, x * 7))}deg`);
  };
  const clearTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article className={`project-card${featured ? " project-card-3d" : ""}`} onPointerMove={featured ? handleTilt : undefined} onPointerLeave={featured ? clearTilt : undefined}>
      {featured && <div className="project-card-layer layer-back" aria-hidden="true" />}
      <TransitionLink href={`/projects/${project.slug}`} className="project-card-main">
        <div className="project-image"><img src={project.image} alt={`${project.title} — illustrative construction photography`} loading="lazy" /><span className="project-category">{project.category}</span><span className="project-sample">Example profile</span><span className="project-overlay-arrow"><ArrowRight aria-hidden="true" /></span></div>
        <div className="project-card-copy"><div className="project-card-top"><h3>{project.title}</h3><span className="project-year">{project.year}</span></div><p className="project-location"><MapPin aria-hidden="true" />{project.location}</p><p className="project-excerpt">{project.excerpt}</p><div className="project-card-bottom"><span>{project.value}</span><span className="text-link">View project <ArrowRight aria-hidden="true" /></span></div></div>
      </TransitionLink>
      {featured && <div className="project-card-layer layer-front" aria-hidden="true" />}
    </article>
  );
}

function ProjectSkeleton() {
  return <article className="project-card skeleton-card" aria-hidden="true"><div className="skeleton-image shimmer" /><div className="project-card-copy"><div className="skeleton-line shimmer skeleton-title" /><div className="skeleton-line shimmer skeleton-meta" /><div className="skeleton-line shimmer skeleton-copy" /><div className="skeleton-line shimmer skeleton-copy skeleton-copy-short" /><div className="skeleton-line shimmer skeleton-footer" /></div></article>;
}

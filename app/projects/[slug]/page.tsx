import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TransitionLink } from "@/components/site/Navigation";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, ShieldCheck } from "lucide-react";
import { projects } from "@/lib/content";
import { EnquiryForm } from "@/components/forms/Forms";

export const revalidate = 600;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: { type: "article", title: `${project.title} | Nehemiah Build`, description: project.excerpt, images: [{ url: project.image, alt: `${project.title} illustrative project photography` }] },
    twitter: { card: "summary_large_image", title: project.title, description: project.excerpt, images: [project.image] },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    image: project.gallery.map((image) => `${process.env.NEXT_PUBLIC_SITE_URL || "https://localhost"}${image}`),
    locationCreated: { "@type": "Place", name: project.location },
    creator: { "@type": "LocalBusiness", name: "Nehemiah Build & Construction" },
    dateCreated: project.year.replace("*", ""),
    about: project.category,
  };

  return (
    <article className="project-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="project-detail-hero">
        <img src={project.image} alt={`${project.title} — illustrative stock photography`} fetchPriority="high" />
        <div className="project-detail-shade" />
        <div className="container project-detail-heading"><TransitionLink className="detail-back" href="/projects"><ArrowLeft aria-hidden="true" /> All projects</TransitionLink><span className="eyebrow">{project.category} · Illustrative profile</span><h1 tabIndex={-1}>{project.title}</h1><div className="project-detail-meta"><span><MapPin aria-hidden="true" />{project.location}</span><span><CalendarDays aria-hidden="true" />{project.year}</span><span>{project.value}</span></div></div>
      </header>
      <div className="container project-detail-body">
        <aside className="project-facts"><span className="eyebrow">Project snapshot</span><dl><div><dt>Type</dt><dd>{project.category}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Indicative value</dt><dd>{project.value}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div></dl><p className="sample-disclosure">Illustrative content; not a verified Nehemiah Build project record.</p><Link className="button button-dark" href="/#contact">Discuss a similar project <ArrowRight aria-hidden="true" /></Link></aside>
        <div className="project-detail-copy"><span className="eyebrow">The brief</span><h2>Every strong build<br /><em>starts with listening.</em></h2><p>{project.brief}</p><div className="project-story-columns"><section><h3>Our role</h3><p>{project.role}</p></section><section><h3>Challenge &amp; response</h3><p><strong>The challenge:</strong> {project.challenge}</p><p><strong>Our approach:</strong> {project.solution}</p></section></div><section className="project-timeline"><h3>Completion timeline</h3><ol>{project.timeline.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section><blockquote className="project-quote"><ShieldCheck aria-hidden="true" /><p>“{project.testimonial}”</p><cite>Illustrative sample · replace with approved client testimonial</cite></blockquote></div>
      </div>
      <section className="project-gallery-section"><div className="container"><div className="section-heading section-heading-split"><div><span className="eyebrow">In the field</span><h2>Built one step<br /><em>at a time.</em></h2></div><p>Photography shown is illustrative Pexels stock and is not documentation of this sample profile.</p></div><div className="project-gallery">{project.gallery.map((image, index) => <figure key={`${image}-${index}`}><img src={image} alt={`${project.title} illustrative construction photo ${index + 1}`} loading="lazy" /><figcaption>Illustrative project photography · {index + 1}</figcaption></figure>)}</div></div></section>
      <section className="project-detail-cta"><div className="container project-detail-cta-inner"><div><span className="eyebrow">Your project could be next</span><h2>Let&apos;s plan a build<br /><em>that works for you.</em></h2></div><Link href="/#contact" className="button button-primary">Request a Quote <ArrowRight aria-hidden="true" /></Link></div></section>
      <section className="project-detail-enquiry"><div className="container"><div className="section-heading"><span className="eyebrow">Tell us what you&apos;re planning</span><h2>Start with a <em>conversation.</em></h2></div><EnquiryForm compact /></div></section>
    </article>
  );
}

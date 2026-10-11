import { TransitionLink } from "@/components/site/Navigation";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays } from "lucide-react";
import { insights } from "@/lib/content";

export const revalidate = 600;
export const metadata: Metadata = {
  title: "Insights",
  description: "Construction tips, material guides, project planning notes, and updates from the Nehemiah Build team.",
  openGraph: { title: "Insights | Nehemiah Build", description: "Practical notes for building in Kenya.", images: ["/images/architects-blueprint.jpg"] },
};

export default function InsightsPage() {
  return (
    <>
      <section className="page-intro insight-page-intro"><div className="container"><span className="eyebrow">Ideas for your next project</span><h1 tabIndex={-1}>Notes from the<br /><em>build journey.</em></h1><p>Practical insights on planning, materials, site surveys, and making your next decision with confidence.</p></div></section>
      <section className="container insights-list-section"><div className="insights-list-grid">{insights.map((article, index) => <article className={`insight-card insight-card-${index + 1}`} key={article.slug}><TransitionLink className="insight-image" href={`/insights/${article.slug}`}><img src={article.image} alt="" loading="lazy" /><span>{article.category}</span></TransitionLink><div className="insight-copy"><div className="insight-date"><CalendarDays aria-hidden="true" />{new Date(`${article.date}T12:00:00Z`).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</div><h2><TransitionLink href={`/insights/${article.slug}`}>{article.title}</TransitionLink></h2><p>{article.description}</p><TransitionLink href={`/insights/${article.slug}`} className="text-link">Read insight <ArrowRight aria-hidden="true" /></TransitionLink></div></article>)}</div><p className="insights-disclaimer">Articles provide general project information, not technical or legal advice for a specific site.</p></section>
    </>
  );
}

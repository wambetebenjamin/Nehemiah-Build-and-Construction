import type { Metadata } from "next";
import Link from "next/link";
import { TransitionLink } from "@/components/site/Navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { insights } from "@/lib/content";
import { loadInsight } from "@/lib/insights";

export const revalidate = 600;
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return { title: "Insight not found" };
  return {
    title: article.title,
    description: article.description,
    openGraph: { type: "article", title: `${article.title} | Nehemiah Build`, description: article.description, images: [{ url: article.image, alt: article.title }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await loadInsight(slug);
  if (!article) notFound();
  const { metadata, content } = article;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://localhost").replace(/\/$/, "");
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    image: `${siteUrl}${metadata.image}`,
    mainEntityOfPage: `${siteUrl}/insights/${metadata.slug}`,
    author: { "@type": "Organization", name: "Nehemiah Build & Construction" },
    publisher: { "@type": "Organization", name: "Nehemiah Build & Construction" },
  };
  return (
    <article className="insight-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <header className="insight-detail-hero"><img src={metadata.image} alt="" fetchPriority="high" /><div className="insight-detail-shade" /><div className="container insight-detail-heading"><TransitionLink href="/insights" className="detail-back"><ArrowLeft aria-hidden="true" /> All insights</TransitionLink><span className="eyebrow">{metadata.category}</span><h1 tabIndex={-1}>{metadata.title}</h1><p>{metadata.description}</p><span className="insight-date"><CalendarDays aria-hidden="true" />{new Date(`${metadata.date}T12:00:00Z`).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</span></div></header>
      <div className="container insight-body"><div className="mdx-content">{content}</div><aside className="insight-aside"><span className="eyebrow">Planning a project?</span><h2>Get clear on<br /><em>the next step.</em></h2><p>Talk with the team about your project brief, site, and questions.</p><Link href="/#contact" className="button button-primary">Request a Quote <span aria-hidden="true">↗</span></Link></aside></div>
    </article>
  );
}

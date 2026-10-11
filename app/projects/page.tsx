import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";
import { projects } from "@/lib/content";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore representative residential, commercial, and civil engineering project profiles from Nehemiah Build.",
  openGraph: { title: "Projects | Nehemiah Build", description: "Representative project profiles across Kenya.", images: ["/images/nairobi-construction-crew.jpg"] },
};

export default function ProjectsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost";
  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Illustrative Nehemiah Build project profiles",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.excerpt,
        url: `${siteUrl}/projects/${project.slug}`,
        image: `${siteUrl}${project.image}`,
        about: project.category,
        locationCreated: { "@type": "Place", name: project.location },
      },
    })),
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema).replace(/</g, "\\u003c") }} /><section className="page-intro"><div className="container"><span className="eyebrow">Portfolio · Nairobi &amp; Kenya</span><h1 tabIndex={-1}>Work built around<br /><em>what matters.</em></h1><p>Every project profile starts with a clear brief, practical coordination, and a commitment to doing the work well.</p></div></section><ProjectShowcase compact /></>;
}

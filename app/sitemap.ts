import type { MetadataRoute } from "next";
import { projects, insights } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://localhost").replace(/\/$/, "");
  const updated = new Date();
  const staticRoutes = ["", "/projects", "/tender", "/careers", "/insights", "/legal/privacy-policy", "/legal/terms", "/legal/cookie-policy"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route || "/"}`, lastModified: updated, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...insights.map((insight) => ({ url: `${base}/insights/${insight.slug}`, lastModified: new Date(insight.date), changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}

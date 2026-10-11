import { readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { insights } from "@/lib/content";

export type InsightMetadata = (typeof insights)[number];

export async function loadInsight(slug: string) {
  const metadata = insights.find((item) => item.slug === slug);
  if (!metadata) return null;

  const filePath = path.join(process.cwd(), "content", "insights", `${slug}.mdx`);
  const source = await readFile(filePath, "utf8");
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return { metadata, content };
}

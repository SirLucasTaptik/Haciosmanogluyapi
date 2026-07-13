import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";
import { allProjectSlugsQuery } from "@/lib/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haciosmanoglu-yapi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projeler`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/hakkimizda`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/iletisim`, changeFrequency: "monthly", priority: 0.6 },
  ];

  if (!sanityClient) return staticRoutes;

  const slugs: { slug: string }[] = await sanityClient.fetch(allProjectSlugsQuery).catch(() => []);
  const projectRoutes: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${siteUrl}/projeler/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}

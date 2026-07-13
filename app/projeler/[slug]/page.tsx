import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { RichText } from "@/components/ui/RichText";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { sanityClient } from "@/lib/sanity/client";
import { allProjectSlugsQuery } from "@/lib/sanity/queries";
import { getProjectBySlug } from "@/lib/sanity/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!sanityClient) return [];
  const slugs: { slug: string }[] = await sanityClient.fetch(allProjectSlugsQuery).catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    alternates: { canonical: `/projeler/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="container-page pb-10 pt-24 md:pt-32">
      <Breadcrumbs
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Projeler", href: "/projeler" },
          { label: project.title },
        ]}
      />
      <span
        className={`mt-4 inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-obsidian ${
          project.status === "ongoing" ? "bg-gold/90" : "bg-porcelain/90"
        }`}
      >
        {project.status === "ongoing" ? "Devam Ediyor" : "Tamamlandı"}
      </span>

      <h1 className="mt-3 font-display text-display-md text-porcelain">{project.title}</h1>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-porcelain/55">
        <MapPin size={14} /> {project.district}
      </p>

      <div className="mt-6">
        <ProjectGallery images={[project.heroImageUrl, ...project.galleryUrls]} alt={project.title} />
      </div>

      {project.status === "ongoing" && (
        <div className="mt-6 max-w-sm">
          <ProgressBar value={project.progressPercentage} />
          <p className="mt-1.5 font-mono text-xs text-gold">
            %{project.progressPercentage} tamamlandı
          </p>
        </div>
      )}

      <div className="mt-6 max-w-2xl">
        <RichText value={project.description} />
      </div>

      <Button href="/iletisim" className="mt-8">
        Bu Proje İçin Bilgi Al
      </Button>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { clsx } from "clsx";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { getProjectsByStatus } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Devam eden ve tamamlanan kentsel dönüşüm projelerimiz.",
  alternates: { canonical: "/projeler" },
};

const FILTERS = [
  { id: "ongoing", label: "Devam Eden" },
  { id: "completed", label: "Tamamlanan" },
] as const;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const status = statusParam === "completed" ? "completed" : "ongoing";
  const projects = await getProjectsByStatus(status);

  return (
    <div className="container-page pb-10 pt-24 md:pt-32">
      <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Projeler" }]} />
      <SectionEyebrow>Projeler</SectionEyebrow>
      <h1 className="font-display text-display-md text-porcelain">Projelerimiz</h1>

      <div className="mt-6 flex gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.id}
            href={`/projeler?status=${f.id}`}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              status === f.id
                ? "bg-gold text-obsidian"
                : "border border-white/15 text-porcelain/70 hover:border-gold/50"
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="mt-10 text-sm text-porcelain/50">
          Bu kategoride henüz proje bulunmuyor. Projeler, Sanity Studio&apos;dan (
          <Link href="/studio" className="text-gold underline">
            /studio
          </Link>
          ) eklendikçe burada görünecek.
        </p>
      )}

      <Footer />
    </div>
  );
}

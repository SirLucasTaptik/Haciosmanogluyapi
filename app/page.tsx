import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SkylineBars } from "@/components/ui/SkylineBars";
import { Button } from "@/components/ui/Button";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Clock3, Eye, Users, MapPin } from "lucide-react";
import { WHY_US, PROCESS_STEPS } from "@/lib/data/staticContent";
import { getHomepageHero, getContactInfo } from "@/lib/sanity/content";

const WHY_US_ICONS = [ShieldCheck, Clock3, Eye, Users] as const;

export default async function HomePage() {
  const [hero, contact] = await Promise.all([getHomepageHero(), getContactInfo()]);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden px-5 pb-14 pt-24 md:min-h-[80vh] md:px-16">
        <Image
          src={hero.backgroundImageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(35%) brightness(0.55)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.95) 100%)",
          }}
        />
        <div className="relative z-10 max-w-xl fade-up">
          <SectionEyebrow>Kentsel Dönüşüm</SectionEyebrow>
          <h1 className="font-display text-display-lg italic leading-[1.05] text-porcelain">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-xs text-sm text-porcelain/70 md:max-w-sm">{hero.subheadline}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/iletisim">{hero.primaryCtaLabel}</Button>
            <Button href="/projeler?status=ongoing" variant="outline">
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats — signature skyline motif */}
      <FadeInSection className="container-page border-t border-white/6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div key={s.label} className="fade-up" style={{ animationDelay: `${i * 90}ms` }}>
              <SkylineBars compact />
              <p className="mt-3 font-display text-3xl text-porcelain">{s.value}</p>
              <p className="mt-1 text-xs text-porcelain/55">{s.label}</p>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Why us */}
      <FadeInSection className="container-page border-t border-white/6 py-14">
        <SectionEyebrow>Neden Biz</SectionEyebrow>
        <h2 className="font-display text-2xl text-porcelain md:text-display-md">
          Süreci güvenle yönetiyoruz
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {WHY_US.map((item, i) => {
            const Icon = WHY_US_ICONS[i]!;
            return (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-porcelain">{item.title}</p>
                  <p className="mt-1 text-sm text-porcelain/60">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </FadeInSection>

      {/* Process — a real sequence, numbering is justified here */}
      <FadeInSection className="container-page border-t border-white/6 py-14">
        <SectionEyebrow>Süreç</SectionEyebrow>
        <h2 className="font-display text-2xl text-porcelain md:text-display-md">
          Kentsel dönüşüm adımları
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 md:gap-x-8">
          {PROCESS_STEPS.map((p) => (
            <div
              key={p.step}
              className="ml-4 flex gap-4 border-l border-white/12 pb-8 pl-4 last:border-l-0 md:border-l-0 md:pl-0"
            >
              <div className="-ml-8 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold bg-obsidian font-mono text-xs text-gold md:ml-0">
                {p.step}
              </div>
              <div className="-mt-1 md:mt-0 md:ml-0">
                <p className="font-semibold text-porcelain">{p.title}</p>
                <p className="mt-1 text-sm text-porcelain/60">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Map */}
      <FadeInSection className="container-page border-t border-white/6 py-14">
        <SectionEyebrow>Konum</SectionEyebrow>
        <h2 className="font-display text-2xl text-porcelain md:text-display-md">Bizi ziyaret edin</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 md:grid md:grid-cols-2">
          <iframe
            title="Hacıosmanoğlu Yapı Konum"
            src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
            className="h-48 w-full md:h-full"
            style={{ border: 0, filter: "grayscale(60%) invert(92%) contrast(90%)" }}
            loading="lazy"
          />
          <div className="flex items-start gap-3 bg-graphite p-5">
            <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
            <p className="text-sm text-porcelain/75">{contact.address}</p>
          </div>
        </div>
      </FadeInSection>

      <Footer />
    </div>
  );
}

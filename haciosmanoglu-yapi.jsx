import React, { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon,
  Building2,
  Info,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Clock3,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Design tokens (mirrors tailwind.config.ts from the Next.js project) */
/* ------------------------------------------------------------------ */
const C = {
  obsidian: "#0A0A0A",   // dark chrome only: top bar, bottom nav, WhatsApp button
  graphite: "#1C1C1C",   // dark chrome secondary surface
  porcelain: "#F7F6F2",  // text/icons on dark chrome
  canvas: "#FBFBFD",     // page content background (Apple's white)
  canvasAlt: "#F5F5F7",  // alternating light-grey section background
  ink: "#1D1D1F",        // primary text on light surfaces
  inkMuted: "#6E6E73",   // secondary text on light surfaces
  mist: "#E7E4DD",
  gold: "#C9A24B",
  goldLight: "#E3C77A",
  goldDark: "#9C7B33",
};

// Company logo, embedded directly so it always renders regardless of hosting.
const LOGO_SRC =
  "data:image/jpeg;base64,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";

const CONTACT = {
  companyName: "Hacıosmanoğlu Yapı",
  phone: "0533 773 71 80",
  phoneHref: "+905337737180",
  whatsapp: "905337737180",
  email: "farukhaciosmanoglu@ymail.com",
  address: "İncirli Cd. 11, 34145 Bakırköy / İstanbul",
};

const STATS = [
  { label: "Devam Eden Proje", value: "8", scale: 0.55 },
  { label: "Tamamlanan Proje", value: "24", scale: 1 },
  { label: "Yıllık Tecrübe", value: "40+", scale: 0.7 },
  { label: "Memnun Aile", value: "500+", scale: 0.85 },
];

const WHY_US = [
  { icon: ShieldCheck, title: "Yasal Güvence", desc: "Her sözleşme, riskli yapı mevzuatına tam uyumlu şekilde hazırlanır." },
  { icon: Clock3, title: "Zamanında Teslim", desc: "Taahhüt edilen teslim tarihine bağlı, şeffaf inşaat takvimi." },
  { icon: Eye, title: "Şeffaf Süreç", desc: "Her aşamada ilerleme yüzdesi ve fotoğraflarla düzenli bilgilendirme." },
  { icon: Users, title: "Deneyimli Ekip", desc: "Bakırköy'de 40 yılı aşkın kentsel dönüşüm tecrübesi." },
];

const PROCESS_STEPS = [
  { step: "01", title: "Ücretsiz Keşif", desc: "Yerinde inceleme ve ön değerlendirme." },
  { step: "02", title: "Zemin Etüdü", desc: "Teknik analiz ve raporlama." },
  { step: "03", title: "Anlaşma", desc: "Kat karşılığı veya nakit anlaşma seçenekleri." },
  { step: "04", title: "Yıkım & Ruhsat", desc: "Yasal izinler ve yıkım süreci." },
  { step: "05", title: "İnşaat", desc: "Düzenli ilerleme paylaşımı ile yapım." },
  { step: "06", title: "Teslim", desc: "Anahtar teslimi ve garanti belgeleri." },
];

const ABOUT = {
  history:
    "Hacıosmanoğlu Yapı, Bakırköy'de başladığı yolculuğuna bugün İstanbul genelinde kentsel dönüşüm projeleriyle devam ediyor. Kurulduğu günden bu yana amacımız, riskli yapılarını güvenli ve değerli konutlara dönüştürmek isteyen aileler için süreci olabildiğince şeffaf ve öngörülebilir kılmak oldu.",
  mission: "Her projede güvenli yapı, adil sözleşme ve zamanında teslim ilkelerinden ödün vermeden, ailelerin evlerine güvenle dönmesini sağlamak.",
  vision: "Bakırköy ve çevresinde kentsel dönüşümün en güvenilir ve tercih edilen ismi olmak.",
  values: [
    { title: "Dürüstlük", desc: "Süreç boyunca net ve doğru bilgilendirme." },
    { title: "Kalite", desc: "Malzeme ve işçilikte taviz vermeyen standartlar." },
    { title: "Süreklilik", desc: "Teslim sonrası da devam eden garanti desteği." },
    { title: "Aile Odaklılık", desc: "Her proje, içinde yaşayacak bir aile için inşa edilir." },
  ],
};

const PROJECTS = [
  { id: 1, title: "Zümrüt Residence", district: "Bakırköy, İstanbul", status: "ongoing", progress: 65, seed: "hy-zumrut" },
  { id: 2, title: "İncirli Konakları", district: "Bakırköy, İstanbul", status: "ongoing", progress: 30, seed: "hy-incirli" },
  { id: 3, title: "Yeşilköy Panorama", district: "Yeşilköy, İstanbul", status: "ongoing", progress: 80, seed: "hy-yesilkoy" },
  { id: 4, title: "Ataköy Marina Evleri", district: "Ataköy, İstanbul", status: "completed", progress: 100, seed: "hy-atakoy" },
  { id: 5, title: "Florya Sahil Rezidans", district: "Florya, İstanbul", status: "completed", progress: 100, seed: "hy-florya" },
  { id: 6, title: "Kartaltepe Bahçe Konutları", district: "Bakırköy, İstanbul", status: "completed", progress: 100, seed: "hy-kartaltepe" },
];

const img = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

      .hy-app { font-family: 'Inter', sans-serif; }
      .hy-display { font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: -0.03em; }
      .hy-mono { font-family: 'IBM Plex Mono', monospace; }

      .hy-app *:focus-visible {
        outline: 2px solid ${C.gold};
        outline-offset: 2px;
      }

      @keyframes hyFadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hy-fade-up { animation: hyFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }

      @keyframes hyGrow {
        from { transform: scaleY(0); }
        to { transform: scaleY(var(--bar-scale, 1)); }
      }
      .hy-skyline-bar {
        transform-origin: bottom;
        animation: hyGrow 0.9s cubic-bezier(0.22,1,0.36,1) both;
      }

      .hy-scrollbar-hide::-webkit-scrollbar { display: none; }
      .hy-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

      @media (prefers-reduced-motion: reduce) {
        .hy-fade-up, .hy-skyline-bar { animation: none !important; }
      }
    `}</style>
  );
}

function SkylineBars({ compact = false }) {
  // The signature motif: vertical bars echoing the logo's building silhouette.
  const heights = compact ? [0.4, 0.7, 1, 0.55] : [0.35, 0.6, 0.85, 1, 0.5];
  return (
    <div className={`flex items-end gap-1 ${compact ? "h-8" : "h-14"}`} aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className="hy-skyline-bar w-1.5 rounded-sm"
          style={{
            height: "100%",
            "--bar-scale": h,
            background: i === heights.length - 1 ? C.gold : "rgba(201,162,75,0.45)",
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

function GoldButton({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-transform active:scale-95 ${className}`}
      style={{ background: C.gold, color: C.obsidian }}
    >
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors ${className}`}
      style={{ borderColor: "rgba(247,246,242,0.3)", color: C.porcelain }}
    >
      {children}
    </button>
  );
}

function SectionEyebrow({ children }) {
  return (
    <p className="hy-mono mb-3 text-xs uppercase tracking-[0.3em]" style={{ color: C.gold }}>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Top bar + bottom nav + WhatsApp                                     */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-5 py-3"
      style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
          style={{ background: C.porcelain, border: `1.5px solid ${C.gold}`, padding: 2 }}
        >
          <img src={LOGO_SRC} alt={CONTACT.companyName} className="h-full w-full rounded-full object-cover" />
        </div>
        <div className="leading-tight">
          <p className="hy-display text-sm font-semibold" style={{ color: C.porcelain }}>Hacıosmanoğlu</p>
          <p className="hy-mono -mt-0.5 text-[10px] tracking-[0.2em]" style={{ color: C.gold }}>YAPI</p>
        </div>
      </div>
      <a
        href={`tel:${CONTACT.phoneHref}`}
        className="flex h-9 w-9 items-center justify-center rounded-full"
        style={{ border: "1px solid rgba(247,246,242,0.25)" }}
        aria-label="Ara"
      >
        <Phone size={16} color={C.porcelain} />
      </a>
    </header>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "Ana Sayfa", icon: HomeIcon },
  { id: "projects", label: "Projeler", icon: Building2 },
  { id: "about", label: "Hakkımızda", icon: Info },
  { id: "contact", label: "İletişim", icon: Mail },
];

function BottomNav({ active, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4"
      style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex flex-col items-center gap-1 py-2.5"
          >
            <Icon size={20} color={isActive ? C.gold : "rgba(247,246,242,0.5)"} strokeWidth={isActive ? 2.2 : 1.8} />
            <span
              className="text-[10px] font-medium"
              style={{ color: isActive ? C.gold : "rgba(247,246,242,0.5)" }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full shadow-lg"
      style={{ bottom: "84px", background: "#25D366", width: 52, height: 52 }}
      aria-label="WhatsApp'tan yazın"
    >
      <MessageCircle size={24} color="#fff" fill="#fff" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Home tab                                                             */
/* ------------------------------------------------------------------ */

function HomeTab({ goTo }) {
  return (
    <div className="hy-fade-up">
      {/* Hero */}
      <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden px-5 pb-10 pt-24">
        <img
          src={img("hy-hero", 900, 1400)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(35%) brightness(0.55)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.95) 100%)" }}
        />
        <div className="relative z-10">
          <SectionEyebrow>Kentsel Dönüşüm</SectionEyebrow>
          <h1 className="hy-display text-4xl leading-[1.05]" style={{ color: C.porcelain, fontWeight: 800 }}>
            Bakırköy'ün Güvenilir<br />Kentsel Dönüşüm Firması
          </h1>
          <p className="mt-4 max-w-xs text-sm" style={{ color: "rgba(247,246,242,0.7)" }}>
            Riskli yapınızı, güvenli ve değerli bir yaşam alanına dönüştürüyoruz.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <GoldButton onClick={() => goTo("contact")}>
              Ücretsiz Keşif Talebi <ArrowRight size={16} />
            </GoldButton>
            <OutlineButton onClick={() => goTo("projects")}>
              Devam Eden Projeler
            </OutlineButton>
          </div>
        </div>
      </section>

      {/* Stats — signature skyline motif, primary light canvas */}
      <section className="px-5 py-16" style={{ background: C.canvas }}>
        <div className="grid grid-cols-2 gap-8">
          {STATS.map((s, i) => (
            <div key={s.label} className="hy-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
              <SkylineBars compact />
              <p className="hy-display mt-3 text-3xl" style={{ color: C.ink }}>{s.value}</p>
              <p className="mt-1 text-xs" style={{ color: C.inkMuted }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us — alternating light-grey section */}
      <section className="px-5 py-16" style={{ background: C.canvasAlt }}>
        <SectionEyebrow>Neden Biz</SectionEyebrow>
        <h2 className="hy-display text-2xl" style={{ color: C.ink }}>Süreci güvenle yönetiyoruz.</h2>
        <div className="mt-8 flex flex-col gap-5">
          {WHY_US.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
              >
                <Icon size={19} color={C.gold} />
              </div>
              <div>
                <p className="font-semibold" style={{ color: C.ink }}>{title}</p>
                <p className="mt-1 text-sm" style={{ color: C.inkMuted }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process — numbering justified: this is a real sequence */}
      <section className="px-5 py-16" style={{ background: C.canvas }}>
        <SectionEyebrow>Süreç</SectionEyebrow>
        <h2 className="hy-display text-2xl" style={{ color: C.ink }}>Kentsel dönüşüm adımları.</h2>
        <div className="mt-8 flex flex-col gap-7">
          {PROCESS_STEPS.map((p) => (
            <div key={p.step}>
              <p className="hy-display text-2xl" style={{ color: C.gold }}>{p.step}</p>
              <p className="mt-2 font-semibold" style={{ color: C.ink }}>{p.title}</p>
              <p className="mt-1 text-sm" style={{ color: C.inkMuted }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="px-5 py-16" style={{ background: C.canvasAlt }}>
        <SectionEyebrow>Konum</SectionEyebrow>
        <h2 className="hy-display text-2xl" style={{ color: C.ink }}>Bizi ziyaret edin.</h2>
        <div className="mt-6 overflow-hidden rounded-3xl" style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <iframe
            title="Hacıosmanoğlu Yapı Konum"
            src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
            className="h-48 w-full"
            style={{ border: 0 }}
            loading="lazy"
          />
          <div className="flex items-start gap-3 p-4">
            <MapPin size={18} color={C.gold} className="mt-0.5 shrink-0" />
            <p className="text-sm" style={{ color: C.inkMuted }}>{CONTACT.address}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Projects tab                                                        */
/* ------------------------------------------------------------------ */

function ProgressBar({ value }) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(0,0,0,0.08)" }}>
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: C.gold }} />
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button onClick={() => onOpen(project)} className="hy-fade-up text-left">
      <div className="overflow-hidden rounded-3xl" style={{ background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <div className="relative h-40 w-full">
          <img src={img(project.seed)} alt="" className="h-full w-full object-cover" style={{ filter: "grayscale(20%)" }} />
          <span
            className="hy-mono absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider"
            style={{
              background: project.status === "ongoing" ? "rgba(201,162,75,0.9)" : "rgba(255,255,255,0.9)",
              color: C.obsidian,
            }}
          >
            {project.status === "ongoing" ? "Devam Ediyor" : "Tamamlandı"}
          </span>
        </div>
        <div className="p-4">
          <p className="font-semibold" style={{ color: C.ink }}>{project.title}</p>
          <p className="mt-0.5 text-xs" style={{ color: C.inkMuted }}>{project.district}</p>
          {project.status === "ongoing" && (
            <>
              <ProgressBar value={project.progress} />
              <p className="hy-mono mt-1 text-[11px]" style={{ color: C.gold }}>%{project.progress} tamamlandı</p>
            </>
          )}
        </div>
      </div>
    </button>
  );
}

function ProjectsTab({ initialFilter, onOpenProject }) {
  const [filter, setFilter] = useState(initialFilter || "ongoing");
  const filtered = PROJECTS.filter((p) => p.status === filter);

  return (
    <div className="hy-fade-up px-5 pb-10 pt-24" style={{ background: C.canvas }}>
      <SectionEyebrow>Projeler</SectionEyebrow>
      <h2 className="hy-display text-2xl" style={{ color: C.ink }}>Projelerimiz.</h2>

      <div className="mt-6 flex gap-2">
        {[
          { id: "ongoing", label: "Devam Eden" },
          { id: "completed", label: "Tamamlanan" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            style={
              filter === f.id
                ? { background: C.gold, color: C.obsidian }
                : { border: "1px solid rgba(0,0,0,0.12)", color: C.inkMuted }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />
        ))}
      </div>
    </div>
  );
}

function ProjectDetailSheet({ project, onClose, goToContact }) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  if (!project) return null;
  const gallery = [`${project.seed}-a`, `${project.seed}-b`, `${project.seed}-c`];

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div
        className="hy-fade-up max-h-[88vh] w-full overflow-y-auto rounded-t-3xl"
        style={{ background: C.canvas }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 w-full shrink-0">
          <img src={img(gallery[galleryIndex])} alt="" className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "rgba(10,10,10,0.7)" }}
            aria-label="Kapat"
          >
            <X size={16} color={C.porcelain} />
          </button>
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            <button
              onClick={() => setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: "rgba(10,10,10,0.7)" }}
              aria-label="Önceki görsel"
            >
              <ChevronLeft size={16} color={C.porcelain} />
            </button>
            <button
              onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: "rgba(10,10,10,0.7)" }}
              aria-label="Sonraki görsel"
            >
              <ChevronRight size={16} color={C.porcelain} />
            </button>
          </div>
        </div>

        <div className="px-5 pb-8 pt-5">
          <span
            className="hy-mono rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider"
            style={{
              background: project.status === "ongoing" ? "rgba(201,162,75,0.9)" : "rgba(255,255,255,0.9)",
              color: C.obsidian,
            }}
          >
            {project.status === "ongoing" ? "Devam Ediyor" : "Tamamlandı"}
          </span>
          <h3 className="hy-display mt-3 text-2xl" style={{ color: C.ink }}>{project.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm" style={{ color: C.inkMuted }}>
            <MapPin size={14} /> {project.district}
          </p>

          {project.status === "ongoing" && (
            <div className="mt-4">
              <ProgressBar value={project.progress} />
              <p className="hy-mono mt-1.5 text-xs" style={{ color: C.gold }}>%{project.progress} tamamlandı</p>
            </div>
          )}

          <p className="mt-5 text-sm leading-relaxed" style={{ color: C.inkMuted }}>
            {project.title}, modern mimarisi ve depreme dayanıklı yapı teknolojisiyle {project.district} bölgesinde
            ailelere güvenli bir yaşam alanı sunuyor. Süreç boyunca düzenli ilerleme paylaşımı yapılmaktadır.
          </p>

          <GoldButton onClick={goToContact} className="mt-6 w-full">
            Bu Proje İçin Bilgi Al
          </GoldButton>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* About tab                                                            */
/* ------------------------------------------------------------------ */

function AboutTab() {
  return (
    <div className="hy-fade-up px-5 pb-10 pt-24" style={{ background: C.canvas }}>
      <SectionEyebrow>Hakkımızda</SectionEyebrow>
      <h2 className="hy-display text-2xl" style={{ color: C.ink }}>Hikayemiz.</h2>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: C.inkMuted }}>{ABOUT.history}</p>

      <div className="mt-8 grid grid-cols-1 gap-4">
        <div className="rounded-3xl p-6" style={{ background: C.canvasAlt }}>
          <p className="hy-mono text-xs uppercase tracking-[0.2em]" style={{ color: C.gold }}>Misyon</p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkMuted }}>{ABOUT.mission}</p>
        </div>
        <div className="rounded-3xl p-6" style={{ background: C.canvasAlt }}>
          <p className="hy-mono text-xs uppercase tracking-[0.2em]" style={{ color: C.gold }}>Vizyon</p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkMuted }}>{ABOUT.vision}</p>
        </div>
      </div>

      <h2 className="hy-display mt-10 text-2xl" style={{ color: C.ink }}>Değerlerimiz.</h2>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {ABOUT.values.map((v) => (
          <div key={v.title}>
            <p className="font-semibold" style={{ color: C.gold }}>{v.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed" style={{ color: C.inkMuted }}>{v.desc}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact tab                                                          */
/* ------------------------------------------------------------------ */

function ContactTab() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Ad Soyad gerekli.";
    if (!/^[0-9+\s()-]{10,}$/.test(form.phone.trim())) e.phone = "Geçerli bir telefon numarası girin.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Geçerli bir e-posta girin.";
    if (form.message.trim().length < 10) e.message = "Mesajınız en az 10 karakter olmalı.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      // Faz 3'te: bu veri Next.js API route üzerinden Resend ile
      // farukhaciosmanoglu@ymail.com adresine iletilecek.
    }
  };

  const field = (key, label, props = {}) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium" style={{ color: C.inkMuted }}>{label}</label>
      <input
        {...props}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
        style={{
          background: C.canvasAlt,
          border: `1px solid ${errors[key] ? "#c0392b" : "rgba(0,0,0,0.1)"}`,
          color: C.ink,
        }}
      />
      {errors[key] && <p className="mt-1 text-xs" style={{ color: "#e07a6b" }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div className="hy-fade-up px-5 pb-10 pt-24" style={{ background: C.canvas }}>
      <SectionEyebrow>İletişim</SectionEyebrow>
      <h2 className="hy-display text-2xl" style={{ color: C.ink }}>Bize ulaşın.</h2>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <a href={`tel:${CONTACT.phoneHref}`} className="flex flex-col items-center gap-1.5 rounded-2xl py-4" style={{ background: C.canvasAlt }}>
          <Phone size={17} color={C.gold} />
          <span className="text-[11px]" style={{ color: C.inkMuted }}>Ara</span>
        </a>
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 rounded-2xl py-4" style={{ background: C.canvasAlt }}>
          <MessageCircle size={17} color={C.gold} />
          <span className="text-[11px]" style={{ color: C.inkMuted }}>WhatsApp</span>
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex flex-col items-center gap-1.5 rounded-2xl py-4" style={{ background: C.canvasAlt }}>
          <Mail size={17} color={C.gold} />
          <span className="text-[11px]" style={{ color: C.inkMuted }}>E-posta</span>
        </a>
      </div>

      <div className="mt-8">
        {submitted ? (
          <div className="hy-fade-up flex flex-col items-center gap-3 rounded-3xl py-12 text-center" style={{ background: C.canvasAlt }}>
            <CheckCircle2 size={32} color={C.gold} />
            <p className="font-semibold" style={{ color: C.ink }}>Mesajınız alındı</p>
            <p className="max-w-[240px] text-sm" style={{ color: C.inkMuted }}>
              En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }}
              className="mt-2 text-sm font-medium"
              style={{ color: C.gold }}
            >
              Yeni mesaj gönder
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {field("name", "Ad Soyad")}
            {field("phone", "Telefon", { type: "tel", placeholder: "0533 000 00 00" })}
            {field("email", "E-posta", { type: "email", placeholder: "ornek@eposta.com" })}
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: C.inkMuted }}>Mesaj</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{
                  background: C.canvasAlt,
                  border: `1px solid ${errors.message ? "#c0392b" : "rgba(0,0,0,0.1)"}`,
                  color: C.ink,
                }}
              />
              {errors.message && <p className="mt-1 text-xs" style={{ color: "#e07a6b" }}>{errors.message}</p>}
            </div>
            <GoldButton onClick={handleSubmit} className="mt-2 w-full">Gönder</GoldButton>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="mt-14 border-t px-1 pb-6 pt-8 text-center" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <p className="hy-display text-lg font-semibold" style={{ color: C.ink }}>Hacıosmanoğlu Yapı</p>
      <p className="mt-2 text-xs" style={{ color: C.inkMuted }}>{CONTACT.address}</p>
      <p className="mt-1 text-xs" style={{ color: C.inkMuted }}>{CONTACT.phone} · {CONTACT.email}</p>
      <p className="hy-mono mt-4 text-[10px]" style={{ color: C.inkMuted, opacity: 0.7 }}>
        © {new Date().getFullYear()} Hacıosmanoğlu Yapı — Tüm hakları saklıdır.
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* App root                                                             */
/* ------------------------------------------------------------------ */

export default function App() {
  const [tab, setTab] = useState("home");
  const [projectFilter, setProjectFilter] = useState("ongoing");
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
  }, [tab]);

  const goTo = (id, filter) => {
    if (id === "projects" && filter) setProjectFilter(filter);
    setTab(id);
  };

  return (
    <div className="hy-app mx-auto min-h-screen max-w-md" style={{ background: C.canvas }}>
      <GlobalStyle />
      <TopBar />

      <div ref={scrollRef} className="pb-24">
        {tab === "home" && <HomeTab goTo={(id) => goTo(id, id === "projects" ? "ongoing" : undefined)} />}
        {tab === "projects" && (
          <ProjectsTab initialFilter={projectFilter} onOpenProject={setSelectedProject} />
        )}
        {tab === "about" && <AboutTab />}
        {tab === "contact" && <ContactTab />}
      </div>

      <WhatsAppButton />
      <BottomNav active={tab} onChange={setTab} />

      {selectedProject && (
        <ProjectDetailSheet
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          goToContact={() => { setSelectedProject(null); setTab("contact"); }}
        />
      )}
    </div>
  );
}

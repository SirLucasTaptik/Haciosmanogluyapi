import type { Metadata } from "next";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { getContactInfo } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Hacıosmanoğlu Yapı ile iletişime geçin — ücretsiz keşif talebinde bulunun.",
  alternates: { canonical: "/iletisim" },
};

export default async function ContactPage() {
  const contact = await getContactInfo();

  return (
    <div className="container-page pb-10 pt-24 md:pt-32">
      <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "İletişim" }]} />
      <SectionEyebrow>İletişim</SectionEyebrow>
      <h1 className="font-display text-display-md text-porcelain">Bize ulaşın</h1>

      <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
        <a href={`tel:${contact.phoneHref}`} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 py-3.5">
          <Phone size={17} className="text-gold" />
          <span className="text-[11px] text-porcelain/70">Ara</span>
        </a>
        <a
          href={`https://wa.me/${contact.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 py-3.5"
        >
          <MessageCircle size={17} className="text-gold" />
          <span className="text-[11px] text-porcelain/70">WhatsApp</span>
        </a>
        <a href={`mailto:${contact.email}`} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 py-3.5">
          <Mail size={17} className="text-gold" />
          <span className="text-[11px] text-porcelain/70">E-posta</span>
        </a>
      </div>

      <div className="mt-8">
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
}

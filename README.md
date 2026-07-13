# Hacıosmanoğlu Yapı — Kurumsal Web Sitesi

Next.js 15 (App Router) + TypeScript + TailwindCSS + Sanity CMS + Resend.

## Durum: Faz 3 tamamlandı (Entegrasyonlar) — proje teslime hazır

| Faz | Kapsam | Durum |
|---|---|---|
| 1 | Mimari, config, Sanity şemaları, tasarım tokenları | ✅ Tamamlandı |
| 2 | Sayfalar & bileşenler (Home, About, Projeler, İletişim) | ✅ Tamamlandı |
| 3 | Resend, canlı Sanity verisi, SEO dosyaları, animasyonlar | ✅ Tamamlandı |

### Faz 3 notları

- **İletişim formu artık gerçek.** `components/forms/ContactForm.tsx` →
  `app/api/contact/route.ts` → Resend. Zod şeması (`lib/validation/contact.ts`)
  hem istemci hem sunucu tarafında aynı doğrulamayı yapıyor. Spam koruması:
  görünmez honeypot alanı + IP başına dakikada 3 istekle sınırlı bellek-içi
  rate limiter.
- **Sanity artık canlı veri kaynağı.** `lib/sanity/content.ts` tüm sayfaların
  çağırdığı tek nokta: `NEXT_PUBLIC_SANITY_PROJECT_ID` ayarlıysa Sanity'den
  GROQ ile çeker (`lib/sanity/queries.ts`) ve `lib/sanity/mappers.ts` ile
  UI'nin beklediği şekle çevirir; ayarlı değilse veya ilgili singleton
  belge henüz oluşturulmadıysa `lib/data/fallback.ts`'teki varsayılan
  içeriğe düşer. Bu sayede proje, Sanity'ye hiç içerik girilmeden de
  anlamlı görünür; projeler boşsa "henüz proje yok" mesajı gösterilir
  (sahte proje kartları göstermek yerine).
- **SEO:** `app/robots.ts`, `app/sitemap.ts` (statik sayfalar + tüm
  yayınlanmış projeler otomatik dahil), `app/opengraph-image.tsx`
  (`next/og` ile marka renklerinde dinamik paylaşım görseli), her sayfada
  `canonical` URL, kök layout'ta `LocalBusiness` JSON-LD, proje/alt
  sayfalarda görünür + schema.org `BreadcrumbList` yapılandırılmış veri.
- **Animasyon:** Ana sayfa bölümleri artık scroll'da Framer Motion ile
  belirip kayarak giriyor (`components/ui/FadeInSection.tsx`), tek seferlik
  ve `prefers-reduced-motion`'a saygılı.
- **Bilinen sınırlama:** Bu sandbox ortamının ağ erişimi
  `fonts.googleapis.com`'u kapsamadığından `npm run build` burada font
  indirme aşamasında hata veriyor. Bu, koddan değil ortamdan kaynaklanıyor —
  Vercel'de veya normal internet erişimi olan herhangi bir makinede sorunsuz
  çalışır. `npm run type-check` ve `npm run lint` bu sandbox'ta hatasız
  geçti.

## Tasarım Sistemi

**Renk paleti** — brief'teki siyah/beyaz/gold yönü, dört isimlendirilmiş tona
ayrıldı (bkz. `tailwind.config.ts`):

| Token | Hex | Kullanım |
|---|---|---|
| `obsidian` | `#0A0A0A` | Ana arka plan |
| `porcelain` | `#F7F6F2` | Ana metin / ters yüzeyler |
| `graphite` | `#1C1C1C` | İkincil kart yüzeyleri |
| `gold` | `#C9A24B` | Tek vurgu rengi — CTA, ayraçlar, istatistikler |

**Tipografi** — iki rol, restraint ile kullanılan bir üçüncü:
- **Display:** Fraunces (900/italic ağırlıkta, yalnızca başlıklarda) — logodaki
  "Yapı" el yazısı flourish'iyle rezonans kuran, yüksek kontrastlı, mimari
  bir serif.
- **Body:** Inter — Apple/Porsche dijital netliğinde okunabilirlik.
- **Utility:** IBM Plex Mono — istatistikler, tarihler, ilerleme yüzdeleri
  için teknik hassasiyet hissi.

**İmza öğesi (signature element):** `skyline-bar` — logo'daki bina
silüetinden türetilen dikey barlar. Bu motif dekoratif değil: proje
ilerleme yüzdelerini (`progressPercentage`) görselleştirmek ve bölüm
ayraçlarında kullanılmak üzere tasarlandı. Bkz. `app/globals.css`.

## Kurulum

```bash
npm install
cp .env.example .env.local
# .env.local içine Sanity ve Resend bilgilerini gir (aşağıya bak)
npm run dev
```

### Sanity Kurulumu

1. [sanity.io/manage](https://sanity.io/manage) üzerinde yeni proje oluştur.
2. Proje ID'sini `.env.local` → `NEXT_PUBLIC_SANITY_PROJECT_ID` içine gir.
3. Studio, uygulama içinde `/studio` altında gömülü olarak çalışır — ayrı bir
   kurulum gerekmez. `npm run dev` sonrası `localhost:3000/studio` adresine
   giderek şemaları görebilirsin.
4. Admin, mobil tarayıcıdan `/studio` adresine giderek proje/görsel
   yükleyebilir (brief'teki "mobilden yönetim" gereksinimi).

### Resend Kurulumu

1. [resend.com](https://resend.com) üzerinde API anahtarı oluştur.
2. `.env.local` → `RESEND_API_KEY` içine gir.
3. Gönderim adresi `CONTACT_FORM_RECIPIENT` ile ayarlanır (varsayılan:
   `farukhaciosmanoglu@ymail.com`).
4. Test için: `npm run dev` → `/iletisim` → formu doldur. `RESEND_API_KEY`
   girilmemişse Resend hata döner ve form kullanıcıya "doğrudan telefon/
   WhatsApp ile ulaşın" mesajını gösterir — sessizce başarısız olmaz.
5. Üretimde `lib/email/sendContactEmail.ts` içindeki `FROM_ADDRESS`'i,
   Resend panelinde doğruladığın kendi alan adınla değiştir (şu an test
   amaçlı paylaşılan `onboarding@resend.dev` gönderici adresini kullanıyor).

### Vercel'e Deploy

1. Repoyu GitHub'a push'la.
2. Vercel'de "Import Project" ile bağla.
3. `.env.example` içindeki tüm değişkenleri Vercel proje ayarlarında
   "Environment Variables" olarak gir.
4. Deploy et.

### Sanity İçerik Girişi

`/studio` üzerinden şu belgeleri oluştur (her biri singleton, birer tane
yeterli):
- **Ana Sayfa - Hero** — başlık, alt başlık, arka plan görseli, istatistikler
- **Hakkımızda İçeriği** — tarihçe, misyon, vizyon, değerler
- **İletişim Bilgileri** — telefon, WhatsApp, e-posta, adres
- **Site Ayarları** — logo, varsayılan SEO

Bunlardan biri oluşturulmadan önce site, `lib/data/fallback.ts` içindeki
varsayılan (gerçek şirket bilgileriyle doldurulmuş) içeriği gösterir —
yani Studio'yu doldurmadan önce de site boş görünmez.

Ardından **Proje** türünden istediğin kadar belge ekleyerek `/projeler`
sayfasını doldur.

### Site URL (SEO için önemli)

`.env.local` → `NEXT_PUBLIC_SITE_URL` değişkenini gerçek alan adınla
doldur (örn. `https://haciosmanoglu-yapi.com`). Bu değer `sitemap.xml`,
`robots.txt`, OpenGraph/canonical URL'ler ve JSON-LD yapılandırılmış
veride kullanılıyor.

## Klasör Yapısı

```
app/                  # Next.js App Router sayfaları ve API route'ları
  studio/[[...tool]]/  # Gömülü Sanity Studio (/studio)
  api/contact/         # Resend entegrasyonu (Zod doğrulama + rate limit)
  robots.ts            # Dinamik robots.txt
  sitemap.ts           # Dinamik sitemap.xml (projeler dahil)
  opengraph-image.tsx  # Dinamik OG paylaşım görseli
components/
  ui/                  # Buton, kart, breadcrumb, zengin metin, skyline-bar vb.
  layout/              # Header, footer, mobil nav, WhatsApp butonu
  forms/               # İletişim formu (client component)
lib/
  sanity/              # client, image builder, GROQ sorguları, mapper'lar,
                       # content.ts (tüm sayfaların çağırdığı tek veri katmanı)
  email/               # Resend gönderim mantığı
  validation/          # Paylaşılan Zod şemaları (client + server ortak)
  data/
    staticContent.ts    # CMS'siz statik içerik (Neden Biz, Süreç adımları)
    fallback.ts         # Sanity boşken/kurulmadan önce gösterilen varsayılanlar
sanity/
  schemaTypes/         # Tüm içerik modelleri
  structure.ts         # Studio menü yapısı (singleton'lar sabitlenir)
types/                 # Paylaşılan TypeScript tipleri
public/
  logo.jpeg            # Yüklenen kurumsal logo (tek renkli, kullanıma hazır)
```

## Kalite Kontrol

```bash
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
npm run format       # Prettier (Tailwind class sıralama dahil)
```

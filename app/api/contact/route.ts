import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import { sendContactEmail } from "@/lib/email/sendContactEmail";

// Best-effort in-memory rate limiter. This resets whenever the serverless
// function cold-starts, so it is a spam deterrent, not a hard guarantee —
// combined with the honeypot field below, it stops the vast majority of
// automated form spam without needing an external service.
const submissionsByIp = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > MAX_SUBMISSIONS_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Form doğrulaması başarısız.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — silently pretend success so bots don't learn to skip it.
  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email failed to send:", error);
    return NextResponse.json(
      { error: "Mesajınız gönderilemedi. Lütfen doğrudan telefon veya WhatsApp ile ulaşın." },
      { status: 502 }
    );
  }
}

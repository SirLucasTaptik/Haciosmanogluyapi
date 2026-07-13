import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hacıosmanoğlu Yapı — Bakırköy Kentsel Dönüşüm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0A",
          color: "#F7F6F2",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#C9A24B", marginBottom: 24 }}>
          KENTSEL DÖNÜŞÜM
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, maxWidth: 900, lineHeight: 1.1 }}>
          Bakırköy&apos;ün Güvenilir Kentsel Dönüşüm Firması
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 40, color: "#C9A24B" }}>
          Hacıosmanoğlu Yapı
        </div>
      </div>
    ),
    { ...size }
  );
}

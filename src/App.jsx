// src/App.jsx
import React, { useRef, useState } from "react";

export default function App() {
  const [name, setName] = useState("Peach");
  const [title, setTitle] = useState("SPECIAL COUPON");
  const [benefit, setBenefit] = useState("One FREE Good Mood Reset 💫");
  const [extras, setExtras] = useState(
    "extra attention\nnonstop pampering\nbonus 'sorry baby'\nunlimited hugs (virtual)\n1 cute kiss 😘"
  );
  const [bg, setBg] = useState("#FFF0F4");
  const [accent, setAccent] = useState("#FF7AA2");
  const svgRef = useRef(null);

  const downloadAsPNG = async () => {
    const svg = svgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = getComputedStyle(document.body).backgroundColor || "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const png = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${name || "coupon"}.png`;
      link.href = png;
      link.click();
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      alert("Could not export image — try again or use screenshot/print.");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "linear-gradient(180deg,#fff6fb,#fff)" }}>
      <div style={{ maxWidth: 960, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ background: "rgba(255,255,255,0.9)", padding: 20, borderRadius: 16, boxShadow: "0 6px 22px rgba(0,0,0,0.06)" }}>
          <h2 style={{ marginBottom: 12 }}>Customize your coupon</h2>

          <label style={{ display: "block", marginTop: 12 }}>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 8, borderRadius: 8 }} />

          <label style={{ display: "block", marginTop: 12 }}>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 8, borderRadius: 8 }} />

          <label style={{ display: "block", marginTop: 12 }}>Main Benefit</label>
          <input value={benefit} onChange={(e) => setBenefit(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 8, borderRadius: 8 }} />

          <label style={{ display: "block", marginTop: 12 }}>Extras (line-break separated)</label>
          <textarea value={extras} onChange={(e) => setExtras(e.target.value)} style={{ width: "100%", marginTop: 6, padding: 8, borderRadius: 8, height: 140 }} />

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12 }}>Background</label>
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} style={{ marginTop: 6, width: 52, height: 36 }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12 }}>Accent</label>
              <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} style={{ marginTop: 6, width: 52, height: 36 }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
            <button onClick={downloadAsPNG} style={{ padding: "10px 14px", background: "#ff6fa0", color: "white", borderRadius: 10, border: "none" }}>Download PNG</button>
            <button onClick={() => window.print()} style={{ padding: "10px 14px", borderRadius: 10 }}>Print / Save</button>
          </div>

          <p style={{ marginTop: 12, color: "#666", fontSize: 13 }}>Tip: For best mobile wallpaper results, download and set on phone. Use "save image" or print to PDF if needed.</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", padding: 10, background: "white" }}>
            <svg ref={svgRef} width="360" height="640" viewBox="0 0 360 640" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.08" />
                </filter>
              </defs>

              <rect x="0" y="0" width="360" height="640" rx="20" fill={bg} filter="url(#soft)" />

              <g opacity="0.9" transform="translate(20,30)">
                <text x="0" y="0" fontSize="18" fill={accent}>✦</text>
                <text x="320" y="20" fontSize="16" fill={accent}>✦</text>
              </g>

              <text x="180" y="120" textAnchor="middle" fontFamily="cursive" fontSize="26" fill="#222">{title}</text>
              <text x="180" y="170" textAnchor="middle" fontFamily="sans-serif" fontSize="40" fontWeight="700" fill="#111">{name}</text>
              <line x1="30" y1="190" x2="330" y2="190" stroke={accent} strokeWidth="2" opacity="0.6" />
              <rect x="30" y="210" width="300" height="80" rx="12" fill="#ffffff" opacity="0.9" />
              <text x="180" y="255" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fill="#111">{benefit}</text>

              <g>
                {extras.split("\n").map((line, i) => (
                  <text key={i} x="45" y={320 + i * 22} fontFamily="sans-serif" fontSize="14" fill="#333">• {line}</text>
                ))}
              </g>

              <text x="180" y="580" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#555">Validity: Unlimited • Redeem anytime ✨</text>

              <g transform="translate(260,520)">
                <text x="0" y="0" fontSize="26" fill={accent}>💖</text>
                <text x="24" y="10" fontSize="18" fill={accent}>🎀</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

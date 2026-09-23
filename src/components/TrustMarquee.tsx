interface TrustLogo {
  name: string;
  src: string;
}

export const TRUST_LOGOS: TrustLogo[] = [
  {
    name: "Faruk Medical City",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-24.jpg",
  },
  {
    name: "Asiacell",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-28.jpg",
  },
  {
    name: "KIIB Bank",
    src: "/whose-who-trust-us/photo_2026-09-23_11-17-43.jpg",
  },
  {
    name: "Rayhana Park",
    src: "/whose-who-trust-us/photo_2026-09-23_11-17-38.jpg",
  },
  {
    name: "Pio",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-33.jpg",
  },
  {
    name: "Italian Pasta",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-42.jpg",
  },
  {
    name: "Faleh Abu Al-Amba",
    src: "/whose-who-trust-us/photo_2026-09-23_11-17-46.jpg",
  },
  {
    name: "Italia Ice Cream",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-46.jpg",
  },
  {
    name: "Millennium Hotels and Resorts",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-51.jpg",
  },
  {
    name: "DIYALAND",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-55.jpg",
  },
  {
    name: "Ashur Resort",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-59.jpg",
  },
  {
    name: "Every Sunny Day",
    src: "/whose-who-trust-us/photo_2026-09-23_10-46-03.jpg",
  },
  {
    name: "Copthorne Hotel Baranan",
    src: "/whose-who-trust-us/photo_2026-09-23_10-46-09.jpg",
  },
  {
    name: "Millennium Kurdistan Hotel & Spa",
    src: "/whose-who-trust-us/photo_2026-09-23_10-46-13.jpg",
  },
];

// Double chunk per track to guarantee 100% seamless continuity across any screen size
const CHUNK_LOGOS = [...TRUST_LOGOS, ...TRUST_LOGOS];

// Logo item shared between primary and secondary chunks
function LogoItem({ logo, prefix, idx }: { logo: { name: string; src: string }; prefix: string; idx: number }) {
  return (
    <div
      key={`${prefix}-${idx}`}
      style={{
        padding: "0 40px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        decoding="async"
        style={{
          height: "80px",
          width: "auto",
          maxWidth: "220px",
          objectFit: "contain",
          display: "block",
          borderRadius: "12px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
      />
    </div>
  );
}

export function TrustMarquee() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        paddingTop: "56px",
        paddingBottom: "64px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          margin: "0 auto 40px",
          maxWidth: "1280px",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: 700,
            color: "#ff5a00",
          }}
        >
          <span style={{ display: "inline-block", height: "2px", width: "24px", borderRadius: "9999px", background: "#ff5a00" }} />
          ئەو شوێنانەی متمانەیان بە ئێمەکردووە
          <span style={{ display: "inline-block", height: "2px", width: "24px", borderRadius: "9999px", background: "#ff5a00" }} />
        </span>
        <h2
          style={{
            margin: "12px auto 0",
            maxWidth: "600px",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            lineHeight: 1.3,
            color: "#111827",
            fontSize: "clamp(26px, 3.5vw, 42px)",
          }}
        >
          جێگای متمانەی گەورەترین کۆمپانیا و هۆتێلەکانی عێراقین!
        </h2>
        <p
          style={{
            margin: "12px auto 0",
            maxWidth: "520px",
            fontSize: "15px",
            color: "#4b5563",
            lineHeight: 1.7,
          }}
        >
          شانازی دەکەین بە هاوبەشی و جێبەجێکردنی پڕۆژە بۆ دیارترین کۆمپانیا، هوتێل، نەخۆشخانە و شوێنە گەشتیارییەکان
        </p>
      </div>

      {/* Marquee track */}
      <div
        dir="ltr"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          userSelect: "none",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 auto 0 0",
            zIndex: 10,
            width: "140px",
            background: "linear-gradient(to right, #fff 30%, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 0 0 auto",
            zIndex: 10,
            width: "140px",
            background: "linear-gradient(to left, #fff 30%, transparent)",
          }}
        />

        {/* Animated strip */}
        <div className="animate-marquee-ltr" style={{ display: "flex", width: "max-content", alignItems: "center" }}>
          {/* Primary chunk */}
          <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }}>
            {CHUNK_LOGOS.map((logo, idx) => (
              <LogoItem key={`p-${idx}`} logo={logo} prefix="p" idx={idx} />
            ))}
          </div>
          {/* Secondary chunk (identical, for seamless loop) */}
          <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }} aria-hidden="true">
            {CHUNK_LOGOS.map((logo, idx) => (
              <LogoItem key={`s-${idx}`} logo={logo} prefix="s" idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

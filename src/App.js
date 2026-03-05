import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────── DATA ─────────────── */

// Real gallery images using YouTube thumbnails + placeholder henna image URLs
const GALLERY_IMAGES = [
  { id: 1, src: "https://img.youtube.com/vi/VgxwNSeWjqE/maxresdefault.jpg", label: "Bridal Full Hands", sub: "Rajasthani Motifs", tag: "Bridal" },
  { id: 2, src: "https://img.youtube.com/vi/yZriPR4XoYA/maxresdefault.jpg", label: "Arabic Florals", sub: "Bold & Flowing", tag: "Arabic" },
  { id: 3, src: "https://img.youtube.com/vi/nk7Y-wTR_ko/maxresdefault.jpg", label: "Festive Design", sub: "Celebrations", tag: "Festive" },
  { id: 4, src: "https://img.youtube.com/vi/QlNNQwynoCU/maxresdefault.jpg", label: "Lotus Mandala", sub: "Traditional Art", tag: "Mandala" },
  { id: 5, src: "https://img.youtube.com/vi/VgxwNSeWjqE/hqdefault.jpg", label: "Butterfly Motifs", sub: "Modern Fusion", tag: "Fusion" },
  { id: 6, src: "https://img.youtube.com/vi/yZriPR4XoYA/hqdefault.jpg", label: "Lotus & Vines", sub: "Indo-Arabic Style", tag: "Indo-Arabic" },
];

const VIDEOS = [
  { id: "VgxwNSeWjqE", title: "Beautiful Simple Full Palm Hand Design", duration: "Full Tutorial" },
  { id: "yZriPR4XoYA", title: "Easy Unique Floral Henna Designs", duration: "Aesthetic Florals" },
  { id: "nk7Y-wTR_ko", title: "Latest Unique Stylish Henna Design", duration: "Elegant Mehndi" },
  { id: "QlNNQwynoCU", title: "Lotus-Themed Mandala Design Mehendi", duration: "Mandala Art" },
];

const PRICING = [
  { tier: "Essential", icon: "🌿", price: "₹200", unit: "per hand", highlight: false, desc: "Perfect for casual occasions", features: ["Single hand design", "Finger Mehndi", "Simple patterns", "Natural henna", "30 min session"] },
  { tier: "Celebration", icon: "🌸", price: "₹800", unit: "starting", highlight: true, desc: "Most popular for parties & functions", features: ["Both hands", "Arabic or Indo-Arabic", "Personalized design", "Natural dark henna", "Up to 1.5 hrs", "Home visit available"] },
  { tier: "Bridal", icon: "👰", price: "₹3,000", unit: "starting", highlight: false, desc: "Luxury full bridal experience", features: ["Full hands & feet", "Elaborate bridal motifs", "Pre-bridal consultation", "Premium quality henna", "3–5 hr session", "Free touch-up", "Home visit included"] },
];

const REVIEWS = [
  { name: "Sneha Kesavan", date: "a month ago", rating: 5, text: "The design were beautiful, neat and long lasting. Very professional and friendly person. Beautiful mehandi design and great finishing. Thankyou for making my day extra special❤️✨", avatar: "S" },
  { name: "Deepa Keerthi", date: "a month ago", rating: 5, text: "Very happy with the mehendi work for my marriage done by Sakura mehendiart. The design was beautiful, neat, and exactly what I wanted. The color came out dark and lasted long. Thank you for making my big day more special.", avatar: "D" },
  { name: "Jaya Suriya", date: "6 months ago", rating: 5, text: "The stain was awesome and she was very engaging person, so satisfied with her work. She was a lovely person and her work was very clean and neat. Please go with her.", avatar: "J" },
  { name: "Monika Rajasekaran", date: "5 months ago", rating: 5, text: "I booked sakura mehendi artist for my wedding. Her work was awesome and the designs which I chose, came out very well.", avatar: "M" },
  { name: "tharu tharu", date: "3 months ago", rating: 5, text: "The stain was awesome and she is very talented mehendi artist. She is very cute and calm person. They are work very unique and clean. Please book her mehendi artist. TQ so much ❤️", avatar: "T" },
  { name: "SELVALAKSHMI L", date: "a year ago", rating: 5, text: "Great work by her for the amazing mehandi she did for my wedding! A special mention that the stain lasted beautifully, which adds to the fulfillment of our special moments. All the best for her future endeavours!", avatar: "S" },
  { name: "Ishwarya Balamurugan", date: "3 months ago", rating: 5, text: "Absolutely loved the mehendi design! It was neat, elegant, and exactly what I wanted. The detailing was perfect and the stain came out beautifully dark. Highly recommend!", avatar: "I" },
  { name: "விஜய் சோமசுந்தரம்", date: "3 months ago", rating: 5, text: "My sister couldn't stop smiling after seeing her mehendi and that says it all! 😍 The design was gorgeous and exactly like the reference picture. Super friendly and patient artist. 10/10!", avatar: "V" },
  { name: "Amala Infanta", date: "3 months ago", rating: 5, text: "I will give 5 star rating to her. Enoda wedding mehandi was awesome and the stain lasts for days. Just a simple design we chose, but that creates a magic in my hands because of her 🫂 Everyone in my family appreciated. Keep rocking 💪", avatar: "A" },
  { name: "vaniajan", date: "6 months ago", rating: 5, text: "Your designs are absolutely stunning! It has such intricate designs and beautiful work. Thank you for making my special day even more memorable. It was a fun and relaxing experience.", avatar: "V" },
  { name: "Mareeswari K", date: "4 months ago", rating: 5, text: "The designs were elegant and so perfectly detailed. I loved the intricate details. The henna was clean and very fine work.", avatar: "M" },
  { name: "Deepika P", date: "6 months ago", rating: 5, text: "Booked her last minute at night, and without any hesitation she came over and completed the work. Truly dedicated, professional, and delivered beautiful results. Highly recommend!", avatar: "D" },
  { name: "Gomathi S", date: "6 months ago", rating: 5, text: "She did my engagement and marriage mehandi. The design was too good and the stain was awesome. I am completely happy with her service.", avatar: "G" },
  { name: "raja Kumari", date: "4 months ago", rating: 5, text: "Happy to book her for my wedding mehandi, her service was awesome and design came out well. We are so happy with her work 😊", avatar: "R" },
  { name: "Dharshini S", date: "3 months ago", rating: 5, text: "Beautiful mehndi and an amazing woman behind the art — quick, gentle, and super talented. Loved it!", avatar: "D" },
  { name: "Pavi Periyasamy", date: "6 months ago", rating: 5, text: "Excellent work and she did mehandi for my engagement, just loved her work. Good at suggesting designs.", avatar: "P" },
  { name: "Atchaya B", date: "a year ago", rating: 5, text: "Good experience with her. Dedicated artist. Finishing was neat, mainly affordable ❤", avatar: "A" },
];

const NAV_LINKS = ["Home", "Gallery", "Services", "Videos", "Pricing", "Reviews", "Contact"];

// Explicit map: nav label → section element id
const NAV_ID_MAP = {
  Home: "home",
  Gallery: "gallery",
  Services: "services",
  Videos: "videos",
  Pricing: "pricing",
  Reviews: "reviews",
  Contact: "contact",
};
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#c8986b,#a5673a)",
  "linear-gradient(135deg,#b8860b,#8b6914)",
  "linear-gradient(135deg,#a0522d,#cd853f)",
  "linear-gradient(135deg,#7a4a25,#c8986b)",
  "linear-gradient(135deg,#b5651d,#e8a87c)",
];
const getGradient = (name) => AVATAR_GRADIENTS[(name?.charCodeAt(0) || 0) % AVATAR_GRADIENTS.length];

/* ─────────────── RESPONSIVE HOOK ─────────────── */
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 768, isTablet: w >= 768 && w < 1024, isDesktop: w >= 1024, w };
}

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Stars({ n = 5, size = 15 }) {
  return <span>{[...Array(n)].map((_, i) => <span key={i} style={{ color: "#c8986b", fontSize: size }}>★</span>)}</span>;
}

function SectionHeader({ tag, title, subtitle, light }) {
  const [ref, vis] = useInView();
  const { isMobile } = useBreakpoint();
  return (
    <div ref={ref} style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
      <div className={`cormorant fade-item ${vis ? "vis" : ""}`} style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#c8986b", marginBottom: 10 }}>✦ {tag} ✦</div>
      <h2 className={`playfair fade-item d1 ${vis ? "vis" : ""}`} style={{ fontSize: "clamp(26px,5vw,52px)", fontWeight: 800, color: light ? "#f3e9de" : "#2c1a0e", marginBottom: 14, lineHeight: 1.15 }} dangerouslySetInnerHTML={{ __html: title }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: subtitle ? 20 : 0 }}>
        <div style={{ width: 40, height: 1, background: "linear-gradient(90deg,transparent,#c8986b)" }} />
        <span style={{ color: "#c8986b", fontSize: 16 }}>✦</span>
        <div style={{ width: 40, height: 1, background: "linear-gradient(90deg,#c8986b,transparent)" }} />
      </div>
      {subtitle && <p className={`cormorant fade-item d2 ${vis ? "vis" : ""}`} style={{ fontSize: isMobile ? 16 : 19, color: light ? "#c8ab8e" : "#6b4226", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, padding: "0 16px" }}>{subtitle}</p>}
    </div>
  );
}

/* ─────────────── NAV ─────────────── */
function Nav({ scrollTo, activeNav, setActiveNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (l) => {
    scrollTo(l);
    setActiveNav(l);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || menuOpen ? "rgba(250,246,241,0.98)" : "transparent", backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none", borderBottom: scrolled || menuOpen ? "1px solid #e8ddd2" : "none", transition: "all 0.4s", padding: isMobile ? "14px 20px" : "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, pointerEvents: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 22, color: "#c8986b", animation: "rotateSlow 20s linear infinite", display: "inline-block" }}>✿</span>
          <div>
            <div className="playfair" style={{ fontSize: 16, fontWeight: 800, color: "#2c1a0e", lineHeight: 1 }}>Sakura</div>
            <div className="cormorant" style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#c8986b" }}>Mehendi Art</div>
          </div>
        </div>

        {!isMobile && !isTablet && (
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => (
              <span key={l} onClick={() => handleNav(l)} className="cormorant" style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: activeNav === l ? "#c8986b" : "#2c1a0e", cursor: "pointer", borderBottom: activeNav === l ? "1px solid #c8986b" : "1px solid transparent", paddingBottom: 2, transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#c8986b"; }}
                onMouseLeave={e => { e.currentTarget.style.color = activeNav === l ? "#c8986b" : "#2c1a0e"; }}>{l}</span>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => handleNav("Contact")} style={{ padding: isMobile ? "8px 16px" : "10px 22px", background: "linear-gradient(135deg,#c8986b,#a5673a)", color: "#fff", border: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 11 : 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", flexShrink: 0, borderRadius: 2 }}>
            Book Now
          </button>
          {(isMobile || isTablet) && (
            <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "1px solid rgba(200,152,107,0.4)", padding: "8px 10px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, borderRadius: 4 }}>
              <span style={{ display: "block", width: 22, height: 2, background: "#c8986b", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#c8986b", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#c8986b", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          )}
        </div>
      </nav>

      {(isMobile || isTablet) && menuOpen && (
        <div style={{ position: "fixed", top: isMobile ? 62 : 66, left: 0, right: 0, zIndex: 999, background: "rgba(250,246,241,0.99)", backdropFilter: "blur(16px)", borderBottom: "1px solid #e8ddd2", padding: "16px 0", animation: "fadeSlideUp 0.25s ease", pointerEvents: "auto" }}>
          {NAV_LINKS.map(l => (
            <div key={l} onClick={() => handleNav(l)} className="cormorant" style={{ padding: "14px 28px", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: activeNav === l ? "#c8986b" : "#2c1a0e", cursor: "pointer", borderBottom: "1px solid rgba(200,152,107,0.1)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,152,107,0.07)"; e.currentTarget.style.color = "#c8986b"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = activeNav === l ? "#c8986b" : "#2c1a0e"; }}>
              {l}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ─────────────── GALLERY CAROUSEL WITH REAL IMAGES ─────────────── */
function Carousel() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState("right");
  const [lightbox, setLightbox] = useState(null); // index of image for lightbox
  const autoRef = useRef(null);
  const { isMobile } = useBreakpoint();

  const go = useCallback((dir) => {
    setAnimDir(dir);
    setActive(prev => dir === "right" ? (prev + 1) % GALLERY_IMAGES.length : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  useEffect(() => { autoRef.current = setInterval(() => go("right"), 4000); return () => clearInterval(autoRef.current); }, [go]);
  const resetAuto = () => { clearInterval(autoRef.current); autoRef.current = setInterval(() => go("right"), 4000); };

  return (
    <>
      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out", padding: 20 }}>
          <button onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); }} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(200,152,107,0.3)", border: "1px solid rgba(200,152,107,0.5)", color: "#fff", fontSize: 28, width: 50, height: 50, borderRadius: "50%", cursor: "pointer" }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "88vw", maxHeight: "88vh", position: "relative" }}>
            <img src={GALLERY_IMAGES[lightbox].src} alt={GALLERY_IMAGES[lightbox].label} style={{ maxWidth: "88vw", maxHeight: "84vh", objectFit: "contain", borderRadius: 4, boxShadow: "0 24px 80px rgba(0,0,0,0.7)", display: "block" }} />
            <div style={{ position: "absolute", bottom: -36, left: 0, right: 0, textAlign: "center" }}>
              <span className="cormorant" style={{ color: "#c8ab8e", fontSize: 15, letterSpacing: 2 }}>{GALLERY_IMAGES[lightbox].label} · {GALLERY_IMAGES[lightbox].tag}</span>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % GALLERY_IMAGES.length); }} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(200,152,107,0.3)", border: "1px solid rgba(200,152,107,0.5)", color: "#fff", fontSize: 28, width: 50, height: 50, borderRadius: "50%", cursor: "pointer" }}>›</button>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(200,152,107,0.3)", border: "1px solid rgba(200,152,107,0.5)", color: "#fff", fontSize: 20, width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}>✕</button>
        </div>
      )}

      <div style={{ position: "relative", overflow: "hidden", borderRadius: isMobile ? 8 : 4 }}>
        {/* Main slide */}
        <div style={{ position: "relative", height: isMobile ? 320 : 520, overflow: "hidden" }}>
          {GALLERY_IMAGES.map((item, i) => (
            <div key={item.id} style={{ position: "absolute", inset: 0, transition: "opacity 0.7s ease, transform 0.7s ease", opacity: i === active ? 1 : 0, transform: i === active ? "translateX(0) scale(1)" : animDir === "right" ? "translateX(60px) scale(0.97)" : "translateX(-60px) scale(0.97)", pointerEvents: i === active ? "auto" : "none" }}>
              {/* Real image */}
              <img src={item.src} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {/* Overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.65) 100%)" }} />
              {/* Tag pill */}
              <div style={{ position: "absolute", top: 20, left: 20 }}>
                <div style={{ display: "inline-block", background: "rgba(200,152,107,0.92)", backdropFilter: "blur(8px)", padding: "4px 16px", borderRadius: 20 }}>
                  <span className="cormorant" style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#fff" }}>{item.tag}</span>
                </div>
              </div>
              {/* Zoom icon */}
              <button onClick={() => setLightbox(i)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: 38, height: 38, borderRadius: "50%", cursor: "zoom-in", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>⤢</button>
              {/* Caption */}
              <div style={{ position: "absolute", bottom: 56, left: 24, right: 24 }}>
                <h3 className="playfair" style={{ fontSize: isMobile ? 24 : 34, fontWeight: 800, color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.5)", marginBottom: 4 }}>{item.label}</h3>
                <p className="cormorant" style={{ fontSize: isMobile ? 15 : 18, color: "rgba(255,255,255,0.85)", letterSpacing: 1 }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        {[{ dir: "left", side: { left: 12 }, arrow: "‹" }, { dir: "right", side: { right: 12 }, arrow: "›" }].map(({ dir, side, arrow }) => (
          <button key={dir} onClick={() => { dir === "left" ? go("left") : go("right"); resetAuto(); }} style={{ position: "absolute", top: "50%", ...side, transform: "translateY(-50%)", width: isMobile ? 40 : 50, height: isMobile ? 40 : 50, borderRadius: "50%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff", fontSize: isMobile ? 22 : 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,152,107,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.4)"; }}>{arrow}</button>
        ))}

        {/* Dots */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
          {GALLERY_IMAGES.map((_, i) => <button key={i} onClick={() => { setActive(i); resetAuto(); }} style={{ width: i === active ? 24 : 7, height: 7, borderRadius: 4, border: "none", cursor: "pointer", background: i === active ? "#fff" : "rgba(255,255,255,0.45)", transition: "all 0.4s ease", padding: 0 }} />)}
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: "flex", background: "#2c1a0e", overflowX: "auto", gap: 2 }}>
          {GALLERY_IMAGES.map((item, i) => (
            <button key={item.id} onClick={() => { setActive(i); resetAuto(); }} style={{ flex: "0 0 auto", width: isMobile ? 70 : 110, height: isMobile ? 56 : 76, border: "none", cursor: "pointer", position: "relative", outline: i === active ? "3px solid #c8986b" : "none", outlineOffset: -3, opacity: i === active ? 1 : 0.55, overflow: "hidden", transition: "opacity 0.3s" }}>
              <img src={item.src} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {i === active && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#c8986b" }} />}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Masonry-style mini grid below ── */}
     {/* git  */}
    </>
  );
}

/* ─────────────── VIDEO SECTION ─────────────── */
function VideoSection() {
  const [playing, setPlaying] = useState(null);
  const [ref, vis] = useInView();
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(4,1fr)";

  return (
    <section id="videos" ref={ref} style={{ padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 48px", background: "#1a0e08", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(200,152,107,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader tag="Watch & Learn" title="Latest <em style='font-style:italic;color:#c8986b'>Tutorials</em>" subtitle="New mehndi videos every day at 6 PM." light />
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: isMobile ? 20 : 24 }}>
          {VIDEOS.map((v, i) => (
            <div key={v.id} className={`fade-item ${vis ? "vis" : ""}`} style={{ animationDelay: `${i * 0.12}s`, cursor: "pointer" }} onClick={() => setPlaying(playing === v.id ? null : v.id)}>
              {playing === v.id ? (
                <div style={{ overflow: "hidden", aspectRatio: "16/9", isolation: "isolate", position: "relative", zIndex: 0 }}>
                  <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen style={{ border: "none", display: "block", position: "relative", zIndex: 0 }} title={v.title} />
                </div>
              ) : (
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", border: "1px solid rgba(200,152,107,0.2)" }}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55))", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(200,152,107,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(200,152,107,0.2)" }}>
                      <span style={{ color: "#fff", fontSize: 20, paddingLeft: 4 }}>▶</span>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(200,152,107,0.9)", padding: "2px 10px", borderRadius: 20 }}>
                    <span className="cormorant" style={{ color: "#fff", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" }}>{v.duration}</span>
                  </div>
                </div>
              )}
              <div style={{ padding: "12px 2px" }}>
                <h4 className="playfair" style={{ fontSize: 14, fontWeight: 700, color: "#f3e9de", marginBottom: 6, lineHeight: 1.4 }}>{v.title}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#c8986b,#a5673a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>✿</div>
                  <span className="cormorant" style={{ fontSize: 13, color: "#8a6040" }}>Sakura Mehendi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="https://www.youtube.com/@sakuramehendi" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px", background: "transparent", border: "1.5px solid #c8986b", color: "#c8986b", fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c8986b"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8986b"; }}>
            <span>▶</span> View All on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── PRICING ─────────────── */
function PricingSection() {
  const [ref, vis] = useInView();
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <section id="pricing" ref={ref} style={{ padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 48px", background: "#faf6f1" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="Investment" title="Transparent <em style='font-style:italic'>Pricing</em>" subtitle="Honest pricing with no hidden costs. Every session includes consultation and premium natural henna." />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: 24, alignItems: "start" }}>
          {PRICING.map((p, i) => (
            <div key={p.tier} className={`fade-item ${vis ? "vis" : ""}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div style={{ background: p.highlight ? "linear-gradient(160deg,#2c1a0e,#4a2c14)" : "#fff", border: p.highlight ? "2px solid #c8986b" : "1px solid #e8ddd2", padding: isMobile ? "28px 22px" : "40px 32px", position: "relative", overflow: "hidden", transform: p.highlight && !isMobile ? "scale(1.03)" : "scale(1)", boxShadow: p.highlight ? "0 20px 60px rgba(44,26,14,0.2)" : "none" }}>
                {p.highlight && (<><div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg,#c8986b,#a5673a)", padding: "5px 16px" }}><span className="cormorant" style={{ color: "#fff", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Most Popular</span></div><div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(200,152,107,0.06) 1px, transparent 1px)", backgroundSize: "22px 22px", pointerEvents: "none" }} /></>)}
                <div style={{ fontSize: 40, marginBottom: 14 }}>{p.icon}</div>
                <div className="cormorant" style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#c8986b", marginBottom: 6 }}>{p.tier}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 6 }}>
                  <span className="playfair" style={{ fontSize: 46, fontWeight: 800, color: p.highlight ? "#f3e9de" : "#2c1a0e", lineHeight: 1 }}>{p.price}</span>
                  <span className="cormorant" style={{ fontSize: 15, color: p.highlight ? "#c8ab8e" : "#8a6040", marginBottom: 6 }}>{p.unit}</span>
                </div>
                <p className="cormorant" style={{ fontSize: 16, color: p.highlight ? "#c8ab8e" : "#6b4226", marginBottom: 22, lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ borderTop: `1px solid ${p.highlight ? "rgba(200,152,107,0.25)" : "#e8ddd2"}`, paddingTop: 20, marginBottom: 28 }}>
                  {p.features.map(f => (<div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><span style={{ color: "#c8986b", fontSize: 12 }}>✦</span><span className="cormorant" style={{ fontSize: 16, color: p.highlight ? "#e8d5be" : "#4a2c14", lineHeight: 1.4 }}>{f}</span></div>))}
                </div>
                <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ display: "block", textAlign: "center", padding: "13px", textDecoration: "none", background: p.highlight ? "linear-gradient(135deg,#c8986b,#a5673a)" : "transparent", border: p.highlight ? "none" : "1.5px solid #c8986b", color: p.highlight ? "#fff" : "#c8986b", fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", transition: "all 0.3s" }}
                  onMouseEnter={e => { if (!p.highlight) { e.currentTarget.style.background = "#c8986b"; e.currentTarget.style.color = "#fff"; } }}
                  onMouseLeave={e => { if (!p.highlight) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8986b"; } }}>Book This Package ✦</a>
              </div>
            </div>
          ))}
        </div>
        <p className="cormorant" style={{ textAlign: "center", marginTop: 28, color: "#8a6040", fontSize: 15, fontStyle: "italic", padding: "0 16px" }}>* Travel charges may apply for locations outside Trichy. Custom designs available on request.</p>
      </div>
    </section>
  );
}

/* ─────────────── REVIEWS ─────────────── */
function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [ref, vis] = useInView();
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const GoogleG = () => (
    <span style={{ fontWeight: 800, fontSize: 16 }}>
      <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
    </span>
  );

  const miniCols = isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(auto-fill,minmax(200px,1fr))";

  return (
    <section id="reviews" ref={ref} style={{ padding: isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 48px", background: "#f3ede6" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="Client Love" title="What They're <em style='font-style:italic'>Saying</em>" subtitle={`${REVIEWS.length} real Google reviews — every single one ★★★★★`} />

        <div className={`fade-item ${vis ? "vis" : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 20 : 36, background: "#2c1a0e", padding: isMobile ? "20px 16px" : "24px 32px", marginBottom: isMobile ? 32 : 48, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div className="playfair" style={{ fontSize: isMobile ? 42 : 52, fontWeight: 800, color: "#c8986b", lineHeight: 1 }}>5.0</div>
            <div style={{ margin: "4px 0" }}><Stars /></div>
            <div className="cormorant" style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "#8a6040" }}>{REVIEWS.length} Reviews</div>
          </div>
          <div style={{ width: 1, height: 50, background: "rgba(200,152,107,0.3)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[5, 4].map(star => (
              <div key={star} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="cormorant" style={{ color: "#c8986b", fontSize: 14 }}>{star}★</span>
                <div style={{ width: isMobile ? 80 : 110, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: star === 5 ? "100%" : "0%", height: "100%", background: "linear-gradient(90deg,#c8986b,#e8b87a)", borderRadius: 3 }} />
                </div>
                <span className="cormorant" style={{ color: "#8a6040", fontSize: 13 }}>{star === 5 ? REVIEWS.length : 0}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 1, height: 50, background: "rgba(200,152,107,0.3)" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <GoogleG />
            <div className="cormorant" style={{ fontSize: 11, color: "#8a6040", letterSpacing: 1, textTransform: "uppercase" }}>Verified Reviews</div>
            <a href="https://share.google/kzwofsgXHXqlKOEgh" target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#c8986b", fontFamily: "'Cormorant Garamond',serif", letterSpacing: 1, textDecoration: "none", borderBottom: "1px solid rgba(200,152,107,0.4)" }}>View on Google →</a>
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ display: i === active ? "block" : "none", animation: i === active ? "fadeSlideUp 0.6s ease" : "none", background: "#fff", padding: isMobile ? "28px 20px" : isTablet ? "36px 36px" : "48px 52px", border: "1px solid #e8ddd2", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 10, left: isMobile ? 14 : 24, fontFamily: "Georgia", fontSize: isMobile ? 72 : 110, color: "#f0e6d8", lineHeight: 1, pointerEvents: "none" }}>"</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ marginBottom: 14 }}><Stars /></div>
                <p className="cormorant" style={{ fontSize: isMobile ? 18 : 22, lineHeight: 1.8, color: "#2c1a0e", marginBottom: 24, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: getGradient(r.name), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 800, flexShrink: 0 }}>{r.avatar}</div>
                  <div>
                    <div className="playfair" style={{ fontSize: 16, fontWeight: 700, color: "#2c1a0e" }}>{r.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <div className="cormorant" style={{ fontSize: 13, color: "#8a6040" }}>{r.date}</div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 2, background: "#f8f9fa", border: "1px solid #e0e0e0", borderRadius: 20, padding: "1px 7px", fontSize: 9, fontWeight: 800 }}>
                        <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
                      </span>
                    </div>
                  </div>
                  {!isMobile && <div style={{ marginLeft: "auto", background: "#faf6f1", border: "1px solid #e8ddd2", padding: "5px 14px" }}><span className="cormorant" style={{ fontSize: 13, color: "#c8986b", letterSpacing: 1.5, textTransform: "uppercase" }}>Verified Client</span></div>}
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 16, flexWrap: "wrap", padding: "0 20px" }}>
            {REVIEWS.map((_, i) => <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 22 : 7, height: 7, borderRadius: 4, border: "none", cursor: "pointer", padding: 0, background: i === active ? "#c8986b" : "#d4b896", transition: "all 0.4s ease" }} />)}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: miniCols, gap: 14 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={`fade-item ${vis ? "vis" : ""}`} style={{ animationDelay: `${i * 0.04}s`, background: "#fff", border: `1px solid ${active === i ? "#c8986b" : "#e8ddd2"}`, padding: isMobile ? "16px 14px" : "20px 18px", cursor: "pointer", transition: "all 0.3s" }}
              onClick={() => setActive(i)}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(44,26,14,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: getGradient(r.name), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{r.avatar}</div>
                <div>
                  <div className="playfair" style={{ fontSize: 12, fontWeight: 700, color: "#2c1a0e", lineHeight: 1.2 }}>{r.name}</div>
                  <Stars n={r.rating} size={11} />
                </div>
              </div>
              <p className="cormorant" style={{ fontSize: 13, color: "#6b4226", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>"{r.text}"</p>
              <div className="cormorant" style={{ fontSize: 11, color: "#9c7b60", marginTop: 6 }}>{r.date}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="https://share.google/kzwofsgXHXqlKOEgh" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", background: "transparent", border: "1.5px solid #c8986b", color: "#c8986b", fontFamily: "'Cormorant Garamond',serif", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c8986b"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8986b"; }}>
            ★ Read All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── FLOATING WHATSAPP ─────────────── */
function FloatingWA() {
  return null;
}

/* ─────────────── MAIN APP ─────────────── */
export default function App() {
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [heroRef, heroVis] = useInView(0.05);
  const { isMobile, isTablet } = useBreakpoint();

  // ── Active nav: updates based on scroll position ──
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const navHeight = 70;
      const scrollY = window.scrollY + navHeight + 10;

      // Find which section the user is currently in
      let current = "Home";
      for (const [label, id] of Object.entries(NAV_ID_MAP)) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          current = label;
        }
      }
      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (label) => {
    const sectionId = NAV_ID_MAP[label] ?? label.toLowerCase();
    const el = document.getElementById(sectionId);
    if (el) {
      // Small timeout lets any iframe blur first so scroll isn't blocked
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 10);
    }
  };

  const sectionPad = isMobile ? "60px 20px" : isTablet ? "80px 32px" : "100px 48px";

  const handleSubmit = () => {
    if (contactForm.name && contactForm.phone) {
      const msg = `🌸 *New Booking Enquiry - Sakura Mehendi*\n\n👤 *Name:* ${contactForm.name}\n📞 *Phone:* ${contactForm.phone}${contactForm.email ? `\n📧 *Email:* ${contactForm.email}` : ""}${contactForm.service ? `\n💼 *Service:* ${contactForm.service}` : ""}${contactForm.message ? `\n📝 *Message:* ${contactForm.message}` : ""}`;
      window.open(`https://wa.me/919566429054?text=${encodeURIComponent(msg)}`, "_blank");
      setSubmitted(true);
    }
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#faf6f1", color: "#2c1a0e", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        .playfair{font-family:'Playfair Display',Georgia,serif}
        .cormorant{font-family:'Cormorant Garamond',Georgia,serif}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .fade-item{opacity:0;transform:translateY(24px);transition:opacity 0.7s ease,transform 0.7s ease}
        .fade-item.vis{opacity:1;transform:translateY(0)}
        .d1{transition-delay:0.1s}.d2{transition-delay:0.2s}.d3{transition-delay:0.3s}.d4{transition-delay:0.4s}
        .shimmer-text{background:linear-gradient(90deg,#c8986b,#f0c080,#c8986b);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
        input::placeholder,textarea::placeholder{color:#9c7b60;font-family:'Cormorant Garamond',serif;font-size:16px}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#1a0e08}::-webkit-scrollbar-thumb{background:#c8986b;border-radius:2px}
        @media(max-width:767px){
          .hero-grid{grid-template-columns:1fr !important}
          .hero-img{display:none !important}
          .contact-grid{grid-template-columns:1fr !important}
          .services-grid{grid-template-columns:1fr !important}
        }
        @media(min-width:768px) and (max-width:1023px){
          .hero-grid{grid-template-columns:1fr !important}
          .hero-img{display:none !important}
          .contact-grid{grid-template-columns:1fr !important}
          .services-grid{grid-template-columns:1fr 1fr !important}
        }
      `}</style>

      {/* Nav receives activeNav state — no scroll listener changes it */}
      <Nav scrollTo={scrollTo} activeNav={activeNav} setActiveNav={setActiveNav} />
      <FloatingWA />

      {/* ── HERO ── */}
      <section id="home" ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "linear-gradient(135deg,#fff5f5 0%,#ffeef0 30%,#fce8d8 65%,#f5dfc8 100%)", position: "relative", overflow: "hidden", paddingTop: isMobile ? 70 : 80 }}>
        <div style={{ position: "absolute", top: -60, right: -80, width: 480, height: 380, borderRadius: "40% 60% 55% 45%", background: "radial-gradient(ellipse,rgba(255,182,193,0.45) 0%,transparent 75%)", pointerEvents: "none", filter: "blur(32px)" }} />
        <div style={{ position: "absolute", bottom: -40, right: 60, width: 320, height: 260, borderRadius: "60% 40% 50% 50%", background: "radial-gradient(ellipse,rgba(255,192,203,0.3) 0%,transparent 70%)", pointerEvents: "none", filter: "blur(24px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "40px 20px 60px" : isTablet ? "60px 32px 80px" : "120px 48px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }} className="hero-grid">
          <div>
            <div className={`cormorant fade-item ${heroVis ? "vis" : ""}`} style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#b5673a", marginBottom: 14 }}>✦ India's Henna Artist ✦</div>
            <h1 className={`playfair fade-item d1 ${heroVis ? "vis" : ""}`} style={{ fontSize: isMobile ? "clamp(36px,10vw,52px)" : "clamp(44px,6vw,72px)", fontWeight: 800, lineHeight: 1.1, color: "#2c1a0e", marginBottom: 16 }}>
              The Art of<br /><em className="shimmer-text">Beautiful</em><br />Mehndi
            </h1>
            <p className={`cormorant fade-item d2 ${heroVis ? "vis" : ""}`} style={{ fontSize: isMobile ? 17 : 20, lineHeight: 1.8, color: "#6b4226", marginBottom: 28, maxWidth: 440 }}>
              Transforming skin into canvas with intricate henna patterns. Every design tells your story — crafted with love and precision.
            </p>
            <div className={`fade-item d2 ${heroVis ? "vis" : ""}`} style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              {["Love ♥", "Life", "Happy"].map(tag => (
                <span key={tag} className="cormorant" style={{ padding: "5px 16px", borderRadius: 40, background: "rgba(220,100,120,0.12)", border: "1px solid rgba(220,100,120,0.3)", color: "#b54060", fontSize: 14, letterSpacing: 1.5 }}>{tag}</span>
              ))}
            </div>
            <div className={`fade-item d3 ${heroVis ? "vis" : ""}`} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <button onClick={() => { scrollTo("Gallery"); setActiveNav("Gallery"); }} style={{ padding: isMobile ? "12px 24px" : "14px 32px", background: "linear-gradient(135deg,#c8986b,#a5673a)", color: "#fff", border: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>View Gallery</button>
              <button onClick={() => { scrollTo("Contact"); setActiveNav("Contact"); }} style={{ padding: isMobile ? "11px 22px" : "13px 28px", background: "transparent", color: "#c8986b", border: "1.5px solid #c8986b", fontFamily: "'Cormorant Garamond',serif", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#c8986b"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c8986b"; }}>Book Session</button>
            </div>
            <div className={`fade-item d4 ${heroVis ? "vis" : ""}`} style={{ display: "flex", gap: isMobile ? 20 : 28, borderTop: "1px solid rgba(200,152,107,0.3)", paddingTop: 24, flexWrap: "wrap" }}>
              {[["291+", "Videos"], ["1.35K", "Subscribers"], ["5.0★", "Rating"], ["500+", "Clients"]].map(([n, l]) => (
                <div key={l}>
                  <div className="playfair" style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#c8986b" }}>{n}</div>
                  <div className="cormorant" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#8a6040" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero right: real images from YouTube thumbnails */}
          <div className="hero-img fade-item d2" style={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: heroVis ? 1 : 0, transform: heroVis ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.75s ease 0.2s, transform 0.75s ease 0.2s" }}>
            <div style={{ position: "relative", width: 420, height: 460 }}>
              <div style={{ position: "absolute", inset: -20, background: "radial-gradient(ellipse,rgba(255,160,175,0.25) 0%,transparent 70%)", filter: "blur(24px)", pointerEvents: "none" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 10, width: "100%", height: "100%", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 70px rgba(44,26,14,0.22)" }}>
                {[{ id: "VgxwNSeWjqE", label: "Full Palm" }, { id: "yZriPR4XoYA", label: "Floral" }, { id: "nk7Y-wTR_ko", label: "Stylish" }, { id: "QlNNQwynoCU", label: "Mandala" }].map(({ id, label }) => (
                  <div key={id} style={{ position: "relative", overflow: "hidden" }}>
                    <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.55))" }} />
                    <div style={{ position: "absolute", bottom: 8, left: 10 }}><span className="cormorant" style={{ color: "#fff", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>{label}</span></div>
                  </div>
                ))}
              </div>
              {[{ top: 36, right: -26, emoji: "👰", label: "Bridal", delay: "0s" }, { top: 190, right: -30, emoji: "🌿", label: "Natural Henna", delay: "0.4s" }, { bottom: 70, left: -26, emoji: "📍", label: "Home Visits", delay: "0.8s" }].map(({ top, right, bottom, left, emoji, label, delay }) => (
                <div key={label} style={{ position: "absolute", top, right, bottom, left, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", border: "1px solid rgba(200,152,107,0.3)", padding: "7px 14px", borderRadius: 40, boxShadow: "0 8px 24px rgba(44,26,14,0.14)", display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap", animation: "floatY 4s ease-in-out infinite", animationDelay: delay, zIndex: 10 }}>
                  <span style={{ fontSize: 15 }}>{emoji}</span>
                  <span className="cormorant" style={{ fontSize: 13, color: "#2c1a0e", letterSpacing: 1 }}>{label}</span>
                </div>
              ))}
              <div style={{ position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)", background: "#fff", border: "1px solid #e8ddd2", padding: "7px 18px", borderRadius: 40, boxShadow: "0 8px 24px rgba(44,26,14,0.12)", display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}>
                <span>⭐</span>
                <span className="playfair" style={{ fontSize: 14, fontWeight: 800, color: "#2c1a0e" }}>5.0</span>
                <span className="cormorant" style={{ fontSize: 12, color: "#8a6040" }}>Google Rating</span>
              </div>
            </div>
          </div>
        </div>

        {!isMobile && (
          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, animation: "floatY 2s ease-in-out infinite" }}>
            <span className="cormorant" style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#c8986b" }}>Scroll</span>
            <div style={{ width: 1, height: 30, background: "linear-gradient(180deg,#c8986b,transparent)" }} />
          </div>
        )}
      </section>

      {/* ── GALLERY — Real Images ── */}
      <section id="gallery" style={{ padding: sectionPad, background: "#f3ede6" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader tag="My Work" title="Design <em style='font-style:italic'>Gallery</em>" subtitle="Click any image to view full size. Tap the arrows to browse designs." />
          <Carousel />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: sectionPad, background: "#faf6f1" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader tag="What I Offer" title="My <em style='font-style:italic'>Services</em>" subtitle="From intimate gatherings to grand celebrations — artistry and precision in every design." />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 22 }} className="services-grid">
            {[
              { icon: "🌸", title: "Bridal Mehndi", desc: "Elaborate full-hand & leg designs for your wedding day. Rajasthani, Mughal & contemporary patterns.", tag: "Most Popular" },
              { icon: "🌿", title: "Party Mehndi", desc: "Elegant patterns for festive occasions, engagements & family celebrations.", tag: "" },
              { icon: "✨", title: "Arabic Mehndi", desc: "Bold floral & geometric patterns with modern flowing flair.", tag: "" },
              { icon: "🎨", title: "Indo-Arabic Fusion", desc: "Intricate blends of Indian & Arabic traditions — rich and contemporary.", tag: "" },
              { icon: "🌙", title: "Finger Mehndi", desc: "Minimalist finger and nail art designs for modern, everyday wear.", tag: "" },
              { icon: "💫", title: "Custom Design", desc: "Fully personalized patterns crafted to match your vision and theme.", tag: "Bespoke" },
            ].map(s => (
              <div key={s.title} style={{ background: "#fff", border: "1px solid #e8ddd2", padding: isMobile ? "24px 20px" : "32px 26px", position: "relative", overflow: "hidden", transition: "all 0.4s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(44,26,14,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                {s.tag && <div style={{ position: "absolute", top: 14, right: 14, background: "linear-gradient(135deg,#c8986b,#a5673a)", color: "#fff", fontFamily: "'Cormorant Garamond',serif", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", padding: "3px 10px" }}>{s.tag}</div>}
                <div style={{ fontSize: 34, marginBottom: 12 }}>{s.icon}</div>
                <h3 className="playfair" style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, color: "#2c1a0e", marginBottom: 8 }}>{s.title}</h3>
                <p className="cormorant" style={{ fontSize: 16, color: "#6b4226", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoSection />
      <PricingSection />
      <ReviewsSection />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: 0, background: "#1a0c06", position: "relative", overflow: "hidden" }}>
        <div style={{ height: 4, background: "linear-gradient(90deg, transparent, #c8986b, #e8b87a, #c8986b, transparent)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(200,152,107,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", background: "radial-gradient(ellipse at 20% 0%, rgba(200,120,60,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", paddingTop: isMobile ? 48 : 72, marginBottom: -20, position: "relative", zIndex: 1 }}>
          <svg width="160" height="28" viewBox="0 0 160 28">
            <line x1="0" y1="14" x2="58" y2="14" stroke="#c8986b" strokeWidth="0.8" strokeOpacity="0.5"/>
            <circle cx="65" cy="14" r="3" fill="none" stroke="#c8986b" strokeWidth="1" strokeOpacity="0.7"/>
            <circle cx="80" cy="14" r="5" fill="none" stroke="#c8986b" strokeWidth="1.2"/>
            <circle cx="80" cy="14" r="2" fill="#c8986b" fillOpacity="0.6"/>
            <circle cx="95" cy="14" r="3" fill="none" stroke="#c8986b" strokeWidth="1" strokeOpacity="0.7"/>
            <line x1="102" y1="14" x2="160" y2="14" stroke="#c8986b" strokeWidth="0.8" strokeOpacity="0.5"/>
          </svg>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "32px 20px 60px" : isTablet ? "40px 32px 72px" : "48px 48px 80px", position: "relative", zIndex: 1 }}>
          <SectionHeader tag="Get In Touch" title="Book Your <em style='font-style:italic;color:#c8986b'>Session</em>" subtitle="Ready to adorn yourself with beautiful henna? Let's create something magical together." light />

          <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1.1fr 0.9fr", gap: isMobile ? 32 : 40, alignItems: "start" }}>
            <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(200,152,107,0.06) 100%)", border: "1px solid rgba(200,152,107,0.25)", borderRadius: 2, padding: isMobile ? "28px 20px" : "44px 40px", backdropFilter: "blur(4px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,152,107,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 10px", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#c8986b,#a5673a)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: "0 0 40px rgba(200,152,107,0.4)" }}>✿</div>
                  <div className="playfair" style={{ fontSize: 28, color: "#f3e9de", marginBottom: 12, fontWeight: 800 }}>Enquiry Sent!</div>
                  <p className="cormorant" style={{ fontSize: 18, color: "#c8ab8e", lineHeight: 1.8, marginBottom: 28 }}>Your message is on the way to WhatsApp. I'll respond within a few hours! 🌸</p>
                  <a href="https://wa.me/919566429054" target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "linear-gradient(135deg,#25D366,#128C7E)", color: "#fff", textDecoration: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", boxShadow: "0 8px 28px rgba(37,211,102,0.35)" }}>
                    Open WhatsApp
                  </a>
                </div>
              ) : (
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 28 }}>
                    <div className="cormorant" style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#c8986b", marginBottom: 8 }}>✦ Booking Form ✦</div>
                    <h3 className="playfair" style={{ fontSize: isMobile ? 22 : 26, fontWeight: 800, color: "#f3e9de", lineHeight: 1.2 }}>Tell Me About<br /><em style={{ color: "#c8986b", fontStyle: "italic" }}>Your Occasion</em></h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      {[["👤  Your Full Name", "text", "name"], ["📞  Phone Number", "tel", "phone"]].map(([ph, type, key]) => (
                        <div key={key} style={{ position: "relative" }}>
                          <input type={type} placeholder={ph} value={contactForm[key]} onChange={e => setContactForm(p => ({ ...p, [key]: e.target.value }))}
                            style={{ width: "100%", padding: "15px 18px", border: "none", borderBottom: "2px solid rgba(200,152,107,0.3)", background: "rgba(255,255,255,0.04)", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#f3e9de", outline: "none", transition: "border-color 0.3s", borderRadius: "2px 2px 0 0" }}
                            onFocus={e => { e.currentTarget.style.borderBottomColor = "#c8986b"; e.currentTarget.style.background = "rgba(200,152,107,0.07)"; }}
                            onBlur={e => { e.currentTarget.style.borderBottomColor = contactForm[key] ? "#c8986b" : "rgba(200,152,107,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                          {contactForm[key] && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#c8986b,#e8b87a)", borderRadius: 1 }} />}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 14, position: "relative" }}>
                      <input type="email" placeholder="📧  Email Address (optional)" value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))}
                        style={{ width: "100%", padding: "15px 18px", border: "none", borderBottom: "2px solid rgba(200,152,107,0.3)", background: "rgba(255,255,255,0.04)", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#f3e9de", outline: "none", transition: "all 0.3s", borderRadius: "2px 2px 0 0" }}
                        onFocus={e => { e.currentTarget.style.borderBottomColor = "#c8986b"; e.currentTarget.style.background = "rgba(200,152,107,0.07)"; }}
                        onBlur={e => { e.currentTarget.style.borderBottomColor = contactForm.email ? "#c8986b" : "rgba(200,152,107,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <div className="cormorant" style={{ fontSize: 12, letterSpacing: 2, color: "#8a6040", textTransform: "uppercase", marginBottom: 10 }}>Select Service</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {["Bridal Mehndi", "Party Mehndi", "Arabic Mehndi", "Fusion", "Finger Mehndi", "Custom"].map(s => (
                          <button key={s} onClick={() => setContactForm(p => ({ ...p, service: s }))}
                            style={{ padding: "8px 16px", border: `1.5px solid ${contactForm.service === s ? "#c8986b" : "rgba(200,152,107,0.25)"}`, background: contactForm.service === s ? "linear-gradient(135deg,#c8986b,#a5673a)" : "transparent", color: contactForm.service === s ? "#fff" : "#c8ab8e", fontFamily: "'Cormorant Garamond',serif", fontSize: 14, cursor: "pointer", borderRadius: 40, transition: "all 0.25s", letterSpacing: 0.5 }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: 24, position: "relative" }}>
                      <textarea placeholder="✍️  Tell me about your occasion, date & location..." rows={isMobile ? 3 : 4} value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                        style={{ width: "100%", padding: "15px 18px", border: "none", borderBottom: "2px solid rgba(200,152,107,0.3)", background: "rgba(255,255,255,0.04)", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#f3e9de", outline: "none", resize: "none", transition: "all 0.3s", borderRadius: "2px 2px 0 0" }}
                        onFocus={e => { e.currentTarget.style.borderBottomColor = "#c8986b"; e.currentTarget.style.background = "rgba(200,152,107,0.07)"; }}
                        onBlur={e => { e.currentTarget.style.borderBottomColor = contactForm.message ? "#c8986b" : "rgba(200,152,107,0.3)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                    </div>
                    <button onClick={handleSubmit}
                      style={{ width: "100%", padding: "17px", background: "linear-gradient(135deg,#25D366 0%,#128C7E 100%)", color: "#fff", border: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer", transition: "all 0.35s", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 6px 28px rgba(37,211,102,0.28)" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(37,211,102,0.45)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.28)"; }}>
                      <svg viewBox="0 0 32 32" width="20" height="20" fill="#fff"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.67 4.61 1.832 6.504L4 29l7.696-1.808A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm6.406 16.594c-.273.766-1.352 1.402-2.234 1.586-.594.127-1.37.228-3.98-.855-3.34-1.367-5.49-4.76-5.657-4.98-.16-.22-1.34-1.78-1.34-3.396s.848-2.41 1.148-2.74c.273-.3.594-.375.793-.375h.57c.18 0 .426-.07.664.508.246.594.84 2.055.914 2.203.074.148.12.32.024.512-.09.188-.137.305-.273.465-.137.164-.287.367-.41.492-.136.137-.278.285-.12.559.157.273.7 1.152 1.504 1.867 1.03.918 1.9 1.203 2.172 1.34.273.137.433.114.594-.07.16-.183.684-.8.867-1.074.18-.273.36-.228.606-.137.246.09 1.566.738 1.836.871.273.137.453.2.52.316.064.113.064.664-.21 1.43z"/></svg>
                      Send Enquiry via WhatsApp
                    </button>
                    <p className="cormorant" style={{ textAlign: "center", fontSize: 13, color: "rgba(200,152,107,0.5)", marginTop: 10 }}>Name & phone required · Opens WhatsApp directly</p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="cormorant" style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#c8986b", marginBottom: 4 }}>✦ Connect With Me ✦</div>
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="ig1" cx="30%" cy="107%" r="150%">
                          <stop offset="0%" stopColor="#fdf497"/>
                          <stop offset="5%" stopColor="#fdf497"/>
                          <stop offset="45%" stopColor="#fd5949"/>
                          <stop offset="60%" stopColor="#d6249f"/>
                          <stop offset="90%" stopColor="#285AEB"/>
                        </radialGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" fill="url(#ig1)"/>
                      <circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" strokeWidth="1.8"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
                    </svg>
                  ),
                  label: "Instagram", val: "@sakura_mehandiart", href: "https://instagram.com/sakura_mehandiart", color: "#d6249f", bg: "linear-gradient(135deg,rgba(214,36,159,0.13),rgba(40,90,235,0.06))"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5" fill="#FF0000"/>
                      <path d="M19.6 8.2a2.1 2.1 0 00-1.48-1.49C16.88 6.4 12 6.4 12 6.4s-4.88 0-6.12.31A2.1 2.1 0 004.4 8.2C4.1 9.45 4.1 12 4.1 12s0 2.55.3 3.8a2.1 2.1 0 001.48 1.49c1.24.31 6.12.31 6.12.31s4.88 0 6.12-.31a2.1 2.1 0 001.48-1.49c.3-1.25.3-3.8.3-3.8s0-2.55-.3-3.8z" fill="#fff"/>
                      <polygon points="10.2,14.6 14.8,12 10.2,9.4" fill="#FF0000"/>
                    </svg>
                  ),
                  label: "YouTube", val: "@sakuramehendi · 291 videos", href: "https://www.youtube.com/@sakuramehendi", color: "#FF0000", bg: "linear-gradient(135deg,rgba(255,0,0,0.12),rgba(255,0,0,0.04))"
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5" fill="#1877F2"/>
                      <path d="M16 8h-2a1 1 0 00-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 014-4h2v3z" fill="#fff"/>
                    </svg>
                  ),
                  label: "Facebook", val: "Sakura Mehendi Art", href: "https://facebook.com/profile.php?id=61555967663222", color: "#1877F2", bg: "linear-gradient(135deg,rgba(24,119,242,0.12),rgba(24,119,242,0.04))"
                },
              ].map(({ icon, label, val, href, color, bg }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: bg, border: `1px solid ${color}28`, textDecoration: "none", transition: "all 0.3s", borderRadius: 2 }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.borderColor = color + "60"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = color + "28"; }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: `${color}15`, border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="cormorant" style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: color, opacity: 0.85, marginBottom: 2 }}>{label}</div>
                    <div className="playfair" style={{ fontSize: 15, color: "#f3e9de", fontWeight: 600 }}>{val}</div>
                  </div>
                  <div style={{ color, fontSize: 18 }}>→</div>
                </a>
              ))}
              <div style={{ background: "linear-gradient(135deg,rgba(200,152,107,0.1),rgba(200,152,107,0.04))", border: "1px solid rgba(200,152,107,0.3)", padding: "22px 22px", borderRadius: 2 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#c8986b,#a5673a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📍</div>
                  <div>
                    <div className="playfair" style={{ fontSize: 16, color: "#c8986b", fontWeight: 700, marginBottom: 4 }}>Kovilpatti & Nearby Areas</div>
                    <p className="cormorant" style={{ fontSize: 15, color: "#c8ab8e", lineHeight: 1.7 }}>Home visits available. Travel charges may apply for distant locations.</p>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid rgba(200,152,107,0.2)", paddingTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18 }}>🎬</span>
                  <p className="cormorant" style={{ fontSize: 15, color: "#c8ab8e", lineHeight: 1.6 }}>New tutorial videos every day at <strong style={{ color: "#f3e9de" }}>6 PM</strong> on YouTube</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["⭐", "5.0 Rating", "17 Google Reviews"], ["🌿", "100% Natural", "Premium Henna"], ["🏠", "Home Visits", "Available"], ["💍", "500+ Clients", "Across Tamil Nadu"]].map(([icon, title, sub]) => (
                  <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(200,152,107,0.15)", padding: "14px 14px", textAlign: "center", borderRadius: 2 }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                    <div className="playfair" style={{ fontSize: 13, color: "#f3e9de", fontWeight: 700, marginBottom: 2 }}>{title}</div>
                    <div className="cormorant" style={{ fontSize: 12, color: "#6b4226" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 4, background: "linear-gradient(90deg, transparent, #c8986b, #e8b87a, #c8986b, transparent)" }} />
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#150b05", padding: isMobile ? "24px 20px" : "28px 40px", borderTop: "1px solid rgba(200,152,107,0.12)", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, textAlign: isMobile ? "center" : "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#c8986b" }}>✿</span>
          <span className="playfair" style={{ fontSize: 14, color: "#f3e9de", fontWeight: 700 }}>Sakura Mehendi Art</span>
        </div>
        <span className="cormorant" style={{ fontSize: 13, color: "#5a3a20" }}>© 2025 Sakura Mehendi Art · India · All Rights Reserved</span>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            {
              href: "https://instagram.com/sakura_mehandiart",
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <defs>
                    <radialGradient id="igf" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497"/>
                      <stop offset="45%" stopColor="#fd5949"/>
                      <stop offset="60%" stopColor="#d6249f"/>
                      <stop offset="90%" stopColor="#285AEB"/>
                    </radialGradient>
                  </defs>
                  <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#igf)"/>
                  <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="1.8"/>
                  <circle cx="18" cy="6" r="1.3" fill="#fff"/>
                </svg>
              )
            },
            {
              href: "https://www.youtube.com/@sakuramehendi",
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <rect width="24" height="24" rx="5" fill="#FF0000"/>
                  <path d="M19.6 8.2a2.1 2.1 0 00-1.48-1.49C16.88 6.4 12 6.4 12 6.4s-4.88 0-6.12.31A2.1 2.1 0 004.4 8.2C4.1 9.45 4.1 12 4.1 12s0 2.55.3 3.8a2.1 2.1 0 001.48 1.49c1.24.31 6.12.31 6.12.31s4.88 0 6.12-.31a2.1 2.1 0 001.48-1.49c.3-1.25.3-3.8.3-3.8s0-2.55-.3-3.8z" fill="#fff"/>
                  <polygon points="10.2,14.6 14.8,12 10.2,9.4" fill="#FF0000"/>
                </svg>
              )
            },
            {
              href: "https://facebook.com/profile.php?id=61555967663222",
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <rect width="24" height="24" rx="5" fill="#1877F2"/>
                  <path d="M16 8h-2a1 1 0 00-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 014-4h2v3z" fill="#fff"/>
                </svg>
              )
            },
            {
              href: "https://wa.me/919566429054",
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <rect width="24" height="24" rx="5" fill="#25D366"/>
                  <path d="M12 4C7.58 4 4 7.58 4 12c0 1.49.41 2.88 1.13 4.07L4 20l4.08-1.07A8 8 0 1012 4zm4 10.89c-.17.47-.84.87-1.39.99-.37.08-.85.14-2.47-.53-2.08-.85-3.42-2.96-3.52-3.1-.1-.14-.83-1.1-.83-2.11s.53-1.5.71-1.71c.17-.19.37-.23.49-.23h.36c.11 0 .26-.04.41.32l.57 1.37c.05.09.07.2.01.32-.05.12-.08.19-.17.29l-.26.3c-.08.09-.17.18-.07.35.1.17.44.72.94 1.16.64.57 1.18.75 1.35.83.17.09.27.07.37-.04.1-.11.43-.5.54-.67.11-.17.22-.14.38-.08l1.14.54c.17.08.28.12.32.2.04.07.04.41-.13.88z" fill="#fff"/>
                </svg>
              )
            },
          ].map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "none", transition: "transform 0.2s", display: "inline-flex" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>{icon}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpLeft,
  Box,
  Brush,
  Check,
  Clock,
  Diamond,
  DraftingCompass,
  Factory,
  House,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Play,
  Quote,
  Ruler,
  Send,
  Sofa,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import SuspendedCabinCrane from "./components/SuspendedCabinCrane";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.5 8.8v11H3.2v-11h3.3ZM4.8 3.5a1.9 1.9 0 1 1 0 3.9 1.9 1.9 0 0 1 0-3.9ZM20.5 13.4v6.4h-3.3v-6c0-1.5-.6-2.4-2-2.4-1.1 0-1.7.7-2 1.4-.1.3-.1.6-.1 1v5.9H9.8v-11h3.3v1.5c.4-.7 1.2-1.7 3-1.7 2.2 0 4.4 1.5 4.4 5Z" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.9C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27.3 27.3 0 0 0 2 12a27.3 27.3 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.9c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.9A27.3 27.3 0 0 0 22 12a27.3 27.3 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
  </svg>
);

/* ---------------------------------- Reveal ---------------------------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- Logo ---------------------------------- */
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2 group">
      <span className="relative grid h-12 w-12 shrink-0 place-items-center sm:h-16 sm:w-16">
        <img
          src="/images/logo.png"
          alt="ANTIKA FACTORY"
          className="h-10 w-10 object-contain sm:h-14 sm:w-14"
          style={{ mixBlendMode: 'multiply' }}
          width="56"
          height="56"
          fetchPriority="high"
        />
      </span>
      <span className="leading-none text-right hidden sm:block">
        <span
          className={`block font-display text-[18px] font-800 font-extrabold sm:text-[20px] ${
            dark ? "text-white" : "text-charcoal"
          }`}
          style={{ fontWeight: 800 }}
        >
          کارگەی ئەنتیکا
        </span>
        <span
          className={`mt-1 block text-[10px] font-medium sm:text-[11px] ${
            dark ? "text-white/60" : "text-charcoal/55"
          }`}
        >
          ئەندازیاری • هونەری • دیکۆر
        </span>
      </span>
    </a>
  );
}

/* ---------------------------------- Header ---------------------------------- */
const NAV = [
  { id: "home", label: "سەرەکی" },
  { id: "works", label: "کارەکانمان" },
  { id: "services", label: "خزمەتگوزارییەکانمان" },
  { id: "about", label: "دەربارەی ئێمە" },
  { id: "contact", label: "پەیوەندیمان پێوە بکە" },
];

function Header({
  active,
  onNav,
}: {
  active: string;
  onNav: (id: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      scrollPosition.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPosition.current);
      // Return focus to menu button when closing
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!open || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    // Focus first element when menu opens
    setTimeout(() => firstElement?.focus(), 100);

    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && 
          menuButtonRef.current && !menuButtonRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4" style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}>
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "bg-cream/85 shadow-[0_18px_50px_-20px_rgba(23,23,23,0.25)] ring-1 ring-black/5 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo RIGHT (first in RTL) */}
          <Logo />

          {/* Nav center */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => onNav(n.id)}
                className={`nav-link text-[14.5px] font-semibold transition-colors ${
                  active === n.id
                    ? "active"
                    : "text-charcoal/75 hover:text-charcoal"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* CTA LEFT */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={() => onNav("contact")}
              className="btn-shine hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-10px_rgba(255,90,0,0.6)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_18px_34px_-10px_rgba(255,90,0,0.65)] sm:inline-flex sm:px-6 sm:py-3 sm:text-[14px]"
            >
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              aria-label={open ? "داخستنی مێنیو" : "کردنەوەی مێنیو"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 bg-white/80 text-charcoal backdrop-blur transition hover:border-brand hover:text-brand lg:hidden sm:h-12 sm:w-12"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="مێنیوی سەرەکی"
          className={`mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl transition-all duration-500 lg:hidden ${
            open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col p-3">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNav(n.id);
                  setOpen(false);
                  // Navigate after menu closes
                  setTimeout(() => {
                    const element = document.getElementById(n.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className={`flex items-center justify-between rounded-xl px-5 py-4 text-[15px] font-bold transition ${
                  active === n.id
                    ? "bg-brand-soft text-brand"
                    : "text-charcoal/80 hover:bg-sand"
                }`}
              >
                {n.label}
                <span className="text-xs text-charcoal/30">0{i + 1}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => {
                onNav("contact");
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-4 text-[15px] font-bold text-white"
            >
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative overflow-hidden bg-cream pt-24 pb-4 sm:pt-32 sm:pb-4 lg:pt-36 lg:pb-0"
      style={{ 
        scrollMarginTop: '80px'
      }}
    >
      {/* faint blueprint on right */}
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black_20%,transparent_70%)]" />
      {/* soft blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/3 translate-y-1/3 rounded-full bg-brand blur-[1px]" />
      {/* bottom-right orange corner like reference */}
      <div className="pointer-events-none absolute -bottom-6 -left-10 h-36 w-36 rounded-tr-[3rem] bg-brand hidden sm:block sm:h-44 sm:w-44" />
      <div className="pointer-events-none absolute -bottom-6 -left-10 h-36 w-36 rounded-tr-[3rem] border border-white/20 hidden sm:block sm:h-44 sm:w-44" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-6 px-4 pb-2 sm:gap-10 sm:px-6 sm:pb-4 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-0">
        {/* TEXT — RIGHT side (first in DOM for RTL) */}
        <div className="relative z-10 mx-auto max-w-md text-center sm:mx-0 sm:max-w-none sm:text-right">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-white/70 py-1 pl-3 pr-1 sm:gap-2 sm:py-1.5 sm:pl-4 sm:pr-1.5 backdrop-blur">
              <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white sm:px-3 sm:py-1 sm:text-[12px]">
                لەگەڵ ئێمەدا
              </span>
              <span className="text-[11px] font-semibold text-brand sm:text-[13px]">
                شوێنەکەت بە شێوازێکی جیاواز و مۆدێرن ڕێکبخە
              </span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand sm:h-2 sm:w-2" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display font-black leading-[1.15] text-charcoal sm:mt-6" style={{ fontSize: 'clamp(48px, 9.6vw, 76px)' }}>
              هونەر، دیزاین و
              <span className="relative mt-1 block text-brand">
                ئەندازیاری
                <svg
                  viewBox="0 0 320 22"
                  className="absolute -bottom-2 right-[-65px] h-4 w-[68%] text-brand/30"
                  fill="none"
                >
                  <path
                    d="M4 16 C 80 6, 220 6, 316 12"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-7 max-w-[90%] px-4 text-[19px] font-light leading-[2.2] text-charcoal/65 text-center sm:mx-0 sm:max-w-[520px] sm:px-0 sm:text-right sm:text-[17px] sm:leading-9">
             تێکەڵکردن و وردبینی ئەندازیاری و داهێنانی هونەری بۆ بەدیهێنانی پرۆژەی ناوازە
             "ئەنتیکا، تێکەڵەیەک لە هونەر و تەلارسازیی هاوچەرخ"
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 w-full sm:flex-row sm:justify-start sm:gap-4 sm:w-auto sm:max-w-none">
              <a
                href="#works"
                className="btn-shine inline-flex items-center justify-center gap-2.5 rounded-full bg-brand px-10 py-5 text-[17px] font-bold text-white shadow-[0_18px_40px_-12px_rgba(255,90,0,0.65)] transition-all hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_24px_48px_-12px_rgba(255,90,0,0.7)] active:translate-y-0 w-full sm:w-auto sm:min-w-0 sm:gap-2.5 sm:px-8 sm:py-4 sm:text-[15px]"
              >
                بینینی کارەکانمان
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 sm:h-6 sm:w-6">
                  <ArrowLeft className="h-5 w-5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                </span>
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-charcoal/20 bg-white/70 px-10 py-5 text-[17px] font-bold text-charcoal backdrop-blur transition-all hover:-translate-y-1 hover:border-charcoal hover:bg-white w-full sm:w-auto sm:min-w-0 sm:gap-3 sm:px-8 sm:py-4 sm:text-[15px]"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-charcoal text-white sm:h-7 sm:w-7">
                  <Play className="h-4 w-4 fill-current sm:h-3.5 sm:w-3.5" />
                </span>
                دەربارەی ئێمە
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-4">
                <div className="flex -space-x-3 space-x-reverse">
                  {["KA", "RA", "MO"].map((t, i) => (
                    <span
                      key={t}
                      className={`grid h-14 w-14 place-items-center rounded-full border-2 border-cream text-[15px] font-bold text-white sm:h-10 sm:w-10 sm:text-[11px] ${
                        i === 0
                          ? "bg-charcoal"
                          : i === 1
                            ? "bg-brand"
                            : "bg-[#2b2b2b]"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-cream bg-white text-[15px] font-bold text-charcoal shadow sm:h-10 sm:w-10 sm:text-[11px]">
                    +300
                  </span>
                </div>
                <div className="text-[15px] leading-6 text-charcoal/70 text-center sm:text-left sm:text-[13px] sm:leading-5">
                  <span className="flex items-center gap-1 font-bold text-charcoal text-[16px]">
                    <Star className="h-5 w-5 fill-brand text-brand" />
                    4.9
                  </span>
                  <span className="sm:hidden">جێگەی متمانەی زیاتر لە ٣٠٠ کڕیار</span>
                  <span className="hidden sm:inline">جێگەی متمانەی زیاتر لە ٣٠٠ کڕیار</span>
                </div>
              </div>
             
            </div>
          </Reveal>
        </div>

        {/* VISUAL — LEFT side */}
        <div className="relative z-10 mx-auto w-full max-w-[620px] hidden sm:block">
          <Reveal delay={150} className="relative">
            <div className="relative">
              {/* Big orange arch behind */}
              <div className="absolute left-1/2 top-1/2 -z-0 h-[100%] w-[92%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <div className="absolute inset-x-4 top-6 bottom-0 rounded-t-[999px] rounded-b-[3rem] bg-gradient-to-b from-[#FF6A1A] via-[#FF5A00] to-[#E04A00] shadow-[0_40px_80px_-30px_rgba(255,90,0,0.5)]" />
                {/* arch inner highlight */}
                <div className="absolute inset-x-8 top-10 bottom-4 rounded-t-[999px] rounded-b-[2.5rem] border border-white/25" />
                {/* blueprint lines on arch */}
                <div className="bg-blueprint-light absolute inset-0 opacity-40" />
              </div>

              {/* rotating dashed ring */}
              <div className="animate-spin-slower absolute -left-4 top-8 h-28 w-28 rounded-full border-2 border-dashed border-brand/40" />
              <div className="animate-drift absolute -right-3 top-16 hidden h-16 w-16 rounded-2xl bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur sm:grid place-items-center">
                <DraftingCompass className="h-7 w-7 text-brand" />
              </div>

              {/* Main image - now inside Reveal but with proper layering */}
              <div className="relative z-30 px-6 pb-0 pt-14 sm:px-10">
                <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[550px]">
                  <div className="-ml-32 h-full w-full sm:-ml-40">
                    <SuspendedCabinCrane
                      craneImage="/images/crane.png"
                      cabinImage="/images/cabin.png"
                      swingAmplitude={20}
                      swingSpeed={0.1}
                      damping={3.6}
                      dragRange={120}
                      cableColor="#333333"
                      cableWidth={2}
                      cabinScale={1.6}
                      whiteThreshold={35}
                      showDebug={false}
                    />
                  </div>
                </div>
              </div>



              {/* floating cards */}
              <div className="animate-float-slow absolute -right-2 bottom-68 z-20 hidden rounded-2xl bg-white/90 p-3 pr-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/5 backdrop-blur sm:flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft">
                  <Ruler className="h-5 w-5 text-brand" />
                </span>
                <span>
                  <span className="block text-[13px] font-extrabold text-charcoal">
                    پلانی ئەندازیاری
                  </span>
                  <span className="block text-[11px] text-charcoal/55">
                    وردبینی تا 1mm
                  </span>
                </span>
              </div>

              <div className="animate-float absolute -left-2 bottom-48 z-20 flex items-center gap-3 rounded-2xl bg-charcoal/90 p-3 pl-5 pr-3 text-white shadow-xl backdrop-blur">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand">
                  <Sparkles className="h-5 w-5 text-white" />
                </span>
                <span>
                  <span className="block text-[13px] font-extrabold">
                    لە بیرۆکەوە بۆ دیزاین
                  </span>
                  <span className="block text-[11px] text-white/60">
                    لە دیزاینەوە بۆ ڕاستی
                  </span>
                </span>
              </div>

              {/* floor shadow */}
              <div className="mx-auto mt-2 h-6 w-[70%] rounded-[100%] bg-charcoal/15 blur-xl" />
            </div>
          </Reveal>

         
        </div>
      </div>

      {/* leaves foreground similar to ref */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -left-6 bottom-10 h-40 w-40 text-[#1d3a1f] opacity-90 hidden sm:block"
        fill="currentColor"
      >
        <path d="M10 90 C 20 50, 50 20, 90 10 C 80 50, 50 80, 10 90 Z" opacity="0.9" />
        <path d="M15 85 L 75 25" stroke="#faf8f4" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </section>
  );
}

/* --------------------------------- Features --------------------------------- */
const FEATURES = [
  {
    icon: Diamond,
    title: "دیزاینی تایبەت",
    desc: "شوێنەکەت بە ستایلێکی سەردەمیانە و گونجاو لەگەڵ سەلیقەی خۆت نەخشەسازی بۆ دەکرێت",
  },
  {
    icon: House,
    title: "کەرەستەی نایاب و پێشکەوتوو",
    desc: "بەرهەمەکانمان بەرزترین ستانداردەکانی دروستکردن و باشترین کەرەستەی سەردەم لەخۆ دەگرن",
  },
  {
    icon: Leaf,
    title: "داهێنان و جوانی",
    desc: "تێکەڵکردنی هونەر و ئەندازیاری بۆ بەخشینی ڕۆحێکی تازە، مۆدێرن و سەرنجڕاکێش بە پڕۆژەکانت",
  },
  {
    icon: Box,
    title: "کوالێتی بەرز و متمانە",
    desc: "جێبەجێکردنی پڕۆژەکان بەوپەڕی وردەکارییەوە، لە قۆناغی سەرەتای پلاندانانەوە تا ساتی ڕادەستکردن",
  },
];

function Features() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6" style={{ paddingInline: 'max(16px, 5%)' }}>
        <div className="grid gap-y-8 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse lg:divide-[#E8E5E1] lg:border-x lg:border-x-reverse lg:border-[#E8E5E1] lg:py-14">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className="group flex items-start gap-4 px-2 lg:px-7">
                <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-[1.5px] border-brand/60 bg-brand-soft/50 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_12px_24px_-8px_rgba(255,90,0,0.6)]">
                  <f.icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-[16px] font-extrabold text-charcoal transition-colors group-hover:text-brand">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] font-light leading-6 text-charcoal/60">
                    {f.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Works ---------------------------------- */
type Work = {
  id: string;
  cat: string;
  img: string;
  title: string;
  desc: string;
  tag: string;
};

const WORKS: Work[] = [
  {
    id: "capsule",
    cat: "کەپسولەکان",
    img: "/images/work-capsule.png",
    title: "کەپسولەکان",
    desc: "ژیانێکی مۆدێرن لە دیزاینێکی تایبەتدا",
    tag: "هونەری • مۆدێرن",
  },
  {
    id: "light",
    cat: "لایتی ڕووناکی",
    img: "/images/work-lighting.jpg",
    title: "ڕووناکی",
    desc: "تێکەڵەیەک لە جوانیی سروشت و دیزاینی مۆدێرن بە شێوەیەکی بێهاوتا",
    tag: "کوالێتی بەرز • قەبارەی جیاواز",
  },
  {
    id: "shelf",
    cat: "ڕەفەکان",
    img: "/images/work-shelves.jpg",
    title: "ڕەفەکان",
    desc: "ڕێکخستنێکی نموونەیی و پێدانی جوانییەکی تایبەت بە دیزاینی ناوەوە",
    tag: "جێگیر • سەلامەت",
  },
];

const CATS = ["هەموو کارەکانمان", "کەپسولەکان", "لایتی ڕووناکی", "ڕەفەکان"];

function Works() {
  const [cat, setCat] = useState("هەموو");
  const filtered = cat === "هەموو" ? WORKS : WORKS.filter((w) => w.cat === cat);

  return (
    <section id="works" className="relative overflow-hidden bg-cream py-16 sm:py-24" style={{ scrollMarginTop: '80px' }}>
      {/* side leaves */}
      <div className="pointer-events-none absolute -left-10 top-1/3 hidden opacity-90 lg:block">
        <svg viewBox="0 0 120 200" className="h-64 w-32 text-[#1e3d20]" fill="currentColor">
          <ellipse cx="40" cy="60" rx="34" ry="52" transform="rotate(-18 40 60)" />
          <ellipse cx="70" cy="150" rx="26" ry="40" transform="rotate(14 70 150)" opacity="0.7" />
        </svg>
      </div>
      <div className="pointer-events-none absolute -right-6 top-16 hidden lg:block">
        <svg viewBox="0 0 100 120" className="h-32 w-24 text-[#8a6a2f]" fill="currentColor" opacity="0.8">
          <path d="M50 5 C 70 35, 75 75, 50 115 C 25 75, 30 35, 50 5 Z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6" style={{ paddingInline: 'max(16px, 5%)' }}>
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            کارەکانمان
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-charcoal" style={{ fontSize: 'clamp(24px, 4vw, 44px)' }}>
            دروستکردنی ژینگەیەکی هونەری و مۆدێرن
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14.5px] font-light leading-8 text-charcoal/60 sm:text-[16px]">
            لە نەخشەسازیی لایتی ڕوناکی و ڕەفەکانەوە بگرە تا دەگاتە کەپسولەکان، هەموو وردەکارییەک بەوپەڕی داهێنان و شارەزایی ئەندازیارییەوە جێبەجێ دەکەین
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-7 py-3 text-[14px] font-bold transition-all duration-300 ${
                  cat === c
                    ? "bg-brand text-white shadow-[0_12px_24px_-8px_rgba(255,90,0,0.6)] scale-[1.02]"
                    : "bg-stone2/60 text-charcoal/70 hover:bg-stone2 hover:text-charcoal"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-7">
          {filtered.map((w, i) => (
            <Reveal key={w.id} delay={i * 120}>
              <article className="group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_-25px_rgba(23,23,23,0.25)] ring-1 ring-black/5 transition-all duration-500">
                <div className="zoom-img relative h-[300px] overflow-hidden sm:h-[340px]">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/85 px-4 py-1.5 text-[12px] font-bold text-charcoal backdrop-blur">
                    {w.tag}
                  </span>
                  <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-brand text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpLeft className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div className="text-right">
                    <h3 className="font-display text-[19px] font-extrabold text-charcoal">
                      {w.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] font-light leading-6 text-charcoal/60">
                      {w.desc}
                    </p>
                  </div>
                  <a
                    href="#contact"
                    aria-label={w.title}
                    className="animate-pulse-ring grid h-[48px] w-[48px] shrink-0 place-items-center rounded-full bg-brand text-white transition-all duration-300 hover:bg-charcoal hover:rotate-[-45deg]"
                  >
                    <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-8 py-3.5 text-[14px] font-bold text-charcoal transition hover:border-brand hover:text-brand"
          >
            هەموو کارەکانمان ببینە
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Services --------------------------------- */
const SERVICES = [
  {
    n: "01",
    icon: DraftingCompass,
    title: "تەلارسازی",
    desc: "دیزاینی ڕەفە، کۆشک و کەپسول بە ستانداردی جیهانی و بیرۆکەی داهێنەرانە",
  },
  {
    n: "02",
    icon: Sofa,
    title: "دیزاینی ناوەوە",
    desc: "دروستکردنی ژینگەیەکی هونەری و ئارام لە نەخشەسازی ماڵ و شوێنی نیشتەجێبوونەوە تا دەگاتە ئۆگیس و هۆتێلە گرانبەهاکان",
  },
  {
    n: "03",
    icon: Palette,
    title: "دێکۆرات و ڕازاندنەوە",
    desc: "هەڵبژاردن و گونجاندنی باشترین ڕەنگ، کەرەستە و ئێکسسواراتەکان بۆ بەخشینی جوانییەکی بێوێنە و هاوسەنگ بە شوێنەکەت",
  },
  {
    n: "04",
    icon: Brush,
    title: "دیزاینی تایبەت و داهێنەرانە",
    desc: "دیزاینی تایبەت بۆلایت، ڕەفە، کۆشک و کەپسول، لەگەڵ دروستکردنی سیستەمی خەوتنی مۆدێرنی جوڵاو (٣٦٠ پلە)",
  },
  {
    n: "05",
    icon: Ruler,
    title: "خزمەتگوزارییە ئەندازیارییەکان",
    desc: "دانانی پلانی تۆکمە، نەخشەی پێکهاتەیی (ئینشائی)، کارەبا و میکانیک، کە لەلایەن ئەندازیارانی پسپۆڕەوە جێبەجێ دەکرێن",
  },
  {
    n: "06",
    icon: Factory,
    title: "بەرهەمهێنانی تایبەت لە کارگەی خۆمان",
    desc: "دروستکردنی پێداویستییەکان بەپێی داواکاری، لە دیزاینی ئەسکەلە و ڕەفەوە بگرە تا دەگاتە کەپسول و سیستەمی جوڵاو.",
  },
];

function Services() {
  return (
    <section id="services" className="relative bg-white py-16 sm:py-24" style={{ scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6" style={{ paddingInline: 'max(16px, 5%)' }}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <div className="text-right">
              <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
                <span className="h-[2px] w-8 rounded bg-brand" />
                خزمەتگوزارییەکان
              </span>
              <h2 className="mt-4 font-display text-[30px] font-black leading-[1.35] text-charcoal sm:text-[44px]">
                لە بیرۆکەوە تا دەگاتە
                <span className="text-brand"> دەستت </span>
              </h2>
              <p className="mt-4 max-w-xl text-[15px] font-light leading-8 text-charcoal/60">
               خەونەکانت بسپێرە بە دەستی ستافێک کە لە وردترین بڕگەکانی بیناسازیدا پسپۆڕن
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand"
            >
              داوای راوێژپێکردن بکە
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 100}>
              <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-[#EDE8E1] bg-cream p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:bg-white hover:shadow-[0_30px_60px_-20px_rgba(255,90,0,0.25)]">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-charcoal shadow-sm ring-1 ring-black/5 transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_14px_28px_-8px_rgba(255,90,0,0.6)]">
                    <s.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-[15px] font-bold text-charcoal/20 transition-colors group-hover:text-brand/40">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 text-right font-display text-[18px] font-extrabold text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-2 text-right text-[13.8px] font-light leading-7 text-charcoal/60">
                  {s.desc}
                </p>
                <span className="mt-5 flex items-center gap-2 text-[13px] font-bold text-charcoal/40 transition-colors group-hover:text-brand">
                  زیاتر بزانە
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </span>
                <span className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-brand/0 blur-2xl transition-all duration-500 group-hover:bg-brand/15" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- About ---------------------------------- */
function About() {
  return (
    <section id="about" className="relative bg-cream px-3 py-6 sm:px-5" style={{ scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-sand/60 ring-1 ring-black/5 sm:rounded-[2.5rem]">
        <div className="grid items-center gap-10 p-7 sm:p-12 lg:grid-cols-2 lg:gap-14 lg:p-16">
          {/* Text RIGHT */}
          <div className="text-right">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-bold text-brand ring-1 ring-brand/20">
                <Sparkles className="h-4 w-4" />
                دەربارەی ئێمە
              </span>
              <h2 className="mt-5 font-display text-[30px] font-black leading-[1.4] text-charcoal sm:text-[42px]">
                کارگەیەک کە هونەر
                <br />
                دەکاتە <span className="text-brand">ژیان</span>
              </h2>
              <p className="mt-5 text-[15px] font-light leading-8 text-charcoal/65">
               ئێمە لە کارگەی ئەنتیکا ژینگەیەک بونیاد دەنێین کە شایەنی متمانەی ئێوەبێت
               تیمەکەمان لە کۆمەڵێک ئەندازیار و تەکنیککاری خاوەن ئەزموون پێکهاتووە کە ساڵانێکی درێژە لە بواری بیناسازی
               و خانوی کەپسولیدا کار دەکەن...<br></br>
               ئامانجی ئێمە دابینکردنی شوێنێکی مۆدێرن و ئارامە بۆ ئەوەی داهاتوویەکی گەش بۆ خۆت و خێزانەکەت مسۆگەر بکەیت
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ul className="mt-6 space-y-3.5">
                {[
                  "تیمی ئەندازیار و دیزاینەری نێودەوڵەتی",
                  "کارگەی تایبەتی خۆمان بۆ بەرهەمهێنان",
                  "مەوادی کوالێتی بەرز و ئۆرجیناڵ",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[14.5px] font-semibold text-charcoal/85">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={250}>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-7">
                {[
                  { v: "+300", l: "پرۆژەی تەواو" },
                  { v: "20", l: "ساڵ ئەزموون" },
                  { v: "100%", l: "ڕەزامەندی کڕیارەکانمان" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-[26px] font-black text-charcoal sm:text-[32px]">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-charcoal/55">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="btn-shine inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-4 text-[14.5px] font-bold text-white transition hover:bg-brand"
                >
                  پەیوەندیمان پێوە بکە
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Images LEFT */}
          <Reveal delay={150}>
            <div className="relative">
              <div className="zoom-img overflow-hidden rounded-[1.75rem] shadow-[0_35px_70px_-25px_rgba(23,23,23,0.4)]">
                <img
                  src="/images/studio-about.jpg"
                  alt="ستۆدیۆی ANTIKA FACTORY"
                  className="h-[380px] w-full object-cover sm:h-[480px]"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="480"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden w-56 overflow-hidden rounded-2xl border-4 border-cream shadow-2xl sm:block lg:-right-8">
                <img
                  src="/images/cabin.png"
                  alt="وردەکاری"
                  className="h-40 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="224"
                  height="160"
                />
              </div>
              <div className="absolute -left-3 top-6 rounded-2xl bg-brand px-5 py-4 text-white shadow-[0_18px_40px_-12px_rgba(255,90,0,0.7)] sm:-left-6">
                <div className="font-display text-[26px] font-black leading-none">20+  ساڵ ئەزموون</div>
              </div>
              <div className="bg-dots pointer-events-none absolute -top-6 right-8 h-20 w-32 opacity-60" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Testimonials ------------------------------- */
function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20" style={{ scrollMarginTop: '80px' }}>
      {/* marquee */}
      <div className="mb-10 overflow-hidden border-y border-[#EFE9E1] bg-cream py-4" dir="ltr">
        <div className="animate-marquee flex w-max whitespace-nowrap" style={{ '--marquee-duration': '28s' } as React.CSSProperties}>
          {[0, 1].map((k) => (
            <div key={k} className="flex" aria-hidden={k === 1}>
              {["تەلارسازی", "دیزاینی ناوەوە", "دیکۆر", "هونەر", "ئەندازیاری", "کەپسول", "ڕووناکی", "ڕەفە"].map(
                (w) => (
                  <span key={w + k} className="flex items-center gap-8 px-4 font-display text-[15px] font-bold text-charcoal/35" dir="rtl">
                    {w}
                    <span className="h-2 w-2 rounded-full bg-brand" />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6" style={{ paddingInline: 'max(16px, 5%)' }}>
        <Reveal className="text-center">
          <span className="text-[14px] font-bold text-brand">ڕای کڕیارەکان</span>
          <h2 className="mt-3 font-display text-[28px] font-black text-charcoal sm:text-[38px]">
            ئەوانەی متمانەیان پێکردین
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {[
            {
              q: "کوالێتی کارەکانیان زۆر لەوە بەرزتر بوو کە چاوەڕێم دەکرد! دیزاینی کەپسولەکە بە وردەکارییەکی بێئەندازە و ڕێک لە کاتی دیاریکراودا ڕادەستکرا. زۆر سوپاس بۆ تیمی ANTIKA FACTORY، بەڕاستی شایەنی متمانەن",
              n: "ئالا محەمەد",
              r: "خاوەنی کافێ — هەولێر",
            },
            {
              q: "دیزاینی ناوەوەی ئۆفیسەکەمان بەتەواوی نوێ بووەوە و ڕۆحێکی تازەی بە بەردا هات. لایتەکانی ڕووناکی و ڕەفەکان جگە لە جوانی، زۆر کوالێتی بەرزن. بێ دوودڵی یەکێک لە پیشەییترین تیمەکانن کە کارم لەگەڵ کردبن",
              n: "دیار کەریم",
              r: "بەڕێوەبەری ئۆفیس — سلێمانی",
            },
          ].map((t, i) => (
            <Reveal key={t.n} delay={i * 120}>
              <figure className="relative h-full rounded-[1.5rem] bg-cream p-8 ring-1 ring-black/5">
                <Quote className="h-8 w-8 fill-brand/15 text-brand/30" />
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-brand text-brand" />
                  ))}
                </div>
                <blockquote className="mt-4 text-right text-[15px] font-light leading-8 text-charcoal/75">
                  “{t.q}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-charcoal/10 pt-5">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-charcoal font-display text-[15px] font-bold text-white">
                    {t.n[0]}
                  </span>
                  <span className="text-right">
                    <span className="block text-[14.5px] font-extrabold text-charcoal">{t.n}</span>
                    <span className="block text-[12.5px] text-charcoal/55">{t.r}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer ---------------------------------- */
function Footer({ onNav }: { onNav: (id: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <footer id="contact" className="relative overflow-hidden bg-charcoal pt-14 text-white">
      {/* orange organic shapes */}
      <svg viewBox="0 0 300 160" className="pointer-events-none absolute -top-2 right-0 h-32 w-72 text-brand sm:h-40 sm:w-[420px]" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 0 H300 V40 C 240 90, 180 70, 130 110 C 90 140, 40 120, 0 90 Z" />
      </svg>
      <svg viewBox="0 0 260 220" className="pointer-events-none absolute -bottom-4 left-0 h-52 w-56 text-brand sm:h-72 sm:w-72" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 220 V60 C 60 80, 90 40, 140 70 C 190 100, 210 150, 260 170 L 260 220 Z" opacity="0.95" />
      </svg>
      <div className="pointer-events-none absolute left-1/4 top-10 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6" style={{ paddingInline: 'max(16px, 5%)' }}>
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.15fr_1fr_0.9fr_1.15fr] lg:gap-8">
          {/* 1 BRAND — rightmost */}
          <Reveal>
            <div className="text-right">
              <Logo dark />
              <p className="mt-5 max-w-[260px] text-[13.5px] font-light leading-7 text-white/60">
                ئەنتیکا، تێکەڵەیەک لە هونەر و تەلارسازیی هاوچەرخ
              </p>
              <div className="mt-6">
                <p className="text-[13px] font-bold text-white/80">ئێمە لە سۆشیال میدیا</p>
                <div className="mt-3 flex gap-3">
                  {[
                    { icon: FacebookIcon, l: "Facebook" },
                    { icon: InstagramIcon, l: "Instagram" },
                    { icon: LinkedinIcon, l: "LinkedIn" },
                    { icon: YoutubeIcon, l: "YouTube" },
                  ].map((s) => (
                    <a
                      key={s.l}
                      href="#home"
                      aria-label={s.l}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white/70 transition-all hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <s.icon className="h-[17px] w-[17px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2 CONTACT */}
          <Reveal delay={100}>
            <div className="text-right lg:border-r lg:border-white/10 lg:pr-8">
              <h4 className="font-display text-[17px] font-extrabold">پەیوەندیمان پێوە بکە</h4>
              <ul className="mt-5 space-y-4 text-[13.5px]">
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-white/80" dir="ltr">+964 750 123 4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-white/80" dir="ltr">info@artix.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-white/80">سلێمانی، عێراق</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-white/80">شەممە - پێنجشەممە، 9:00 - 6:00</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* 3 LOCATION MAP */}
          <Reveal delay={180}>
            <div className="text-right lg:border-r lg:border-white/10 lg:pr-8">
              <div className="bg-map-grid relative h-36 overflow-hidden rounded-2xl bg-coal ring-1 ring-white/10">
                {/* roads */}
                <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full" fill="none">
                  <path d="M-10 70 C 40 65, 70 80, 110 60 S 170 50, 220 65" stroke="rgba(255,255,255,0.18)" strokeWidth="5" strokeLinecap="round" />
                  <path d="M60 -10 C 65 30, 55 70, 70 130" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                  <path d="M130 -10 C 125 40, 135 80, 125 130" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                </svg>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute -inset-3 animate-ping rounded-full bg-brand/30" />
                  <MapPin className="relative h-10 w-10 fill-brand text-brand drop-shadow-[0_8px_16px_rgba(255,90,0,0.6)]" />
                </span>
                <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white/80 backdrop-blur">
                  36.19° N, 44.01° E
                </span>
              </div>
              <h4 className="mt-4 font-display text-[16px] font-extrabold">شوێنی ئێمە</h4>
              <p className="mt-1 text-[13px] text-white/55">سلێمانی، عێراق.</p>
              <a href="#home" className="mt-3 inline-flex items-center gap-1.5 px-4 py-4 text-[13px] font-bold text-brand hover:text-brand-light">
                بینین لە نەخشە
                <ArrowLeft className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>

          {/* 4 FORM — leftmost */}
          <Reveal delay={240}>
            <div className="text-right">
              <h4 className="font-display text-[17px] font-extrabold">ناردنی ئێمێڵ بۆ ئەنتیکا</h4>
              {sent ? (
                <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-400 text-charcoal">
                    <Check className="h-6 w-6" strokeWidth={3} />
                  </span>
                  <p className="mt-3 font-display text-[15px] font-bold">سوپاس! پەیامەکەت گەیشت.</p>
                  <p className="mt-1 text-[13px] text-white/60">لەمزووانە وەڵامت دەدەینەوە.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-[13px] font-bold text-brand hover:underline">
                    نامەیەکی تر بنێرە
                  </button>
                </div>
              ) : (
                <form
                  className="mt-5 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (form.name && form.email) setSent(true);
                  }}
                >
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ناو"
                    required
                    className="w-full rounded-full border border-white/10 bg-white/[0.07] px-5 py-3.5 text-right text-[16px] text-white placeholder:text-white/40 outline-none backdrop-blur transition focus:border-brand focus:bg-white/10"
                  />
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ئیمەیل"
                    type="email"
                    required
                    dir="rtl"
                    className="w-full rounded-full border border-white/10 bg-white/[0.07] px-5 py-3.5 text-right text-[16px] text-white placeholder:text-white/40 outline-none backdrop-blur transition focus:border-brand focus:bg-white/10"
                  />
                  <textarea
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    placeholder="پەیامەکەت بنووسە"
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-3.5 text-right text-[16px] text-white placeholder:text-white/40 outline-none backdrop-blur transition focus:border-brand focus:bg-white/10"
                  />
                  <button
                    type="submit"
                    className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-[14.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_16px_32px_-10px_rgba(255,90,0,0.7)]"
                  >
                    ناردن
                    <Send className="h-4 w-4 -scale-x-100" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <div className="flex items-center gap-2 text-[12.5px] font-medium text-white/50">
            <button onClick={() => onNav("services")} className="px-4 py-4 transition hover:text-brand">دیزاین</button>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <button onClick={() => onNav("about")} className="px-4 py-4 transition hover:text-brand">هونەر</button>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <button onClick={() => onNav("contact")} className="px-4 py-4 transition hover:text-brand">ئەندازیاری</button>
          </div>
          <p className="text-[12.5px] text-white/50">© 2026 ANTIKA FACTORY. هەموو مافەکان پارێزراون.</p>
        </div>
      </div>

      {/* back to top */}
      <BackToTop />
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="بگەڕێوە سەرەوە"
      className={`fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-[0_16px_32px_-8px_rgba(255,90,0,0.7)] transition-all duration-500 hover:bg-charcoal ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ 
        bottom: 'max(24px, env(safe-area-inset-bottom))',
        left: 'max(24px, env(safe-area-inset-left))'
      }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ----------------------------------- App ----------------------------------- */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", "works", "services", "about", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-cream font-body text-charcoal">
      <Header active={active} onNav={setActive} />
      <main>
        <Hero />
        <Features />
        <Works />
        <Services />
        <About />
        <Testimonials />
      </main>
      <Footer onNav={setActive} />
    </div>
  );
}

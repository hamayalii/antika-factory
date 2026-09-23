import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { SolutionPage } from "./pages/SolutionPage";
import { solutions } from "./data/solutions";
import { CapsulesPage } from "./pages/CapsulesPage";
import { HousesPage } from "./pages/HousesPage";
import { CategoryOverviewPage } from "./pages/CategoryOverviewPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LightingPage } from "./pages/LightingPage";
import { ShelvesPage } from "./pages/ShelvesPage";
import { KoshkPage } from "./pages/KoshkPage";
import { TrustMarquee } from "./components/TrustMarquee";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  X,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

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
          className={`block font-display text-[18px] font-800 font-extrabold sm:text-[20px] ${dark ? "text-white" : "text-charcoal"
            }`}
          style={{ fontWeight: 800 }}
        >
          کارگەی ئەنتیکا
        </span>
        <span
          className={`mt-1 block text-[10px] font-medium sm:text-[11px] ${dark ? "text-white/60" : "text-charcoal/55"
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
  { id: "home", label: "سەرەکی", path: "/" },
  { id: "products", label: "بەرهەمەکانمان", path: "/#products" },
  { id: "about", label: "دەربارەی ئێمە", path: "/#about" },
  { id: "contact", label: "پەیوەندیمان پێوە بکە", path: "/#contact" },
  { id: "solutions", label: "چارەسەرەکانمان", isDropdown: true },
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const scrollPosition = useRef(0);
  const location = useLocation();

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
    if (!open && !dropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current && !menuButtonRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, dropdownOpen]);

  // Handle cross-page hash scroll
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          onNav(id);
        }
      }, 100);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onNav("home");
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : "shadow-sm"}`} style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo RIGHT (first in RTL) */}
          <Logo />

          {/* Nav center */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              n.isDropdown ? (
                <div key={n.id} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`nav-link flex items-center gap-1 text-[14.5px] font-semibold transition-colors ${location.pathname.includes('/solutions') ? "active" : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {n.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full right-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/5 transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                    <div className="py-2">
                      {solutions.map((s) => (
                        <Link
                          key={s.id}
                          to={`/solutions/${s.id}`}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-brand transition-colors"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.id}
                  to={n.path || "/"}
                  className={`nav-link text-[14.5px] font-semibold transition-colors ${(location.pathname === "/" ? active === n.id : location.pathname === n.path)
                    ? "active"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {n.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA LEFT */}
          <div className="flex items-center gap-2">
            <Link
              to="/#contact"
              className="hidden items-center gap-2 rounded-full bg-brand px-6 py-3 text-[14px] font-bold text-white transition hover:bg-brand-dark sm:inline-flex"
            >
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              aria-label={open ? "داخستنی مێنیو" : "کردنەوەی مێنیو"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-brand hover:text-brand lg:hidden sm:h-12 sm:w-12"
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
          className={`mx-auto max-w-7xl overflow-hidden bg-white shadow-lg transition-all duration-300 lg:hidden ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="flex flex-col p-4">
            {NAV.map((n, i) => (
              n.isDropdown ? (
                <div key={n.id} className="flex flex-col border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between rounded-xl px-5 py-4 text-[15px] font-bold text-gray-700">
                    {n.label}
                    <span className="text-xs text-gray-400">0{i + 1}</span>
                  </div>
                  <div className="flex flex-col pl-4 pr-8 pb-3 space-y-2">
                    {solutions.map((s) => (
                      <Link
                        key={s.id}
                        to={`/solutions/${s.id}`}
                        onClick={() => setOpen(false)}
                        className="text-[14px] text-gray-600 hover:text-brand transition-colors py-2"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={n.id}
                  to={n.path || "/"}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-5 py-4 text-[15px] font-bold transition border-b border-gray-100 last:border-0 ${active === n.id && location.pathname === "/"
                    ? "bg-brand-soft text-brand"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {n.label}
                  <span className="text-xs text-gray-400">0{i + 1}</span>
                </Link>
              )
            ))}
            <Link
              to="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-4 text-[15px] font-bold text-white"
            >
              پەیوەندیمان پێوە بکە
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

/* ---------------------------------- Hero Slider ---------------------------------- */
const HERO_SLIDES = [
  {
    tag: "ئێمە هونەر و مۆدێرنمان بۆ ئێوە تێکەڵ کردووە",
    title: "داهێنان لە دیزاین، وردی لە دروستکردن",
    desc: "پێشکەشکردنی یەکە نیشتەجێبوونە مۆدێرنەکانمان بە ستانداری جیهانی و تێکەڵەیەک لە دیمەنی پانۆرامایی ٢٧٠ پلە، ئەزموونی ژیانێکی زیرەک و سیستەمێکی بەهێز و بەردەوامی بیناسازی.",
    img: "/images/work-capsule.png",
    cta1: "بینینی کارەکانمان",
    cta2: "دەربارەی ئێمە",
  },
  {
    tag: "ئێمە هونەر و مۆدێرنمان بۆ ئێوە تێکەڵ کردووە",
    title: "دیزاینێکی نوێ بۆ شێوازی ژیانێکی نوێ",
    desc: "تێکەڵەیەک لە دیزاینی مۆدێرن و بەکارهێنانی جۆراوجۆر، لە ئۆفیسی سەربەخۆ و ژووری کۆبوونەوەوە تا دەگاتە کافێ و یەکەی گواستراوەی بازرگانی بە بەرزترین کوالێتی.",
    img: "/images/capsule-1.jpg",
    cta1: "خزمەتگوزارییەکان",
    cta2: "پەیوەندی",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const next = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[current];

  return (
    <section
      id="home"
      className="hero-section relative overflow-hidden bg-gray-50 pt-24"
      style={{ scrollMarginTop: '80px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="text-center lg:text-right">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-semibold text-brand">
                {slide.tag}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 font-display font-black leading-[1.2] text-gray-900" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
                {slide.title}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-[17px] font-light leading-relaxed text-gray-600 lg:text-[19px]">
                {slide.desc}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#works"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand-dark w-full sm:w-auto"
                >
                  {slide.cta1}
                  <ArrowLeft className="h-4 w-4" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-[15px] font-bold text-gray-900 transition hover:border-brand hover:text-brand w-full sm:w-auto"
                >
                  {slide.cta2}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Image */}
          <Reveal delay={150} className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={slide.img}
                alt={slide.title}
                className="h-[400px] w-full object-cover sm:h-[500px] lg:h-[600px]"
                width="800"
                height="600"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition ${i === current ? "bg-brand w-8" : "bg-white/50 hover:bg-white"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Use Cases Grid ---------------------------------- */
const USE_CASES = [
  {
    img: "/images/baxcha-cabin.jpg",
    title: "خانووی باخچە",
    desc: "خانووی باخچە بەردەستە بە دیزاینێکی دڵگیر و بۆشاییەکی پێویست بۆ هەڵگرتنی کەل و پەلی باخچەکەت",
  },
  {
    img: "/images/am-k.jpg",
    title: "شوێنی تایبەت بە کۆفی برەیک",
    desc: "کەپسولی AM • K بەردەستە بۆ شوێنێکی سەرنجڕاکێش بۆ حەوانەوە، خواردنەوەی قاوە و وەرگرتنی وزە لە کاتی ماندوێتی کاردا",
  },
  {
    img: "/images/am-t.jpg",
    title: "ژووری کۆڕ و کۆبوونەوەکان",
    desc: "کەپسولی AM • T بەردەستە بۆ ژینگەیەکی بێدەنگکراو (Acoustic) و تایبەت بۆ ئەنجامدانی کۆبوونەوە و گفتوگۆ گرنگەکانت بەبێ تێکچوونی تەرکیز",
  },
  {
    img: "/images/am-g.jpg",
    title: "ناوەندی خاڵی فرۆشتن",
    desc: "کەپسولی AM • G بە دیزاینێکی مۆدێرنی بازرگانی بەردەستە بۆ نمایشکردن و فرۆشتنی ڕاستەوخۆی بەرهەمەکانت بە شێوازێک کە سەرنجی موشتەری ڕابکێشێت",
  },
  {
    img: "/images/watch-cabin.jpg",
    title: "یەکەی چاودێری",
    desc: "کەپسولی چاودێری AS بەردەستە بە دیزاینێکی مۆدێرنی و گونجاو بۆ یەکەکانی چاودێری",
  },
  {
    img: "/images/al-8.jpg",
    title: "کەپسولی یەکەی نیشتەجێبوون",
    desc: "کەپسولی AL • 8 بە دیزاینێکی مۆدێرنی جوان بەردەستە بۆ بۆ بەسەربردنی کاتێکی ئارام و خەوێکی قووڵ",
  },
];

function UseCases() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            بەرهەمەکانمان لە کوێ بەکارئەهێنرێت؟
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            گونجاو بۆ هەر پڕۆژەیەک کە لە خەیاڵتایە!
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 100}>
              <div className="group overflow-hidden rounded-xl bg-gray-50 shadow-sm transition hover:shadow-md">
                <div className="zoom-img relative h-48 overflow-hidden sm:h-56">
                  <img
                    src={uc.img}
                    alt={uc.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <div className="absolute inset-0 bg-brand/0 transition group-hover:bg-brand/20" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[18px] font-bold text-gray-900">{uc.title}</h3>
                  <p className="mt-2 text-[14px] text-gray-600">{uc.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-8 py-3.5 text-[14px] font-bold text-gray-900 transition hover:border-brand hover:text-brand"
          >
            هەموو ببینە
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Products Grid (بەرهەمەکانمان) ---------------------------------- */
type Work = {
  id: string;
  cat: string;
  img: string;
  title: string;
  desc: string;
  tag: string;
  link: string;
};

const WORKS: Work[] = [
  {
    id: "capsule",
    cat: "کەپسولە مۆدولارەکان",
    img: "/images/work-capsule.png",
    title: "کەپسولەکان",
    desc: "کەپسولە مۆدێرن و پێشکەوتووەکان بۆ نیشتەجێبوون، ئیش و کار، و خزمەتگوزاری لە زنجیرەکانی AL, AM, AS",
    tag: "٣ زنجیرە • ١٦+ مۆدێل",
    link: "/products/capsules",
  },
  {
    id: "houses",
    cat: "خانووە مۆدولارەکان",
    img: "/images/container-cabin-2.jpg",
    title: "خانوو",
    desc: "خانووی حاویە، خانووی ئاسایی، خانووی باخچە، خانووی کوخ و خانووی کۆنکریت بە دیزاینی ئەندازیاری و کوالێتی بەرز",
    tag: "٥ جۆری سەرەکی",
    link: "/products/houses",
  },
  {
    id: "koshk",
    cat: "کۆشکی بازرگانی",
    img: "/images/am-k.jpg",
    title: "کۆشکەکان",
    desc: "کۆشکی بازرگانی KA بۆ فرۆشگا، پارک، نیشتەجێبوون و بەکارهێنانی بازرگانی بە مۆدێلی جیاواز",
    tag: "KA • ٤ مۆدێل",
    link: "/products/koshk",
  },
  {
    id: "light",
    cat: "لایتی ڕووناکی",
    img: "/images/work-lighting.jpg",
    title: "ڕووناکی",
    desc: "تێکەڵەیەک لە جوانیی سروشت و دیزاینی مۆدێرن بە شێوەیەکی بێهاوتا",
    tag: "کوالێتی بەرز • قەبارەی جیاواز",
    link: "/products/lighting",
  },
  {
    id: "shelf",
    cat: "ڕەفەکان",
    img: "/images/work-shelves.jpg",
    title: "ڕەفەکان",
    desc: "ڕێکخستنێکی نموونەیی و پێدانی جوانییەکی تایبەت بە دیزاینی ناوەوە",
    tag: "جێگیر • سەلامەت",
    link: "/products/shelves",
  },
];

function Works() {
  return (
    <section id="products" className="relative bg-gray-50 py-16 sm:py-24" style={{ scrollMarginTop: '80px' }}>
      <span id="works" className="absolute -top-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            بەرهەمەکانمان
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            دروستکردنی ژینگەیەکی هونەری و مۆدێرن
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-gray-600">
            لە کەپسولە مۆدولارەکان، خانوو و کۆشکی بازرگانی تا دەگاتە نەخشەسازیی لایتی ڕووناکی و ڕەفەکان، هەموو وردەکارییەک بەوپەڕی داهێنان و شارەزایی ئەندازیارییەوە جێبەجێ دەکەین
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((w, i) => (
            <Reveal key={w.id} delay={i * 100}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg flex flex-col h-full">
                <Link to={w.link} className="zoom-img relative h-60 overflow-hidden block">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-gray-900 backdrop-blur">
                    {w.tag}
                  </span>
                </Link>
                <div className="p-5 flex flex-col flex-1 justify-between text-right">
                  <div>
                    <h3 className="font-display text-[18px] font-bold text-gray-900">
                      <Link to={w.link} className="hover:text-brand transition">
                        {w.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[13.5px] text-gray-600 leading-relaxed">{w.desc}</p>
                  </div>
                  <Link
                    to={w.link}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition hover:text-brand-dark"
                  >
                    زیاتر بزانە
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <Link
            to="/products/capsules"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-[14px] font-bold text-gray-900 transition hover:border-brand hover:text-brand shadow-sm"
          >
            بینینی سەرجەم بەرهەمەکانمان
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- About ---------------------------------- */
function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24" style={{ scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Text RIGHT */}
          <div className="order-1 lg:order-2 w-full text-right">
            <div className="text-right inline-block w-full">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-bold text-brand">
                  <Sparkles className="h-4 w-4" />
                  دەربارەی ئێمە
                </span>
                <h2 className="mt-5 font-display text-[32px] font-black leading-[1.3] text-gray-900 sm:text-[42px] text-right">
                  کارگەیەک کە هونەر
                  <br />
                  دەکاتە <span className="text-brand">ژیان</span>
                </h2>
                <p className="mt-5 text-[15px] font-light leading-8 text-gray-600 text-right">
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
                    <li key={t} className="flex items-center gap-3 text-[14.5px] font-semibold text-gray-700">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={250}>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-7">
                  {[
                    { v: "+300", l: "پرۆژەی تەواو" },
                    { v: "20", l: "ساڵ ئەزموون" },
                    { v: "100%", l: "ڕەزامەندی" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-display text-[26px] font-black text-gray-900 sm:text-[32px]">
                        {s.v}
                      </div>
                      <div className="mt-1 text-[12.5px] font-medium text-gray-500">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[14.5px] font-bold text-white transition hover:bg-brand-dark"
                  >
                    پەیوەندیمان پێوە بکە
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
          {/* Images LEFT */}
          <Reveal className="order-2 lg:order-2">
            <div className="relative">
              <div className="zoom-img overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/images/studio-about.jpg"
                  alt="ستۆدیۆی ANTIKA FACTORY"
                  className="h-[400px] w-full object-cover sm:h-[500px]"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-brand px-6 py-4 text-white shadow-xl sm:block">
                <div className="font-display text-[32px] font-black leading-none">
                  +300
                </div>
                <div className="text-[12px] font-medium text-white/80">
                  پرۆژەی سەرکەوتوو
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Process ---------------------------------- */
const PROCESS_STEPS = [
  {
    n: "01",
    title: "ڕاوێژکردن",
    desc: "پەیوەندی بکە و داواکاریەکەت بڵێ بۆ دیزاین",
  },
  {
    n: "02",
    title: "دیزاین",
    desc: "دیزاینی تایبەت و پلانێکی وردبینی بۆ پرۆژەکەت",
  },
  {
    n: "03",
    title: "بەرهەمهێنان",
    desc: "دروستکردن لە کارگەی خۆمان بە کوالێتی بەرز",
  },
  {
    n: "04",
    title: "دابەشکردن",
    desc: "گەیاندن و دابەشکردن لە کاتی دیاریکراودا",
  },
];

function Process() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[14px] font-bold text-brand">
            <span className="h-[2px] w-6 rounded bg-brand" />
            پرۆسەکەمان
            <span className="h-[2px] w-6 rounded bg-brand" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display font-black leading-[1.3] text-gray-900" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            ٤ قۆناغی سادە
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand text-white font-display text-2xl font-black">
                  {step.n}
                </div>
                <h3 className="font-display text-[18px] font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-[14px] text-gray-600">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Why Choose Us ---------------------------------- */
function WhyChooseUs() {
  return null;
}

function Capabilities() {
  return null;
}

/* ---------------------------------- Contact CTA Band ---------------------------------- */
function ContactCTA() {
  return (
    <section className="bg-brand py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-[32px] font-black leading-[1.3] text-white sm:text-[42px]">
            ئامادەیت پرۆژەکەت دەست پێ بکەین؟
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-white/90">
            پەیوەندی بکە بە ئێمەوە بۆ راوێژپێکردن و قەنەخەدە
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+9647501234567"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-brand transition hover:bg-gray-100"
            >
              <PhoneCall className="h-5 w-5" />
              <span dir="ltr">+964 750 123 4567</span>
            </a>
            <a
              href="mailto:info@antika-factory.com"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 text-[15px] font-bold text-white transition hover:bg-white/10"
            >
              <Mail className="h-5 w-5" />
              info@antika-factory.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Footer ---------------------------------- */
function Footer({ onNav: _onNav }: { onNav?: (id: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  return (
    <footer id="contact" className="bg-gray-900 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 lg:grid-cols-4 lg:gap-8">
          {/* 1 BRAND */}
          <Reveal>
            <div className="text-right">
              <Logo dark />
              <p className="mt-5 max-w-[260px] text-[13.5px] font-light leading-7 text-gray-400">
                ئەنتیکا، تێکەڵەیەک لە هونەر و تەلارسازیی هاوچەرخ
              </p>
              <div className="mt-6">
                <p className="text-[13px] font-bold text-gray-300">ئێمە لە سۆشیال میدیا</p>
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
                      className="grid h-11 w-11 place-items-center rounded-full border border-gray-700 text-gray-400 transition hover:border-brand hover:bg-brand hover:text-white"
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
            <div className="text-right">
              <h4 className="font-display text-[17px] font-extrabold">پەیوەندیمان پێوە بکە</h4>
              <ul className="mt-5 space-y-4 text-[13.5px]">
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400" dir="ltr">+964 750 123 4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400" dir="ltr">info@antika-factory.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400">سلێمانی، عێراق</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-gray-400">شەممە - پێنجشەممە، 9:00 - 6:00</span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* 3 NAVIGATION */}
          <Reveal delay={180}>
            <div className="text-right">
              <h4 className="font-display text-[16px] font-extrabold">بەستەرەکان</h4>
              <ul className="mt-5 space-y-3 text-[13.5px]">
                {NAV.filter(n => !n.isDropdown).map((n) => (
                  <li key={n.id}>
                    <Link
                      to={n.path || "/"}
                      className="text-gray-400 transition hover:text-brand"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* 4 CONTACT FORM */}
          <Reveal delay={220}>
            <div className="text-right">
              <h4 className="font-display text-[16px] font-extrabold">نامە بنێرە</h4>
              {sent ? (
                <div className="mt-5 rounded-xl bg-brand/20 p-6 text-center">
                  <p className="text-[14px] font-bold text-brand">سوپاس! نامەکەت گەیشت.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                    setTimeout(() => setSent(false), 3000);
                  }}
                  className="mt-5 space-y-3"
                >
                  <input
                    type="text"
                    placeholder="ناو"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="ئیمەیڵ"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none"
                    required
                  />
                  <textarea
                    placeholder="نامەکەت"
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-[13px] text-white placeholder:text-gray-500 transition focus:border-brand focus:outline-none resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-[14.5px] font-bold text-white transition hover:bg-brand-dark"
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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 py-6 sm:flex-row">
          <div className="flex items-center gap-2 text-[12.5px] font-medium text-gray-500">
            <Link to="/#works" className="px-4 py-4 transition hover:text-brand">دیزاین</Link>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <Link to="/#about" className="px-4 py-4 transition hover:text-brand">هونەر</Link>
            <span className="h-1 w-1 rounded-full bg-gray-700" />
            <Link to="/#contact" className="px-4 py-4 transition hover:text-brand">ئەندازیاری</Link>
          </div>
          <p className="text-[12.5px] text-gray-500">© 2026 ANTIKA FACTORY. هەموو مافەکان پارێزراون.</p>
        </div>
      </div>

      {/* Floating Actions */}
      <FloatingActions />
      <BackToTop />
    </footer>
  );
}

/* ---------------------------------- Floating Actions ---------------------------------- */
function FloatingActions() {
  return (
    <div className="fixed bottom-24 left-6 z-40 flex flex-col gap-3 sm:bottom-24 sm:left-6" style={{
      left: 'max(24px, env(safe-area-inset-left))',
      bottom: 'max(100px, env(safe-area-inset-bottom))'
    }}>
      <a
        href="https://wa.me/9647501234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href="tel:+9647501234567"
        aria-label="Call"
        className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <PhoneCall className="h-5 w-5" />
      </a>
      <a
        href="mailto:info@antika-factory.com"
        aria-label="Email"
        className="grid h-12 w-12 place-items-center rounded-full bg-gray-700 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <Mail className="h-5 w-5" />
      </a>
    </div>
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
      className={`fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gray-700 text-white shadow-lg transition-all duration-300 hover:bg-gray-600 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
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

/* ----------------------------------- HomePage ----------------------------------- */
function HomePage() {
  return (
    <>
      <Hero />
      <UseCases />
      <Works />
      <TrustMarquee />
      <About />
      <Process />
      <WhyChooseUs />
      <Capabilities />
      <ContactCTA />
    </>
  );
}

/* ----------------------------------- App ----------------------------------- */
function AppContent() {
  const [active, setActive] = useState("home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    const ids = ["home", "products", "works", "about", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id === "works" ? "products" : e.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  return (
    <div dir="rtl" className="min-h-screen bg-white font-body text-gray-900 flex flex-col">
      <Header active={active} onNav={setActive} />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions/:id" element={<SolutionPage />} />

          {/* Product and Category pages */}
          <Route path="/products/capsules" element={<CapsulesPage />} />
          <Route path="/products/houses" element={<HousesPage />} />
          <Route path="/products/koshk" element={<KoshkPage />} />
          <Route path="/what-we-do" element={<CapsulesPage />} />
          <Route path="/products" element={<CapsulesPage />} />
          <Route path="/products/lighting" element={<LightingPage />} />
          <Route path="/products/shelves" element={<ShelvesPage />} />
          <Route path="/products/category/:categorySlug" element={<CategoryOverviewPage />} />
          <Route path="/products/am" element={<CategoryOverviewPage />} />
          <Route path="/products/as" element={<CategoryOverviewPage />} />
          <Route path="/products/al" element={<CategoryOverviewPage />} />
          <Route path="/products/container-house" element={<CategoryOverviewPage />} />
          <Route path="/products/standard-house" element={<CategoryOverviewPage />} />
          <Route path="/products/garden-house" element={<CategoryOverviewPage />} />
          <Route path="/products/cabin-house" element={<CategoryOverviewPage />} />
          <Route path="/products/concrete-house" element={<CategoryOverviewPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <Footer onNav={setActive} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

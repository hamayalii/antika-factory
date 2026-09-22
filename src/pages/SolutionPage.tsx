import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Users,
  Sparkles,
  Layers,
  MessageCircle,
  PhoneCall,
  Mail,
  ShieldCheck,
  ChevronLeft,
  Home
} from "lucide-react";
import { solutions } from "../data/solutions";
import { getProductBySlug, getCategoryBySlug, VerifiedProduct, ProductCategory } from "../data/productData";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";

export function SolutionPage() {
  const { id } = useParams<{ id: string }>();
  const solution = solutions.find((s) => s.id === id);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  // Get matching products and categories
  const recommendedProducts: VerifiedProduct[] = (solution.recommendedProductSlugs || [])
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is VerifiedProduct => !!p);

  const recommendedCategories: ProductCategory[] = (solution.recommendedCategorySlugs || [])
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is ProductCategory => !!c);

  return (
    <div className="bg-gray-50 pt-24 min-h-screen text-right">
      <SEO
        title={`${solution.title} (${solution.kurdishTitle}) | ئەنتیکا فاکتۆری`}
        description={solution.description}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="ڕێڕەوی پەڕەکان" className="border-b border-gray-200 bg-white py-3.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-[13px] text-gray-500">
            <li className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-1.5 transition hover:text-brand">
                <Home className="h-3.5 w-3.5" />
                <span>سەرەکی</span>
              </Link>
              <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-600">چارەسەرەکانمان</span>
              <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
            </li>
            <li className="font-bold text-gray-900" aria-current="page">
              {solution.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-right">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-semibold text-brand">
                  <Sparkles className="h-4 w-4" />
                  چارەسەرەکانی ئەنتیکا فاکتۆری
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h1
                  className="mt-6 font-display font-black leading-[1.2] text-gray-900"
                  style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
                >
                  {solution.kurdishTitle} <span className="text-brand">/</span> {solution.title}
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-5 text-[16px] sm:text-[18px] font-light leading-relaxed text-gray-600">
                  {solution.description}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <a
                    href="https://wa.me/9647501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-brand-dark w-full sm:w-auto shadow-md"
                  >
                    داواکردنی ڕاوێژ
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                  <Link
                    to="/products/capsules"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-[15px] font-bold text-gray-900 transition hover:border-brand hover:text-brand w-full sm:w-auto"
                  >
                    بینینی هەموو کەپسولەکان
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src={solution.heroImage}
                  alt={solution.kurdishTitle}
                  className="h-[380px] w-full object-cover sm:h-[480px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-gray-900 backdrop-blur shadow">
                  {solution.title}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Target Audience & Benefits Sections */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Suitable For / ئەم چارەسەرە بۆ کێ گونجاوە؟ */}
            <Reveal delay={100}>
              <div className="rounded-2xl bg-white p-7 sm:p-9 shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Users className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-brand block">کڕیار و بەکارهێنەران</span>
                    <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900">
                      ئەم چارەسەرە بۆ کێ گونجاوە؟
                    </h2>
                  </div>
                </div>

                <p className="text-[14.5px] text-gray-600 mb-6 leading-relaxed font-light">
                  دیزاین و تەلارسازی ئەم جۆرە کەپسولە بە تایبەتی لەگەڵ ئەم جۆرە پڕۆژە و خواستانەدا دەگونجێت:
                </p>

                <ul className="space-y-3.5 flex-1">
                  {(solution.suitableForKu || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[14.5px] text-gray-700 leading-relaxed">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Benefits / سوودەکانی ئەم چارەسەرە چییە؟ */}
            <Reveal delay={200}>
              <div className="rounded-2xl bg-white p-7 sm:p-9 shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-emerald-600 block">بایەخ و تایبەتمەندی</span>
                    <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900">
                      سوودە سەرەکییەکانی ئەم چارەسەرە
                    </h2>
                  </div>
                </div>

                <p className="text-[14.5px] text-gray-600 mb-6 leading-relaxed font-light">
                  گرنگترین ئەو سوود و تایبەتمەندییانەی کە ئەم کەپسولە بۆ پڕۆژەکەت یان شوێنەکەت فەراهەمی دەکات:
                </p>

                <ul className="space-y-3.5 flex-1">
                  {(solution.benefitsKu || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[14.5px] text-gray-700 leading-relaxed">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Recommended Capsule Types & Models / جۆری کەپسولەکان بۆ ئەم چارەسەرە */}
      {(recommendedCategories.length > 0 || recommendedProducts.length > 0) && (
        <section className="bg-white py-16 sm:py-24 border-y border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand">
                <span className="h-[2px] w-5 rounded bg-brand" />
                جۆری کەپسولەکان بۆ ئەم چارەسەرە
                <span className="h-[2px] w-5 rounded bg-brand" />
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-gray-900">
                پۆلێن و مۆدێلە پێشنیارکراوەکانی ئەنتیکا
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[14.5px] text-gray-600">
                ئەم کەپسول و مۆدێلانە دیزاین کراون بۆ ئەوەی باشترین ئەنجام لەم بوارەدا پێشکەش بکەن:
              </p>
            </Reveal>

            {/* Category tags */}
            {recommendedCategories.length > 0 && (
              <Reveal delay={100} className="mb-10">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="text-xs font-bold text-gray-500">پۆلێنە پەیوەندیدارەکان:</span>
                  {recommendedCategories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/products/${c.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-800 hover:bg-brand-soft hover:text-brand transition shadow-sm"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      {c.titleKu}
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Product Cards */}
            {recommendedProducts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedProducts.map((p, idx) => (
                  <Reveal key={p.id} delay={idx * 70}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand">
              <span className="h-[2px] w-5 rounded bg-brand" />
              تایبەتمەندییەکان
              <span className="h-[2px] w-5 rounded bg-brand" />
            </span>
            <h2 className="mt-3 font-display font-black leading-[1.3] text-gray-900 text-2xl sm:text-3xl">
              تایبەتمەندییە ئەندازیاری و دیزاینەکان
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solution.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 90}>
                <div className="rounded-2xl bg-white p-6 h-full border border-gray-100 hover:border-brand hover:shadow-md transition">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-gray-600">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white py-16 sm:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand">
              <span className="h-[2px] w-5 rounded bg-brand" />
              نموونەی کار
              <span className="h-[2px] w-5 rounded bg-brand" />
            </span>
            <h2 className="mt-3 font-display font-black leading-[1.3] text-gray-900 text-2xl sm:text-3xl">
              وێنە و جێبەجێکردنی ئەم چارەسەرە
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {solution.images.map((img, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                  <img
                    src={img}
                    alt={`${solution.kurdishTitle} ${i + 1}`}
                    className="w-full h-[320px] object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Idea Banner / ئایا بیرۆکەیەکی جیاوازت هەیە؟ */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 text-white shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-4 py-1.5 text-xs font-bold text-amber-300 mb-4 border border-brand/30">
                  💡 دیزاینی تایبەت بەپێی خواست
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black leading-snug">
                  ئایا بیرۆکەیەکی جیاوازت هەیە؟
                </h3>
                <p className="mt-3 text-[15px] sm:text-[16px] text-gray-300 leading-relaxed font-light">
                  ئەگەر ئەو چارەسەرەی بەدوایدا دەگەڕێیت لەم لیستەدا نییە، یان پێویستت بە قەبارە، دیزاین و فەزایەکی تایبەتە بۆ پڕۆژەکەت، پەیوەندیمان پێوە بکە و ئەندازیارەکانمان ڕێک بەپێی خواستی خۆت بۆت دروست دەکەن!
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/9647501234567?text=سڵاو،%20بیرۆکەیەکی%20تایبەتم%20هەیە%20بۆ%20دروستکردنی%20کەپسول"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[14.5px] font-bold text-white shadow hover:bg-brand-dark transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    پەیوەندی لە واتسئاپ
                  </a>
                  <a
                    href="tel:+9647501234567"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-600 bg-white/10 px-7 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/20 transition"
                  >
                    <PhoneCall className="h-4 w-4" />
                    پەیوەندی تەلەفۆنی
                  </a>
                </div>
              </div>
              {/* Decorative light */}
              <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-brand py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black">
              دەتەوێت ئەم چارەسەرە بۆ پڕۆژەکەت یان شوێنەکەت داوا بکەیت؟
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              پەیوەندیمان پێوە بکە بۆ زانینی نرخ، پێوانە و دیزاینی گونجاو لەگەڵ پێداویستییەکانت.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/9647501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-bold text-brand shadow hover:bg-gray-100 transition w-full sm:w-auto justify-center"
              >
                <MessageCircle className="h-4 w-4" />
                واتسئاپ: <span dir="ltr">+964 750 123 4567</span>
              </a>

              <a
                href="tel:+9647501234567"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/10 transition w-full sm:w-auto justify-center"
              >
                <PhoneCall className="h-4 w-4" />
                پەیوەندی تەلەفۆنی
              </a>

              <a
                href="mailto:info@antika-factory.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/10 transition w-full sm:w-auto justify-center"
              >
                <Mail className="h-4 w-4" />
                info@antika-factory.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

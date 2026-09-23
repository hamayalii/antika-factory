import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, ChevronLeft, Layers, MessageCircle, PhoneCall, Mail, HelpCircle } from "lucide-react";
import { getCategoryBySlug, getProductsByCategory, isHouseCategory, isKoshkCategory } from "../data/productData";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";

export function CategoryOverviewPage() {
  // Support /products/category/:categorySlug (dynamic) and hardcoded /products/:slug category routes
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const location = useLocation();
  // Derive slug: prefer explicit :categorySlug param, otherwise use last path segment
  const derivedSlug = categorySlug ?? location.pathname.split("/").filter(Boolean).pop();
  const category = derivedSlug ? getCategoryBySlug(derivedSlug) : undefined;
  const products = category ? getProductsByCategory(category.id) : [];

  const parentLink = category && isKoshkCategory(category.id)
    ? "/products/koshk"
    : category && isHouseCategory(category.id)
    ? "/products/houses"
    : "/products/capsules";

  const parentTitle = category && isKoshkCategory(category.id)
    ? "کۆشکەکان"
    : category && isHouseCategory(category.id)
    ? "خانوو"
    : "کەپسولەکان";

  const parentAllTitle = category && isKoshkCategory(category.id)
    ? "بینینی سەرجەم کۆشکەکان"
    : category && isHouseCategory(category.id)
    ? "بینینی سەرجەم خانووەکان"
    : "بینینی سەرجەم کەپسولەکان";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [derivedSlug]);

  if (!category) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-24 text-center text-right">
        <SEO
          title="پۆلێن نەدۆزرایەوە | ئەنتیکا فاکتۆری"
          description="ئەم بەشەی بەرهەمەکان بوونی نییە یان گوێزراوەتەوە."
        />
        <div className="max-w-md mx-auto">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand mb-6">
            <HelpCircle className="h-8 w-8" />
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            پۆلێن نەدۆزرایەوە
          </h1>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            ببورە، ئەو پۆلێنەی داوات کردووە نەدۆزرایەوە. دەتوانیت سەرجەم بەرهەمەکانی تر لە بەشی کەپسولەکان یان خانوو ببینیت.
          </p>
          <Link
            to="/products/capsules"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark shadow-md"
          >
            گەڕانەوە بۆ کەپسولەکان
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pt-24 min-h-screen text-right">
      <SEO
        title={`${category.titleKu} | ئەنتیکا فاکتۆری`}
        description={category.shortDescriptionKu}
        canonical={`https://antika-factory.netlify.app/products/${category.slug}`}
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
              <Link
                to={parentLink}
                className="transition hover:text-brand"
              >
                {parentTitle}
              </Link>
              <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
            </li>
            <li className="font-bold text-gray-900" aria-current="page">
              {category.titleKu}
            </li>
          </ol>
        </div>
      </nav>

      {/* Category Hero */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1.5 text-[12.5px] font-bold text-brand">
                    <Layers className="h-3.5 w-3.5" />
                    پۆلێنی بەرهەم
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    {category.titleEn}
                  </span>
                </div>
                <h1
                  className="font-display font-black leading-[1.25] text-gray-900"
                  style={{ fontSize: "clamp(28px, 5vw, 46px)" }}
                >
                  {category.titleKu}
                </h1>
                <p className="mt-5 text-[16px] sm:text-[17px] font-light leading-relaxed text-gray-600">
                  {category.descriptionKu}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="https://wa.me/9647501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[14px] font-bold text-white shadow-md transition hover:bg-brand-dark"
                  >
                    <MessageCircle className="h-4 w-4" />
                    داوای نرخ بکە
                  </a>
                  <Link
                    to={parentLink}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3.5 text-[14px] font-bold text-gray-800 transition hover:border-brand hover:text-brand"
                  >
                    {parentAllTitle}
                  </Link>
                </div>
              </Reveal>
            </div>

            {category.image && (
              <div className="lg:col-span-5">
                <Reveal delay={150}>
                  <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-lg border border-gray-100">
                    <img
                      src={category.image}
                      alt={category.titleKu}
                      className="h-[320px] sm:h-[380px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand">
              <span className="h-[2px] w-5 rounded bg-brand" />
              مۆدێلە بەردەستەکان ({products.length})
              <span className="h-[2px] w-5 rounded bg-brand" />
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-gray-900">
              سەرجەم مۆدێلەکانی {category.titleKu}
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-brand py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black">
              پێویستیت بە دیزاینی تایبەتە لە {category.titleKu}؟
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              پەیوەندیمان پێوە بکە بۆ گفتوگۆکردنی پێداویستییەکانی پڕۆژەکەت و دابینکردنی مۆدێلی گونجاو.
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

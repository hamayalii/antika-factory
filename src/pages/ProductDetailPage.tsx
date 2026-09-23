import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  Home,
  PhoneCall,
  MessageCircle,
  Mail,
  Ruler,
  Sparkles,
  Maximize2,
  X,
  ChevronRight,
  HelpCircle,
  Building2,
  Hash,
  Square,
  Clock,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts, getCategoryBySlug, isHouseProduct, isKoshkProduct } from "../data/productData";
import { ProductCard } from "../components/ProductCard";
import { VerificationPlaceholder } from "../components/VerificationPlaceholder";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const category = product ? getCategoryBySlug(product.categoryId) : undefined;

  const sectionLink = product && isKoshkProduct(product)
    ? "/products/koshk"
    : product && isHouseProduct(product)
      ? "/products/houses"
      : "/products/capsules";

  const sectionTitle = product && isKoshkProduct(product)
    ? "کۆشکەکان"
    : product && isHouseProduct(product)
      ? "خانوو"
      : "کەپسولەکان";

  const sectionAllTitle = product && isKoshkProduct(product)
    ? "بینینی سەرجەم کۆشکەکان"
    : product && isHouseProduct(product)
      ? "بینینی سەرجەم جۆرەکانی خانوو"
      : "بینینی سەرجەم کەپسولەکان";

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImageIndex(0);
    setLightboxOpen(false);
  }, [slug]);

  // Handle lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen || !product || product.images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev + 1) % product.images.length);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, product]);

  // 404 state if product slug is invalid
  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-24 text-center text-right">
        <SEO
          title="بەرهەم نەدۆزرایەوە | ئەنتیکا فاکتۆری"
          description="ئەو بەرهەمەی داوات کردووە بوونی نییە یان سڕدراوەتەوە."
        />
        <div className="max-w-md mx-auto">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand mb-6">
            <HelpCircle className="h-8 w-8" />
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            بەرهەم نەدۆزرایەوە
          </h1>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            ببورە، ئەو پەڕەیەی بەدوایدا دەگەڕێیت نەدۆزرایەوە. دەتوانیت سەرجەم بەرهەمەکان لە بەشی "ئەو کارانەی کە دەیکەین"دا ببینیت.
          </p>
          <Link
            to="/what-we-do"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[14px] font-bold text-white transition hover:bg-brand-dark shadow-md"
          >
            گەڕانەوە بۆ ئەو کارانەی کە دەیکەین
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug, 3);
  const currentImage = product.images[activeImageIndex] || "/images/capsule-1.jpg";

  return (
    <div className="bg-gray-50 pt-24 min-h-screen text-right">
      <SEO
        title={`${product.titleKu} | ئەنتیکا فاکتۆری`}
        description={`${product.titleKu} لە پۆلێنی ${product.categoryTitleKu}ی کارگەی ئەنتیکا فاکتۆرییە. بۆ زانیاریی پێوانە و داوای نرخ، سەیری پەڕەی بەرهەم بکە.`}
        canonical={`https://antika-factory.netlify.app/products/${product.slug}`}
        image={currentImage}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="ڕێڕەوی پەڕەکان" className="border-b border-gray-200 bg-white py-3.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-[13px] text-gray-500 flex-wrap">
            <li className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-1.5 transition hover:text-brand">
                <Home className="h-3.5 w-3.5" />
                <span>سەرەکی</span>
              </Link>
              <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
            </li>
            <li className="flex items-center gap-2">
              <Link
                to={sectionLink}
                className="transition hover:text-brand"
              >
                {sectionTitle}
              </Link>
              <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
            </li>
            {category && (
              <li className="flex items-center gap-2">
                <Link to={`/products/${category.slug}`} className="transition hover:text-brand">
                  {category.titleKu}
                </Link>
                <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
              </li>
            )}
            <li className="font-bold text-gray-900" aria-current="page">
              {product.titleKu}
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">

            {/* Text Content */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Reveal>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Link
                    to={`/products/${product.categoryId}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3.5 py-1.5 text-[12.5px] font-bold text-brand transition hover:bg-brand-soft/80"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {product.categoryTitleKu}
                  </Link>

                  {product.productFamilyKu && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {product.productFamilyKu}
                    </span>
                  )}

                  <span className="text-xs font-semibold text-gray-400">
                    {product.titleEn}
                  </span>

                  {product.isComingSoon && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-300 px-3 py-1 text-[12.5px] font-bold text-amber-800 shadow-sm">
                      <Clock className="h-3.5 w-3.5 text-amber-600" />
                      بەم زووانە بەردەست ئەبێت..!
                    </span>
                  )}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1
                  className="font-display font-black leading-[1.25] text-gray-900"
                  style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
                >
                  {product.titleKu}
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-5 text-[16px] sm:text-[17px] font-light leading-relaxed text-gray-600">
                  {product.shortDescriptionKu}
                </p>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={260}>
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href={`https://wa.me/9647501234567?text=${encodeURIComponent(`سڵاو، دەربارەی ${product.titleKu} لە ئەنتیکا فاکتۆری دەپرسم:`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[14.5px] font-bold text-white shadow-md transition hover:bg-brand-dark hover:shadow-lg"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {product.cta.primaryKu}
                  </a>

                  <a
                    href="tel:+9647501234567"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-7 py-3.5 text-[14.5px] font-bold text-gray-800 transition hover:border-brand hover:text-brand"
                  >
                    <PhoneCall className="h-4 w-4" />
                    {product.cta.secondaryKu}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Product Image */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <Reveal delay={120}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={currentImage}
                      alt={`${product.titleKu} - ئەنتیکا فاکتۆری`}
                      className="h-full w-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                      onClick={() => setLightboxOpen(true)}
                    />

                    {/* Coming Soon Overlay Badge on Image
                    {product.isComingSoon && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <div className="flex flex-col items-center gap-3">
                          <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 text-white px-6 py-3 text-[16px] font-black shadow-2xl border border-white/40 tracking-wide backdrop-blur-sm">
                            <Clock className="h-5 w-5" />
                            بەم زووانە بەردەست ئەبێت..!
                          </span>
                        </div>
                      </div>
                    )} */}

                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/80 transition"
                      aria-label="گەورەکردنی وێنە"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      گەورەکردن
                    </button>
                  </div>

                  {/* Thumbnails if multiple */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2.5 p-3 bg-gray-50/80 border-t border-gray-100 overflow-x-auto">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${activeImageIndex === idx
                            ? "border-brand ring-2 ring-brand/30"
                            : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                          aria-label={`پیشاندانی وێنەی ${idx + 1}`}
                        >
                          <img
                            src={img}
                            alt={`${product.titleKu} وێنەی ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Verified Specifications Grid */}
      <section className="bg-white py-14 sm:py-20 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand">
              <span className="h-[2px] w-5 rounded bg-brand" />
              زانیاری و پێوانەی بەرهەمەکە
              <span className="h-[2px] w-5 rounded bg-brand" />
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-gray-900">
              تایبەتمەندییە پشتڕاستکراوەکان
            </h2>
          </Reveal>

          {/* Coming soon notice banner */}
          {product.isComingSoon && (
            <div className="max-w-3xl mx-auto mb-8 rounded-2xl bg-amber-50 border-2 border-amber-300 p-5 text-right flex items-center gap-4 shadow-sm">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-500 text-white shadow-md">
                <Clock className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-[16px] font-extrabold text-amber-900">
                  بەم زووانە بەردەست ئەبێت..!
                </h3>
                <p className="text-[13.5px] text-amber-800 mt-1 leading-relaxed">
                  ئەم بەرهەمە لە قۆناغی ئامادەکاری و دیزایندایە و بەم زووانە بەردەست دەبێت. بۆ داواکاری پێشوەختە پەیوەندیمان پێوە بکە.
                </p>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto rounded-2xl bg-gray-50 border border-gray-200/80 overflow-hidden shadow-sm">
            <dl className="divide-y divide-gray-200/70">
              {/* Coming Soon status in specification list */}
              {product.isComingSoon && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-amber-50/80 border-b border-amber-200">
                  <dt className="text-[14px] font-bold text-amber-900 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                    دۆخی بەرهەم
                  </dt>
                  <dd className="sm:col-span-2 text-[14.5px] font-bold text-amber-800 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    بەم زووانە بەردەست ئەبێت..!
                  </dd>
                </div>
              )}

              {/* Product Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-white">
                <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-brand shrink-0" />
                  جۆری بەرهەم
                </dt>
                <dd className="sm:col-span-2 text-[14.5px] text-gray-700 font-medium">
                  {product.categoryTitleKu}
                </dd>
              </div>

              {/* Model Code */}
              {product.modelCode && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-gray-50/60">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-brand shrink-0" />
                    کۆدی مۆدێل
                  </dt>
                  <dd className="sm:col-span-2 text-[14.5px] font-mono font-bold text-gray-800">
                    {product.modelCode}
                  </dd>
                </div>
              )}

              {/* Product Family */}
              {product.productFamilyKu && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-white">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand shrink-0" />
                    زنجیرە / خێزانی بەرهەم
                  </dt>
                  <dd className="sm:col-span-2 text-[14.5px] text-gray-700 font-medium">
                    {product.productFamilyKu}
                  </dd>
                </div>
              )}

              {/* Levels if applicable */}
              {product.levels && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-gray-50/60">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-brand shrink-0" />
                    جۆر
                  </dt>
                  <dd className="sm:col-span-2 text-[14.5px] text-gray-700 font-medium">
                    {product.levels}
                  </dd>
                </div>
              )}

              {/* Raw Dimensions */}
              {product.dimensionsRaw && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-white">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-brand shrink-0" />
                    پێوانەی تەواوەتی
                  </dt>
                  <dd className="sm:col-span-2 text-[15px] font-bold text-gray-900" dir="ltr">
                    {product.dimensionsRaw}
                  </dd>
                </div>
              )}

              {/* Detailed height, width, length if supplied (like AL.D, AL.F) */}
              {product.heightRaw && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-gray-50/60">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-brand shrink-0" />
                    بەرزی
                  </dt>
                  <dd className="sm:col-span-2 text-[14.5px] text-gray-700 font-medium" dir="ltr">
                    {product.heightRaw}
                  </dd>
                </div>
              )}

              {product.widthRaw && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-white">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-brand shrink-0" />
                    پانی
                  </dt>
                  <dd className="sm:col-span-2 text-[14.5px] text-gray-700 font-medium" dir="ltr">
                    {product.widthRaw}
                  </dd>
                </div>
              )}

              {product.lengthRaw && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-gray-50/60">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-brand shrink-0" />
                    درێژی
                  </dt>
                  <dd className="sm:col-span-2 text-[14.5px] text-gray-700 font-medium" dir="ltr">
                    {product.lengthRaw}
                  </dd>
                </div>
              )}

              {/* Stated Area */}
              {product.areaRaw && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 py-4.5 bg-white">
                  <dt className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                    <Square className="h-4 w-4 text-brand shrink-0" />
                    ڕووبەری تەواو
                  </dt>
                  <dd className="sm:col-span-2 text-[15px] font-bold text-brand" dir="ltr">
                    {product.areaRaw}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* 4. Description & Details Section */}
      <section className="py-14 sm:py-20 border-t border-gray-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h3 className="font-display text-xl sm:text-2xl font-black text-gray-900 mb-4">
                تایبەتمەندی بەرهەم
              </h3>

              {product.descriptionKu ? (
                <div className="rounded-2xl bg-white p-7 shadow-sm border border-gray-100">
                  <p className="text-[15.5px] leading-8 text-gray-600 font-light">
                    {product.descriptionKu}
                  </p>
                </div>
              ) : (
                <VerificationPlaceholder message="زانیاریی وردی ئەم بەرهەمە بە زوویی زیاد دەکرێت." />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="bg-brand py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black">
              داوای نرخ یان ڕاوێژ دەربارەی {product.titleKu}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              بۆ زانینی پێوانەی گونجاو و تێچوو و شێوازی جێبەجێکردن، پەیوەندیمان پێوە بکە.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/9647501234567?text=${encodeURIComponent(`سڵاو دەربارەی ${product.titleKu}`)}`}
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
                تەلەفۆن: <span dir="ltr">+964 750 123 4567</span>
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

      {/* 6. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-16 sm:py-24 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand">
                <span className="h-[2px] w-5 rounded bg-brand" />
                بەرهەمە پەیوەندیدارەکان
                <span className="h-[2px] w-5 rounded bg-brand" />
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-gray-900">
                مۆدێلی تری کارگەی ئەنتیکا
              </h2>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to={sectionLink}
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-8 py-3 text-[14px] font-bold text-gray-800 transition hover:border-brand hover:text-brand"
              >
                {sectionAllTitle}
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="پێشانگای وێنە"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 left-0 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/40 transition"
              aria-label="داخستن"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={currentImage}
              alt={product.titleKu}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />

            {product.images.length > 1 && (
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
                  }
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                  aria-label="وێنەی پێشوو"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium text-white/80">
                  {activeImageIndex + 1} / {product.images.length}
                </span>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev + 1) % product.images.length)
                  }
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white hover:bg-white/40 transition"
                  aria-label="وێنەی دواتر"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

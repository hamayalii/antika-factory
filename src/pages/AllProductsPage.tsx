import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronLeft,
  Layers,
  PhoneCall,
  MessageCircle,
  Mail,
  ArrowLeft,
  Box,
  Lightbulb,
  Grid,
  Store,
} from "lucide-react";
import {
  allProducts,
  capsuleProducts,
  houseProducts,
  koshkProducts,
  lightingProducts,
  shelvesProducts,
} from "../data/productData";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";

type FilterTab = "all" | "capsules" | "houses" | "koshk" | "lighting" | "shelves";

export function AllProductsPage() {
  const [selectedTab, setSelectedTab] = useState<FilterTab>("all");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getFilteredProducts = () => {
    switch (selectedTab) {
      case "capsules":
        return capsuleProducts;
      case "houses":
        return houseProducts;
      case "koshk":
        return koshkProducts;
      case "lighting":
        return lightingProducts;
      case "shelves":
        return shelvesProducts;
      default:
        return allProducts;
    }
  };

  const currentProducts = getFilteredProducts();

  return (
    <div className="bg-gray-50 pt-24 min-h-screen text-right">
      <SEO
        title="سەرجەم بەرهەمەکانمان | کارگەی ئەنتیکا"
        description="سەرجەم بەرهەمەکانی کارگەی ئەنتیکا: کەپسولە مۆدیولارەکان، خانووە سەربەخۆکان، کۆشکە بازرگانییەکان، لایتی ڕووناکی، و ڕەفەی ئەندازیاری."
        canonical="https://antika-factory.netlify.app/products"
      />

      {/* Breadcrumb */}
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
            <li className="font-bold text-gray-900" aria-current="page">
              سەرجەم بەرهەمەکانمان
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-brand mb-4">
              <Layers className="h-4 w-4" />
              سەرجەم بەرهەمەکان ({allProducts.length} بەرهەم)
            </span>
            <h1
              className="font-display font-black leading-[1.25] text-gray-900"
              style={{ fontSize: "clamp(28px, 4.5vw, 46px)" }}
            >
              تەواوی بەرهەمەکانی کارگەی ئەنتیکا
            </h1>
            <p className="mt-4 text-[15.5px] sm:text-[16.5px] text-gray-600 leading-relaxed font-light">
              پێشانگای گشتیی سەرجەم بەرهەمەکانمان: کەپسولە پێشکەوتووەکان، خانووە سەربەخۆ و مۆدیولارەکان، کۆشکی بازرگانی، لایتی ڕووناکی هونەری، و ڕەفە ئەندازیارییەکان.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filterable Products List */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Category Filter Tabs */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setSelectedTab("all")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${
                selectedTab === "all"
                  ? "bg-brand text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              هەموو بەرهەمەکان ({allProducts.length})
            </button>

            <button
              onClick={() => setSelectedTab("capsules")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${
                selectedTab === "capsules"
                  ? "bg-brand text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              کەپسولەکان ({capsuleProducts.length})
            </button>

            <button
              onClick={() => setSelectedTab("houses")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${
                selectedTab === "houses"
                  ? "bg-brand text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              خانوو ({houseProducts.length})
            </button>

            <button
              onClick={() => setSelectedTab("koshk")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${
                selectedTab === "koshk"
                  ? "bg-brand text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              کۆشکەکان ({koshkProducts.length})
            </button>

            <button
              onClick={() => setSelectedTab("lighting")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${
                selectedTab === "lighting"
                  ? "bg-brand text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              لایتی ڕووناکی ({lightingProducts.length})
            </button>

            <button
              onClick={() => setSelectedTab("shelves")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${
                selectedTab === "shelves"
                  ? "bg-brand text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              ڕەفەکان ({shelvesProducts.length})
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((prod, i) => (
              <Reveal key={prod.id} delay={i * 35}>
                <ProductCard product={prod} />
              </Reveal>
            ))}
          </div>

          {/* Quick Dedicated Categories Nav */}
          <Reveal delay={120} className="mt-16">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-[18px] font-bold text-gray-900 mb-6 text-center sm:text-right">
                بەشە تایبەتمەندەکانی بەرهەمەکانمان
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <Link
                  to="/products/capsules"
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-brand/40 hover:bg-brand-soft/20 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white">
                      <Layers className="h-5 w-5" />
                    </span>
                    <span className="font-bold text-[14.5px] text-gray-900 group-hover:text-brand transition">
                      کەپسولەکان
                    </span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-brand transition group-hover:-translate-x-1" />
                </Link>

                <Link
                  to="/products/houses"
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-brand/40 hover:bg-brand-soft/20 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white">
                      <Box className="h-5 w-5" />
                    </span>
                    <span className="font-bold text-[14.5px] text-gray-900 group-hover:text-brand transition">
                      خانوو
                    </span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-brand transition group-hover:-translate-x-1" />
                </Link>

                <Link
                  to="/products/koshk"
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-brand/40 hover:bg-brand-soft/20 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white">
                      <Store className="h-5 w-5" />
                    </span>
                    <span className="font-bold text-[14.5px] text-gray-900 group-hover:text-brand transition">
                      کۆشکەکان
                    </span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-brand transition group-hover:-translate-x-1" />
                </Link>

                <Link
                  to="/products/lighting"
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-brand/40 hover:bg-brand-soft/20 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white">
                      <Lightbulb className="h-5 w-5" />
                    </span>
                    <span className="font-bold text-[14.5px] text-gray-900 group-hover:text-brand transition">
                      لایتی ڕووناکی
                    </span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-brand transition group-hover:-translate-x-1" />
                </Link>

                <Link
                  to="/products/shelves"
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-brand/40 hover:bg-brand-soft/20 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white">
                      <Grid className="h-5 w-5" />
                    </span>
                    <span className="font-bold text-[14.5px] text-gray-900 group-hover:text-brand transition">
                      ڕەفەکان
                    </span>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-brand transition group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black">
              پێویستیت بە دیزاینی تایبەت یان بەرهەمێک هەیە بە پێوانەی شوێنەکەت؟
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              بۆ دیاریکردنی پێوانە و زانینی نرخ و ڕاوێژکردن، تیمی ئەندازیاری کارگەی ئەنتیکا ئامادەیە پەیوەندیت پێوە بکات.
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

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronLeft,
  Layers,
  MessageCircle,
  PhoneCall,
  Mail,
  ArrowLeft,
  Store,
  Zap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { koshkCategories, koshkProducts } from "../data/productData";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";

export function KoshkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? koshkProducts
      : koshkProducts.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="bg-gray-50 pt-24 min-h-screen text-right">
      <SEO
        title="کۆشکەکان | کارگەی ئەنتیکا"
        description="زنجیرەی کۆشکی بازرگانی KA لە کارگەی ئەنتیکا فاکتۆری بۆ شوێنی فرۆشگا، پارک، نیشتەجێبوون و بەکارهێنانی بازرگانی."
        canonical="https://antika-factory.netlify.app/products/koshk"
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
            <li className="flex items-center gap-2">
              <Link to="/#products" className="transition hover:text-brand">
                بەرهەمەکانمان
              </Link>
              <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
            </li>
            <li className="font-bold text-gray-900" aria-current="page">
              کۆشکەکان
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-[13px] font-bold text-brand mb-4">
              <Store className="h-4 w-4" />
              کۆشکی بازرگانی KA ({koshkProducts.length} مۆدێلی جیاواز)
            </span>
            <h1
              className="font-display font-black leading-[1.25] text-gray-900"
              style={{ fontSize: "clamp(28px, 4.5vw, 46px)" }}
            >
              کۆشکەکانی بازرگانی KA
            </h1>
            <p className="mt-4 text-[15.5px] sm:text-[16.5px] text-gray-600 leading-relaxed font-light">
              دیزاین و بەرهەمهێنانی کۆشکی بازرگانی مۆدێرن لە کارگەی ئەنتیکا فاکتۆری بۆ شوێنی فرۆشگا،
              خواردن، خواردەمەنی و بەکارهێنانی بازرگانی
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filterable Koshk List */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-bold transition-all ${selectedCategory === "all"
                ? "bg-brand text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
            >
              هەموو کۆشکەکان ({koshkProducts.length})
            </button>

            {koshkCategories.map((cat) => {
              const count = koshkProducts.filter((p) => p.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-2.5 text-[13.5px] font-bold transition-all ${selectedCategory === cat.id
                    ? "bg-brand text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {cat.titleKu} ({count})
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((prod, i) => (
              <Reveal key={prod.id} delay={i * 40}>
                <ProductCard product={prod} />
              </Reveal>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Store,
                title: "دیزاینی بازرگانی",
                desc: "کۆشکەکانی KA بۆ شوێنی بازرگانی و فرۆشگا دیزاین کراون بە ئەستیل و کشش",
              },
              {
                icon: ShieldCheck,
                title: "کەرەستەی بەرگریکار",
                desc: "بەکارهێنانی کەرەستەی بەرزکوالێت و بەرگریکار لە بارانی بازار و ئاووبەرانەوە",
              },
              {
                icon: Zap,
                title: "خێرایی لە دانانی",
                desc: "پێشساز لە کارگەی ئەنتیکا و ئاسانی گواستنەوە و جێگیرکردن لە شوێنی مەبەست",
              },
              {
                icon: Sparkles,
                title: "دیزاینی تایبەت",
                desc: "توانای گونجاندنی دیزاین و رەنگ و پێوانە بەپێی داواکاری و شوێنی مەبەست",
              },
            ].map((f, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand mb-4">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h4 className="font-display text-[15.5px] font-bold text-gray-900 mb-2">{f.title}</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-light">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Switch to Capsules/Houses Banner */}
          <Reveal delay={100} className="mt-14">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4 text-right">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Layers className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-bold text-gray-900">
                    بەدوای کەپسول یان خانوودا دەگەڕێیت؟
                  </h3>
                  <p className="text-[13.5px] text-gray-600 mt-1">
                    کەپسولەکانی AL، AM و AS، و هەروەها خانووی حاویە و باخچە لە بەشی تایبەتیاندا ببینە.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/products/capsules"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13.5px] font-bold text-white hover:bg-brand-dark transition"
                >
                  کەپسولەکان
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  to="/products/houses"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-[13.5px] font-bold text-white hover:bg-gray-800 transition"
                >
                  خانووەکان
                  <ArrowLeft className="h-4 w-4" />
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
              پێویستیت بە کۆشکێکی بازرگانی هەیە بە خواستی خۆت؟
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              بۆ ڕاوێژکردن لەسەر قەبارە، دیزاین و دیاریکردنی نرخ، تیمی ئەندازیاری کارگەی ئەنتیکا هەمیشە ئامادەیە بۆ گفتوگۆکردن.
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

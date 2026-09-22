import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronLeft, Sparkles, MessageCircle, PhoneCall, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SEO } from "../components/SEO";

export function LightingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-50 pt-24 min-h-screen text-right">
      <SEO
        title="لایتی ڕووناکی | کارگەی ئەنتیکا"
        description="دیزاین و دروستکردنی لایتی ڕووناکی مۆدێرن و هونەری لە کارگەی ئەنتیکا فاکتۆری."
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
              لایتی ڕووناکی
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-bold text-brand">
                  <Sparkles className="h-4 w-4" />
                  بەرهەمە هونەرییەکان
                </span>
                <h1
                  className="mt-5 font-display font-black leading-[1.25] text-gray-900"
                  style={{ fontSize: "clamp(30px, 5vw, 50px)" }}
                >
                  لایتی ڕووناکی
                </h1>
                <p className="mt-5 text-[16px] sm:text-[17px] font-light leading-relaxed text-gray-600">
                  تێکەڵەیەک لە جوانیی سروشت و دیزاینی مۆدێرن بە شێوەیەکی بێهاوتا. لایتەکانی ئەنتیکا فاکتۆری بە دیزاینی تایبەت و کەرەستەی سروشتی و هاوچەرخ بۆ بەخشینی کەشێکی ئارام و پڕ شکۆ بە ناوماڵ، ئۆفیس و شوێنە گشتییەکان دروست دەکرێن.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/9647501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[14.5px] font-bold text-white shadow hover:bg-brand-dark transition"
                  >
                    داواکردن یان پرسیار لە واتسئاپ
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                  <Link
                    to="/products/capsules"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-7 py-3.5 text-[14.5px] font-bold text-gray-800 hover:border-brand hover:text-brand transition"
                  >
                    بینینی کەپسولەکان
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/work-lighting.jpg"
                  alt="لایتی ڕووناکی ئەنتیکا فاکتۆری"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Specifications & Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900">
              تایبەتمەندییەکانی لایتی ڕووناکی ئەنتیکا
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "دیزاینی دەستکردی داهێنەرانە",
                desc: "هەر پارچەیەک بە شێوەیەکی تایبەت و بێهاوتا دیزاین و دروست دەکرێت بۆ شوێنەکەت.",
              },
              {
                title: "کەرەستەی سروشتی و بەهێز",
                desc: "بەکارهێنانی تەختەی سروشتی و کانزای ڕوپۆشکراو کە تەمەنی درێژ و مانەوەی مسۆگەر دەکات.",
              },
              {
                title: "ڕووناکی کەم‌مەسرەف و گونجاو",
                desc: "بەستنی سیستەمی LEDی پێشکەوتوو بە ڕووناکی گەرم و ئارامبەخش بەبێ زیانگەیاندن بە چاو.",
              },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="rounded-2xl bg-white p-7 shadow-sm border border-gray-100 h-full">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed font-light">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-brand py-14 sm:py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-black">
              دەتەوێت لایتی تایبەت بە شوێنەکەت دیزاین بکەین؟
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] text-white/90 font-light">
              پەیوەندیمان پێوە بکە بۆ داواکردنی قەبارە و شێوازی تایبەت بە پرۆژەکەت.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/9647501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-bold text-brand shadow hover:bg-gray-100 transition"
              >
                <MessageCircle className="h-4 w-4" />
                واتسئاپ: <span dir="ltr">+964 750 123 4567</span>
              </a>
              <a
                href="tel:+9647501234567"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-[14.5px] font-bold text-white hover:bg-white/10 transition"
              >
                <PhoneCall className="h-4 w-4" />
                پەیوەندی تەلەفۆنی
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

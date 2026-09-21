import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { solutions } from "../data/solutions";
import { Reveal } from "../components/Reveal";

export function SolutionPage() {
  const { id } = useParams<{ id: string }>();
  const solution = solutions.find((s) => s.id === id);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-50 pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-right">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-[13px] font-semibold text-brand">
                  کەپسولەکانمان
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="mt-6 font-display font-black leading-[1.2] text-gray-900" style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}>
                  {solution.kurdishTitle} <span className="text-brand">/</span> {solution.title}
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-[17px] font-light leading-relaxed text-gray-600 lg:text-[19px]">
                  {solution.description}
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white transition hover:bg-brand-dark w-full sm:w-auto"
                  >
                    داواکردن
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/#works"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-[15px] font-bold text-gray-900 transition hover:border-brand hover:text-brand w-full sm:w-auto"
                  >
                    بینینی کارەکانی تر
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <img
                  src={solution.heroImage}
                  alt={solution.kurdishTitle}
                  className="h-[400px] w-full object-cover sm:h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display font-black leading-[1.3] text-gray-900 text-3xl sm:text-4xl">
              تایبەتمەندییەکان
            </h2>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {solution.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 100}>
                <div className="rounded-xl bg-gray-50 p-6 h-full border border-gray-100 hover:border-brand hover:shadow-md transition">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-[18px] font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-[14px] leading-relaxed text-gray-600">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display font-black leading-[1.3] text-gray-900 text-3xl sm:text-4xl">
              نموونەی کار
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {solution.images.map((img, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="overflow-hidden rounded-xl shadow-sm">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-[300px] object-cover transition-transform hover:scale-105 duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

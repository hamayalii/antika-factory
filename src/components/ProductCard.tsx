import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Ruler, Clock } from "lucide-react";
import type { VerifiedProduct } from "../data/productData";

interface ProductCardProps {
    product: VerifiedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl focus-within:ring-2 focus-within:ring-brand">
            {/* Clickable Overlay Link */}
            <Link
                to={`/products/${product.slug}`}
                className="absolute inset-0 z-10 focus:outline-none"
                aria-label={`${product.titleKu} - زیاتر بزانە`}
            >
                <span className="sr-only">{product.titleKu}</span>
            </Link>

            {/* Product Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                    src={imageError || !product.images[0] ? "/images/capsule-1.jpg" : product.images[0]}
                    alt={product.titleKu}
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="500"
                    height="375"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                {/* Category Badge */}
                <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11.5px] font-bold text-gray-800 shadow-sm backdrop-blur-sm pointer-events-none">
                    <Sparkles className="h-3 w-3 text-brand" />
                    {product.categoryTitleKu}
                </span>

                {/* Model Code Badge */}
                {product.modelCode && (
                    <span className="absolute top-4 left-4 z-20 inline-flex items-center rounded-full bg-gray-900/80 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-white backdrop-blur-sm pointer-events-none">
                        {product.modelCode}
                    </span>
                )}

                {/* Coming Soon Overlay Badge on Image */}
                {/* {product.isComingSoon && (
                    <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white px-3.5 py-1 text-[12px] font-bold shadow-lg backdrop-blur-sm">
                            <Clock className="h-3.5 w-3.5" />
                            بەم زووانە بەردەست ئەبێت..!
                        </span>
                    </div>
                )} */}
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 text-right">
                <div>
                    {product.isComingSoon && (
                        <div className="mb-2">
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 text-[11.5px] font-bold text-amber-800">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                بەم زووانە بەردەست ئەبێت..!
                            </span>
                        </div>
                    )}
                    <h3 className="font-display text-[18px] sm:text-[20px] font-extrabold text-gray-900 group-hover:text-brand transition-colors duration-200">
                        {product.titleKu}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-[13.5px] sm:text-[14px] leading-relaxed text-gray-600">
                        {product.shortDescriptionKu}
                    </p>

                    {/* Raw dimensions / Area display if available */}
                    {(product.dimensionsRaw || product.areaRaw) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px] text-gray-700 font-medium">
                            {product.dimensionsRaw && (
                                <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 border border-gray-200/70 px-2.5 py-1">
                                    <Ruler className="h-3 w-3 text-brand" />
                                    <span>پێوانە: {product.dimensionsRaw}</span>
                                </span>
                            )}
                            {product.areaRaw && (
                                <span className="inline-flex items-center gap-1 rounded-md bg-brand-soft/70 border border-brand/20 px-2.5 py-1 text-brand-dark font-bold">
                                    <span>ڕووبەر: {product.areaRaw}</span>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Bottom Bar: Action buttons */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand group-hover:text-brand-dark transition-colors">
                        زیاتر بزانە
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </span>

                    <span className="text-[12px] font-medium text-gray-400">
                        {product.titleEn}
                    </span>
                </div>
            </div>
        </article>
    );
}

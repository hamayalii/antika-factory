import { Link } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";
import type { ProductCategory } from "../data/productData";

interface ProductCategoryCardProps {
  category: ProductCategory;
}

export function ProductCategoryCard({ category }: ProductCategoryCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl focus-within:ring-2 focus-within:ring-brand">
      {/* Clickable link */}
      <Link
        to={`/products/${category.slug}`}
        className="absolute inset-0 z-10 focus:outline-none"
        aria-label={`${category.titleKu} - پیشاندانی بەرهەمەکان`}
      >
        <span className="sr-only">{category.titleKu}</span>
      </Link>

      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <img
          src={category.image || "/images/capsule-1.jpg"}
          alt={category.titleKu}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          width="500"
          height="312"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Model Count Badge */}
        <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[12px] font-bold text-gray-800 shadow-sm backdrop-blur-sm pointer-events-none">
          <Layers className="h-3.5 w-3.5 text-brand" />
          <span>{category.modelCount} مۆدێل</span>
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 text-right">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-[19px] sm:text-[21px] font-extrabold text-gray-900 group-hover:text-brand transition-colors">
              {category.titleKu}
            </h3>
            <span className="text-[12px] font-semibold text-gray-400">
              {category.titleEn}
            </span>
          </div>
          <p className="mt-2.5 text-[14px] leading-relaxed text-gray-600 line-clamp-2">
            {category.shortDescriptionKu}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand group-hover:text-brand-dark transition-colors">
            سەیری مۆدێلەکان بکە
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </span>
          <span className="text-xs text-gray-400 font-medium">ئەنتیکا فاکتۆری</span>
        </div>
      </div>
    </article>
  );
}

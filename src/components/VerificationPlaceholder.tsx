import { Info } from "lucide-react";

interface VerificationPlaceholderProps {
  message?: string;
  className?: string;
}

export function VerificationPlaceholder({
  message = "زانیاریی وردی ئەم بەرهەمە بە زوویی زیاد دەکرێت.",
  className = "",
}: VerificationPlaceholderProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-200/80 bg-gray-50/90 p-6 sm:p-8 text-center text-right ${className}`}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3.5 text-gray-600 justify-center">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
          <Info className="h-5 w-5" />
        </span>
        <p className="text-[14.5px] font-medium leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}

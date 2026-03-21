"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Promotion, DiscountType } from "@/services/promotionService";
import { formatCurrency } from "@/lib/format";

interface PromotionalBannerProps {
  promotion?: Promotion | null;
}

export default function PromotionalBanner({ promotion }: PromotionalBannerProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (!promotion?.code) return;
    navigator.clipboard.writeText(promotion.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative">
        <div className="relative overflow-hidden rounded-2xl w-full h-[300px] md:h-[400px] shadow-lg group">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop"
              alt="Promotional Banner"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col justify-center h-full max-w-2xl px-8 md:px-12 text-white">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-[#e12d2d] rounded-full w-max shadow-sm">
              Ưu đãi độc quyền
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
              Mùa hè rực rỡ, <br className="hidden md:block"/>
              {promotion ? (
                <span className="text-[#f5c71a]">
                  giảm tới {promotion.discountType === DiscountType.PERCENTAGE 
                    ? `${promotion.discountValue}%` 
                    : formatCurrency(promotion.discountValue)}
                </span>
              ) : (
                <span className="text-[#f5c71a]">nhiều ưu đãi ngập tràn</span>
              )}
            </h2>
            <p className="text-sm md:text-lg mb-8 text-gray-200 drop-shadow-sm max-w-md line-clamp-2 md:line-clamp-none">
              Khám phá những điểm đến tuyệt đẹp tại Việt Nam và tận hưởng kỳ nghỉ dưỡng không âu lo cùng TripNest. Áp dụng ngay mã giảm giá bên dưới.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link 
                href="/tour" 
                className="inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-semibold text-gray-900 transition-all bg-white rounded-lg hover:bg-gray-100 shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                Khám phá ngay
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="m9 18 6-6-6-6"/></svg>
              </Link>

              {promotion && (
                <button
                  onClick={copyCode}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-semibold text-white transition-all bg-transparent border-2 border-dashed border-[#f5c71a] rounded-lg hover:bg-black/20"
                >
                  <span className="mr-2 font-mono">{promotion.code}</span>
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

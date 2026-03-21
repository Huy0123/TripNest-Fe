"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface PopularDealsProps {
  tours?: import("@/types/tours").Tour[];
}

export default function PopularDeals({ tours = [] }: PopularDealsProps) {

  return (
    <section className="relative overflow-hidden py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between cursor-pointer group">
          <Link href="/tour" className="flex items-center group">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800 flex items-center hover:text-gray-600 transition-colors">
              Gói Tour Phổ Biến
              <ChevronRight className="ml-1 h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
            </h2>
          </Link>
        </div>

        {/* Deals Carousel */}
        {tours.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: false,
              watchDrag: false,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {tours.map((tour) => (
                <CarouselItem key={tour.id} className="pl-3 md:pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Link href={`/tour/${tour.id}`} className="block h-full cursor-pointer focus:outline-none rounded-xl">
                    <div className="group relative h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow duration-300">
                    <div className="relative h-[180px] md:h-[200px] w-full shrink-0 overflow-hidden">
                      <Image
                        src={tour.image || tour.detail?.images?.[0]?.url || "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800&auto=format&fit=crop"}
                        alt={tour.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-0 left-0 rounded-br-[14px] bg-[#fb6a6e] px-2.5 py-1 text-xs font-semibold text-white flex items-center gap-1.5 z-10 shadow-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        {"Điểm đến"}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="mb-2 line-clamp-2 text-[15px] font-bold leading-[1.4] text-gray-800 group-hover:text-[#f26a21] transition-colors">
                        {tour.name}
                      </h3>
                      <div className="mb-2.5 flex items-center gap-1.5 text-sm mt-auto">
                        <div className="flex h-4 w-4 items-center justify-center shrink-0">
                           <svg viewBox="0 0 24 24" className="w-full h-full">
                             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                           </svg>
                        </div>
                        <span className="font-semibold text-[#1e88e5] text-[13.5px]">{(tour.rating || 0)}/10</span>
                        <span className="text-gray-400 text-[10px]">•</span>
                        <span className="text-gray-500 text-[13px]">{tour.reviewCount || 0} đánh giá</span>
                      </div>
                      <div className="text-[17px] font-bold text-[#e65100]">
                        {formatCurrency((tour.price || 0) * (1 - (tour.discount || 0) / 100))}
                      </div>
                    </div>
                  </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-100 hover:bg-white h-11 w-11 disabled:opacity-0 transition-all duration-200 z-10" />
            <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-100 hover:bg-white h-11 w-11 disabled:opacity-0 transition-all duration-200 z-10" />
          </Carousel>
        ) : (
          <div className="w-full flex justify-center py-10 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-gray-500 font-medium">Chưa có dữ liệu tour.</p>
          </div>
        )}
      </div>
    </section>
  );
}

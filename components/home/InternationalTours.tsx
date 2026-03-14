"use client";

import React from "react";
import Link from "next/link";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface LastMinuteDeal {
  id: number;
  title: string;
  image: string;
  rating: number;
  dateRange: string;
  originalPrice: number;
  price: number;
  discount?: number;
  isGuestFavorite?: boolean;
  isLimitedDeal?: boolean;
}

interface InternationalToursProps {
  tours?: import("@/types/tours").Tour[];
}

export default function InternationalTours({ tours = [] }: InternationalToursProps) {
  const deals: LastMinuteDeal[] = [
    {
      id: 1,
      title: "A week in Netherlands",
      image: "/europe.png",
      rating: 4.65,
      dateRange: "Jan 5 - 12",
      originalPrice: 1199,
      price: 1199,
      isGuestFavorite: true,
      isLimitedDeal: true,
    },
    {
      id: 2,
      title: "Thailand Heaven",
      image: "/asia.png",
      rating: 4.65,
      dateRange: "Jan 5 - 12",
      originalPrice: 1199,
      price: 1199,
      isLimitedDeal: true,
    },
    {
      id: 3,
      title: "Japan's Experience",
      image: "/cities.png",
      rating: 4.65,
      dateRange: "Jan 5 - 12",
      originalPrice: 1199,
      price: 1199,
      discount: 30,
      isLimitedDeal: true,
    },
    {
      id: 4,
      title: "Maldives Paradise Resort",
      image: "/asia.png",
      rating: 4.95,
      dateRange: "Feb 14 - 20",
      originalPrice: 3500,
      price: 2999,
      discount: 14,
      isGuestFavorite: true,
    },
    {
      id: 5,
      title: "Dubai Desert Safari & City",
      image: "/europe.png",
      rating: 4.8,
      dateRange: "Mar 10 - 15",
      originalPrice: 1500,
      price: 1299,
      discount: 13,
      isGuestFavorite: false,
    },
  ];

  return (
    <section className="relative overflow-hidden py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between cursor-pointer group">
          <Link href="/deals/last-minute" className="flex items-center group">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800 flex items-center hover:text-gray-600 transition-colors">
              Tour quốc tế
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
            </h2>
          </Link>
        </div>

        {/* Deals Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
            watchDrag: false,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {tours.length > 0 ? (
              tours.map((tour) => (
              <CarouselItem key={tour.id} className="pl-3 md:pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link href={`/tour/${tour.id}`} className="block h-full cursor-pointer focus:outline-none rounded-2xl">
                <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all h-full">
                  <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url('${tour.image || tour.detail?.images?.[0]?.url || "/europe.png"}')` }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow bg-white">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#333333] leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                        {tour.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1 mt-2">
                        <span className="text-[13px] font-semibold text-[#1a73e8]">{tour.rating}/10</span>
                        <span className="text-[13px] text-gray-500">• Tuyệt vời</span>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col items-start pt-1">
                      <span className="text-[13px] text-[#8e8e8e] line-through font-medium leading-none">
                        {(tour.price || 0).toLocaleString()} VNĐ
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[20px] font-bold text-[#e12d2d] leading-none">
                          {((tour.price || 0) * (1 - (tour.discount || 0) / 100)).toLocaleString()} VNĐ
                        </span>
                      </div>
                      <span className="text-[12px] text-[#757575] mt-1 line-clamp-1">
                        Chưa bao gồm thuế và phí
                      </span>
                    </div>
                  </div>
                </div>
                </Link>
              </CarouselItem>
              ))
            ) : (
              deals.map((deal) => (
              <CarouselItem key={deal.id} className="pl-3 md:pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link href={`/tour/${deal.id}`} className="block h-full cursor-pointer focus:outline-none rounded-2xl">
                <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all h-full">
                  <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url('${deal.image}')` }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow bg-white">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#333333] leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                        {deal.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-1 mt-2">
                        <span className="text-[13px] font-semibold text-[#1a73e8]">{deal.rating}/10</span>
                        <span className="text-[13px] text-gray-500">• Tuyệt vời</span>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col items-start pt-1">
                      <span className="text-[13px] text-[#8e8e8e] line-through font-medium leading-none">
                        {deal.originalPrice} VNĐ
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[20px] font-bold text-[#e12d2d] leading-none">
                          {deal.price} VNĐ
                        </span>
                      </div>
                      <span className="text-[12px] text-[#757575] mt-1 line-clamp-1">
                        Chưa bao gồm thuế và phí
                      </span>
                    </div>
                  </div>
                </div>
                </Link>
              </CarouselItem>
              ))
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-100 hover:bg-white h-11 w-11 disabled:opacity-0 transition-all duration-200 z-10" />
          <CarouselNext className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-100 hover:bg-white h-11 w-11 disabled:opacity-0 transition-all duration-200 z-10" />
        </Carousel>
      </div>
    </section>
  );
}

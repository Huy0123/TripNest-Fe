"use client";

import React from "react";
import Link from "next/link";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ChristmasOffer {
  id: number;
  title: string;
  image: string;
  rating: number;
  dateRange: string;
  originalPrice: number;
  price: number;
  discount: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SuperDealsProps {
  tours?: any[];
}

export default function SuperDeals({ tours = [] }: SuperDealsProps) {
  const offers = [
    {
      id: 1,
      title: "Quoc Cuong Center Da Nang Hotel by Haviland",
      image: "/luxury.png",
      stars: 3,
      rating: 8.1,
      reviewsCount: 213,
      originalPrice: "370.130",
      price: "346.136",
      discount: 30,
    },
    {
      id: 2,
      title: "Novotel Danang Premier Han River",
      image: "/cities.png",
      stars: 5,
      rating: 8.9,
      reviewsCount: 1042,
      originalPrice: "2.170.130",
      price: "1.846.136",
      discount: 15,
    },
    {
      id: 3,
      title: "Melia Vinpearl Danang Riverfront",
      image: "/beach.png",
      stars: 5,
      rating: 9.0,
      reviewsCount: 885,
      originalPrice: "1.970.130",
      price: "1.546.136",
      discount: 21,
    },
    {
      id: 4,
      title: "Haian Beach Hotel & Spa",
      image: "/italy.png",
      stars: 4,
      rating: 8.5,
      reviewsCount: 345,
      originalPrice: "1.170.130",
      price: "846.136",
      discount: 27,
    },
    {
      id: 5,
      title: "Da Nang Mikazuki Japanese Resorts & Spa",
      image: "/asia.png",
      stars: 5,
      rating: 8.8,
      reviewsCount: 921,
      originalPrice: "2.500.000",
      price: "1.950.000",
      discount: 22,
    },
  ];

  return (
    <section className="relative overflow-hidden py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between cursor-pointer group">
          <Link href="/offers/christmas" className="flex items-center group">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800 flex items-center hover:text-gray-600 transition-colors">
              Ưu đãi tốt nhất
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
            </h2>
          </Link>
        </div>

        {/* Offers Carousel */}
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
                      style={{ backgroundImage: `url('${tour.image || tour.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1542314831-c6a4d14d23e5?q=80&w=600&auto=format&fit=crop"}')` }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow bg-white">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#333333] leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                        {tour.name}
                      </h3>
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(tour.rating / 2) ? 'text-[#f5c71a]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[13px] font-semibold text-[#1a73e8]">{tour.rating}/10</span>
                        <span className="text-[13px] text-gray-500">• {tour.reviewCount || 0} đánh giá</span>
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
              offers.map((offer) => (
              <CarouselItem key={offer.id} className="pl-3 md:pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link href={`/tour/${offer.id}`} className="block h-full cursor-pointer focus:outline-none rounded-2xl">
                <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all h-full">
                  <div className="relative h-[200px] w-full shrink-0 overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url('${offer.image}')` }}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow bg-white">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#333333] leading-snug line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                        {offer.title}
                      </h3>
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {[...Array(offer.stars)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-[#f5c71a]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[13px] font-semibold text-[#1a73e8]">{offer.rating}/10</span>
                        <span className="text-[13px] text-gray-500">• {offer.reviewsCount} đánh giá</span>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col items-start pt-1">
                      <span className="text-[13px] text-[#8e8e8e] line-through font-medium leading-none">
                        {offer.originalPrice} VNĐ
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[20px] font-bold text-[#e12d2d] leading-none">
                          {offer.price} VNĐ
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

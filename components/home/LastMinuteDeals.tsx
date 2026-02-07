"use client";

import React from "react";
import Link from "next/link";

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

export default function LastMinuteDeals() {
  const deals: LastMinuteDeal[] = [
    {
      id: 1,
      title: "A week in Netherlands",
      image: "/last-minute/netherlands.jpg",
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
      image: "/last-minute/thailand.jpg",
      rating: 4.65,
      dateRange: "Jan 5 - 12",
      originalPrice: 1199,
      price: 1199,
      isLimitedDeal: true,
    },
    {
      id: 3,
      title: "Japan's Experience",
      image: "/last-minute/japan.jpg",
      rating: 4.65,
      dateRange: "Jan 5 - 12",
      originalPrice: 1199,
      price: 1199,
      discount: 30,
      isLimitedDeal: true,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-pink-50/30 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Last Minute Deals
          </h2>
          <Link
            href="/deals/last-minute"
            className="text-base font-medium text-gray-900 underline transition-colors hover:text-gray-700"
          >
            See All
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${deal.image}')` }}
                />

                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-col gap-2">
                  {deal.isGuestFavorite && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm">
                      Guest favorite
                    </span>
                  )}
                  {deal.isLimitedDeal && (
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 backdrop-blur-sm">
                      Limited-time Deal
                    </span>
                  )}
                  {deal.discount && (
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                      {deal.discount}% Off
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title and Rating */}
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    {deal.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4 text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">
                      {deal.rating}
                    </span>
                  </div>
                </div>

                {/* Date and Price */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{deal.dateRange}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">
                      €{deal.originalPrice}
                    </span>
                    <span className="text-base font-bold text-orange-600">
                      €{deal.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

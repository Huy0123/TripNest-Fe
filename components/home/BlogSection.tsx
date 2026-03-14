"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Binoculars } from "lucide-react";

const destinations = [
  {
    id: 1,
    title: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
    link: "/blog/bali",
  },
  {
    id: 2,
    title: "Bangkok",
    country: "Thái Lan",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7cbf0d62?q=80&w=600&auto=format&fit=crop",
    link: "/blog/bangkok",
  },
  {
    id: 3,
    title: "Seoul",
    country: "Hàn Quốc",
    image: "https://images.unsplash.com/photo-1546874177-9e664107314e?q=80&w=600&auto=format&fit=crop",
    link: "/blog/seoul",
  },
  {
    id: 4,
    title: "Istanbul",
    country: "Thổ Nhĩ Kỳ",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop",
    link: "/blog/istanbul",
  },
  {
    id: 5,
    title: "Liverpool",
    country: "Anh",
    image: "https://images.unsplash.com/photo-1550991845-a48e7aa2dfdb?q=80&w=600&auto=format&fit=crop",
    link: "/blog/liverpool",
  },
];

export default function BlogSection() {
  return (
    <section className="pt-12 pb-4 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-start gap-2.5">
          <Binoculars className="h-7 w-7 text-teal-600" />
          <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800">Cẩm nang du lịch</h2>
        </div>

        {/* Grid of Destinations */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mb-8">
          {destinations.map((dest) => (
            <Link 
              key={dest.id} 
              href={dest.link}
              className="group relative h-[280px] lg:h-[320px] w-full overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Text */}
              <div className="absolute bottom-0 left-0 p-5 w-full z-10">
                <h3 className="text-[17px] font-bold text-white mb-0.5">{dest.title}</h3>
                <p className="text-[13px] text-gray-200 font-medium">{dest.country}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1e88e5] hover:text-[#1565c0] transition-colors"
          >
            Xem thêm <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

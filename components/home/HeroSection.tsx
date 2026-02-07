"use client";
import { useState } from "react";
import Image from "next/image";
import SearchHeader from "../tours/SearchHeader";
import { heroDestinations as destinations } from "@/data/navigation";

export default function HeroSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <section className="h-[calc(100vh-var(--header-height))] mt-[var(--header-height)] w-full py-6">
      <div className="max-w-7xl mx-auto flex gap-4 px-4 md:px-6 lg:px-8 h-full">
        {destinations.slice(0, 4).map((destination) => {
          const isHovered = hoveredId === destination.id;
          const isSomeoneHovered = hoveredId !== null;

          return (
            <div
              key={destination.id}
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out rounded-2xl flex items-end justify-center p-4 ${
                isHovered ? "flex-3" : isSomeoneHovered ? "flex-1" : "flex-2"
              }`}
            >
              <Image
                src={destination.image}
                alt={`${destination.name}`}
                fill
                className="object-cover"
              />
              <p className="relative text-white text-lg md:text-xl font-semibold">
                {destination.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto max-w-4xl w-full">
          <SearchHeader />
        </div>
      </div>
    </section>
  );
}

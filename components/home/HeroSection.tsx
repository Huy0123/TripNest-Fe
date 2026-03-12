"use client";
import { useState } from "react";
import SearchHeader from "../tour/SearchTour";
import { heroDestinations as destinations } from "@/data/navigation";

export default function HeroSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <section className="min-h-[500px] md:h-[calc(100vh-var(--header-height))] w-full py-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:flex gap-3 md:gap-4 px-4 md:px-6 lg:px-8 h-full">
        {destinations.slice(0, 4).map((destination) => {
          const isHovered = hoveredId === destination.id;

          return (
            <div
              key={destination.id}
              onMouseEnter={() => setHoveredId(destination.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ease-out rounded-2xl flex items-end justify-center p-4 md:p-6 shadow-md hover:shadow-xl min-h-[200px] md:min-h-0 ${
                isHovered ? "lg:flex-[2]" : "lg:flex-1"
              }`}
            >
              <img
                src={destination.image}
                alt={`${destination.name}`}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />
              <div className="relative z-10 w-full text-center transform transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                <p className="text-white text-lg md:text-2xl lg:text-3xl font-bold tracking-wide drop-shadow-lg">
                  {destination.name}
                </p>
                <div className={`h-1 bg-white mx-auto mt-2 transition-all duration-700 ease-in-out ${isHovered ? 'w-10 opacity-100' : 'w-0 opacity-0'}`} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Search Bar Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <div className="pointer-events-auto w-full max-w-4xl transform -translate-y-4 md:translate-y-0">
          <SearchHeader />
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";

interface City {
  id: number;
  name: string;
  image: string;
}

// City mapping for dynamic data
interface DisplayCity {
  id: string | number;
  name: string;
  image: string;
}

export default function PopularDestinations({ locations = [] }: { locations?: any[] }) {
  // Mapping of common cities to high-quality travel images
  const cityImages: Record<string, string> = {
    'Hà Nội': 'https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=600&auto=format&fit=crop',
    'Hồ Chí Minh': 'https://images.unsplash.com/photo-1549658364-5178619623e1?q=80&w=600&auto=format&fit=crop',
    'Đà Nẵng': 'https://images.unsplash.com/photo-1559592442-7e182c8c6301?q=80&w=600&auto=format&fit=crop',
    'Nha Trang': 'https://images.unsplash.com/photo-1598424264669-e0204780562e?q=80&w=600&auto=format&fit=crop',
    'Phú Quốc': 'https://images.unsplash.com/photo-1627916960824-2c5e5fb3187c?q=80&w=600&auto=format&fit=crop',
    'Hạ Long': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=600&auto=format&fit=crop',
    'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
    'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop',
    'Singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop',
    'Bangkok': 'https://images.unsplash.com/photo-1508009603885-50cf7c57936d?q=80&w=600&auto=format&fit=crop',
  };

  const displayCities = locations.length > 0 
    ? locations.map(loc => ({
        id: loc.id,
        name: loc.city,
        image: cityImages[loc.city] || `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop&sig=${loc.id}`
      }))
    : [
        { id: 1, name: "Paris", image: cityImages['Paris'] },
        { id: 2, name: "Hà Nội", image: cityImages['Hà Nội'] },
        { id: 3, name: "Tokyo", image: cityImages['Tokyo'] },
        { id: 4, name: "Đà Nẵng", image: cityImages['Đà Nẵng'] },
        { id: 5, name: "Singapore", image: cityImages['Singapore'] },
        { id: 6, name: "Phú Quốc", image: cityImages['Phú Quốc'] },
      ];

  return (
    <section className="relative overflow-hidden py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between cursor-pointer group">
          <div className="flex items-center group">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800 flex items-center hover:text-gray-600 transition-colors">
              Điểm đến phổ biến
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
            </h2>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {displayCities.map((city) => (
            <div
              key={city.id}
              className="group relative h-48 cursor-pointer overflow-hidden rounded-2xl bg-gray-100"
            >
              {/* Background Image */}
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* City Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="header-03-bold text-white drop-shadow-lg">
                  {city.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

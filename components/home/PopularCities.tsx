"use client";

import React from "react";
import Image from "next/image";

interface City {
  id: number;
  name: string;
  image: string;
}

export default function PopularCities() {
  const cities: City[] = [
    {
      id: 1,
      name: "Paris",
      image: "/cities/paris.jpg",
    },
    {
      id: 2,
      name: "Amsterdam",
      image: "/cities/amsterdam.jpg",
    },
    {
      id: 3,
      name: "Rome",
      image: "/cities/rome.jpg",
    },
    {
      id: 4,
      name: "Florence",
      image: "/cities/florence.jpg",
    },
    {
      id: 5,
      name: "Tokyo",
      image: "/cities/tokyo.jpg",
    },
    {
      id: 6,
      name: "Mexico",
      image: "/cities/mexico.jpg",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-pink-50/30 section-padding-x section-padding-y">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="header-03-bold text-grey-900">Popular Cities</h2>
          <button className="body-01-medium text-grey-900 underline transition-hover hover:text-grey-700 focus-ring rounded-md">
            Load more
          </button>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cities.map((city) => (
            <div
              key={city.id}
              className="group relative h-48 cursor-pointer overflow-hidden rounded-2xl shadow-card shadow-card-hover card-lift"
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

"use client";

import React from "react";

export default function JourneyTags() {
  const tags = [
    "Paris Tours",
    "Dubai Luxury Escapes",
    "Sydney Harbour Cruises",
    "London Sightseeing Tours",
    "Patagonia Trekking",
    "African Safari Tours",
    "Egypt Pyramids Tours",
    "Jerusalem Holy Land Pilgrimage",
    "Kyoto Zen Garden Walks",
    "Hawaiian Beach Vacations",
    "Zanzibar Coastal Retreats",
    "Galapagos Islands Tours",
    "Yellowstone National Park Adventures",
    "Serengeti Wildlife Safaris",
    "Limited-time Deal",
    "Private Yacht Charters in Greece",
    "Maldives All-Inclusive Resorts",
    "Winter Ski Adventures in Switzerland",
  ];

  return (
    <section className="w-full bg-gradient-to-b from-pink-50/50 to-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Start Your Journey with Journo!
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="rounded-full border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

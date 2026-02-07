"use client";

import React from "react";
import Link from "next/link";
import CardItems from "@/components/common/CardItems"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Temporary mock data for the slider until we have the centralized tour data fully hooked up
const deals = [
  {
    id: 1,
    title: "Bali Adventure",
    location: "Indonesia",
    price: 1200,
    rating: 4.8,
    reviews: 120,
    image: "/bali.png",
    duration: "5 days",
    groupSize: "10-15 people"
  },
   {
    id: 2,
    title: "Paris Romance",
    location: "France",
    price: 2200,
    rating: 4.9,
    reviews: 85,
    image: "/paris.png",
    duration: "7 days",
    groupSize: "2-10 people"
  },
   {
    id: 3,
    title: "Tokyo Discovery",
    location: "Japan",
    price: 1800,
    rating: 4.7,
    reviews: 200,
    image: "/tokyo.png",
    duration: "6 days",
    groupSize: "10-20 people"
  },
];


export default function PopularDeals() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Popular Deals</h2>
          <Link
            href="/packages"
            className="text-base font-medium text-gray-900 underline transition-colors hover:text-gray-700"
          >
            See All
          </Link>
        </div>

        {/* Deals Carousel */}
        <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
          <CarouselContent className="-ml-4">
            {deals.map((deal) => (
              <CarouselItem key={deal.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                 {/* @ts-ignore - Ignoring type check for now as CardItems props might not match exactly yet */}
                <CardItems {...deal} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

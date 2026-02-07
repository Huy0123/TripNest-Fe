"use client";

import React from "react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
}

export default function BlogSection() {
  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      title: "How to Pack Like a Pro: Essential Tips for Every Traveler",
      category: "Tips",
      image: "/blog/packing-tips.jpg",
      slug: "how-to-pack-like-a-pro",
    },
    {
      id: 2,
      title: "How to Spend 3 Days in New York City Like a Local",
      category: "Destinations",
      image: "/blog/new-york-3-days.jpg",
      slug: "3-days-in-new-york",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-orange-200/60 via-pink-200/50 to-orange-100/60 px-4 py-20">
      {/* Diagonal Stripe Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.5) 35px,
            rgba(255, 255, 255, 0.5) 70px
          )`,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Plan Smarter,
              <br />
              Travel Better
            </h2>
            <p className="text-lg text-gray-700 md:text-xl">
              From Packing Hacks to Dream Destinations
              <br />– Explore Our Blog Today!
            </p>
            <Link
              href="/blog"
              className="inline-block rounded-lg bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl active:scale-95"
            >
              Start Exploring Our Blog!
            </Link>
          </div>

          {/* Right Content - Blog Cards */}
          <div className="flex flex-col gap-6">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative h-64 w-full overflow-hidden sm:h-48 sm:w-48">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url('${post.image}')` }}
                    />
                    {/* Category Badge */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-gray-800 shadow-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 items-center p-6">
                    <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 sm:text-xl">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

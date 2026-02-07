"use client";

import React from "react";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogExample() {
  return (
    <div className="min-h-screen bg-white pt-[var(--header-height)]">
       {/* Header */}
       <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Inspiration, tips, and guides for your next journey.
            Explore the world through our stories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="h-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

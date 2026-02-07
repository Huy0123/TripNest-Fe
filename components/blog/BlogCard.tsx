"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/blog";
import { Calendar, User } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg border border-gray-100 flex flex-col h-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {/* Placeholder color if image fails to load, in real app handle with fallback */}
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
           {/* In a real app we'd use the actual image path. For now using a placeholder or one from public if available */}
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-400">
             [Image: {post.title}]
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3 flex items-center gap-4 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                {post.category}
            </span>
          </div>

          <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          <span className="text-sm font-semibold text-orange-600 underline decoration-2 underline-offset-4 group-hover:text-orange-700">
            Read Article
          </span>
        </div>
      </div>
    </Link>
  );
}

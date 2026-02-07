import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pt-[var(--header-height)]">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
         <div className="absolute inset-0 bg-gray-200" />
         <div className="absolute inset-0 bg-black/40" />
         <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center text-white">
                 <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold bg-orange-600 rounded-full">
                    {post.category}
                 </span>
                 <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {post.title}
                 </h1>
                 <div className="flex items-center justify-center gap-6 text-sm md:text-base">
                    <span className="flex items-center gap-2">
                        <User className="w-4 h-4" /> {post.author}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> 5 min read
                    </span>
                 </div>
            </div>
         </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-8 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <div className="prose prose-lg prose-orange mx-auto">
            <p className="lead text-xl text-gray-600 mb-8 font-medium italic border-l-4 border-orange-500 pl-4">{post.excerpt}</p>
            <p className="text-gray-800">
                {post.content}
            </p>
            <p className="text-gray-800 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Exploring the Culture</h2>
            <p className="text-gray-800">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
             <div className="my-8 h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                [Content Image Placeholder]
             </div>
             <p className="text-gray-800">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
        </div>
      </div>
    </article>
  );
}

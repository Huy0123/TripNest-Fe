"use client";

import React from "react";
import { Search } from "lucide-react";
import HelpChoose from "@/components/help/HelpChoose";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function HelpPage() {
  return (
        <div className="min-h-screen bg-grey-50 pt-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Sidebar */}
           <div className="lg:col-span-3">
              <ProfileSidebar />
           </div>

           {/* Main Content */}
           <div className="lg:col-span-9">

    <div className="min-h-screen bg-gray-50">
      {/* Hero / Search Section */}
      <div className="bg-gray-100 py-16 px-4 rounded-lg mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome to help center
          </h1>
          <p className="text-gray-600 mb-8">
            How can we help? We're available 24 hours a day.
          </p>

          <div className="relative max-w-2xl mx-auto flex items-center">
            <input
              type="text"
              placeholder="How Can We Help?"
              className="w-full pl-6 pr-32 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-orange-600 hover:bg-orange-700 text-white px-6 rounded-md font-medium transition-colors flex items-center gap-2">
              Search
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <HelpChoose />
      </div>
    </div>
    </div>
        </div>
      </div>
    </div>
  );
}

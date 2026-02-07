"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: null | { name: string };
  onLogout: () => void;
}

type MenuLevel = "main" | "destinations" | "tours";

const destinationRegions = [
  {
    name: "Popular Cities",
    items: ["Sydney", "Melbourne", "Auckland", "Queenstown", "Wellington"],
  },
  {
    name: "Europe",
    items: ["Paris", "London", "Rome", "Barcelona", "Amsterdam"],
  },
  {
    name: "Asia",
    items: ["Tokyo", "Bangkok", "Singapore", "Seoul", "Hong Kong"],
  },
  {
    name: "Americas",
    items: ["New York", "Los Angeles", "San Francisco", "Miami", "Toronto"],
  },
  {
    name: "Africa",
    items: ["Cape Town", "Marrakech", "Cairo", "Nairobi", "Johannesburg"],
  },
];

const tourCategories = [
  {
    name: "Adventure Tours",
    items: ["Mountain Climbing", "Scuba Diving", "Skydiving", "Hiking"],
  },
  {
    name: "Cultural Tours",
    items: ["Historical Sites", "Museums", "Local Markets", "Festivals"],
  },
  {
    name: "Beach Tours",
    items: [
      "Island Hopping",
      "Beach Resorts",
      "Water Sports",
      "Sunset Cruises",
    ],
  },
  {
    name: "Wildlife Tours",
    items: ["Safari", "Bird Watching", "Marine Life", "Nature Reserves"],
  },
];

export default function MobileMenu({
  isOpen,
  onClose,
  user,
  onLogout,
}: MobileMenuProps) {
  const [currentLevel, setCurrentLevel] = useState<MenuLevel>("main");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const handleBack = () => {
    setCurrentLevel("main");
    setExpandedItems([]);
  };

  const handleClose = () => {
    setCurrentLevel("main");
    setExpandedItems([]);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-grey-200">
          <h2 className="header-06-bold text-grey-900">
            {currentLevel === "main"
              ? "Menu"
              : currentLevel === "destinations"
              ? "Destinations"
              : "Tours"}
          </h2>
          <button onClick={handleClose} className="p-1">
            <X className="w-6 h-6 text-grey-800" />
          </button>
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto h-[calc(100%-73px)]">
          {/* Main Menu */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 overflow-y-auto ${
              currentLevel === "main" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="py-2">
              <button
                onClick={() => setCurrentLevel("destinations")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-grey-50 transition-colors"
              >
                <span className="body-01-medium text-grey-900">
                  Destinations
                </span>
                <ChevronRight className="w-5 h-5 text-grey-600" />
              </button>

              <button
                onClick={() => setCurrentLevel("tours")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-grey-50 transition-colors"
              >
                <span className="body-01-medium text-grey-900">Tours</span>
                <ChevronRight className="w-5 h-5 text-grey-600" />
              </button>

              <Link
                href="/about"
                onClick={handleClose}
                className="block px-4 py-3 hover:bg-grey-50 transition-colors"
              >
                <span className="body-01-medium text-grey-900">About</span>
              </Link>

              <Link
                href="/contact"
                onClick={handleClose}
                className="block px-4 py-3 hover:bg-grey-50 transition-colors"
              >
                <span className="body-01-medium text-grey-900">Contact</span>
              </Link>

              <div className="border-t border-grey-200 my-2"></div>

              {!user ? (
                <Link
                  href="/signin"
                  onClick={handleClose}
                  className="block px-4 py-3 hover:bg-grey-50 transition-colors"
                >
                  <span className="body-01-medium text-primary-600">
                    Log In
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/profile"
                    onClick={handleClose}
                    className="block px-4 py-3 hover:bg-grey-50 transition-colors"
                  >
                    <span className="body-01-medium text-grey-900">
                      My Profile
                    </span>
                  </Link>
                  <Link
                    href="/bookings"
                    onClick={handleClose}
                    className="block px-4 py-3 hover:bg-grey-50 transition-colors"
                  >
                    <span className="body-01-medium text-grey-900">
                      My Bookings
                    </span>
                  </Link>
                  <Link
                    href="/favorites"
                    onClick={handleClose}
                    className="block px-4 py-3 hover:bg-grey-50 transition-colors"
                  >
                    <span className="body-01-medium text-grey-900">
                      Favorites
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      handleClose();
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors"
                  >
                    <span className="body-01-medium text-red-600">Log Out</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Destinations Submenu */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 overflow-y-auto ${
              currentLevel === "destinations"
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            <div className="py-2">
              <button
                onClick={handleBack}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-grey-50 transition-colors border-b border-grey-200"
              >
                <ChevronLeft className="w-5 h-5 text-grey-600" />
                <span className="body-01-medium text-grey-900">Back</span>
              </button>

              {destinationRegions.map((region) => (
                <div key={region.name} className="border-b border-grey-100">
                  <button
                    onClick={() => toggleExpanded(region.name)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-grey-50 transition-colors"
                  >
                    <span className="body-01-medium text-grey-900">
                      {region.name}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 text-grey-600 transition-transform ${
                        expandedItems.includes(region.name) ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {expandedItems.includes(region.name) && (
                    <div className="bg-grey-50 py-2">
                      {region.items.map((city) => (
                        <Link
                          key={city}
                          href={`/destinations/${city
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          onClick={handleClose}
                          className="block px-8 py-2 hover:bg-grey-100 transition-colors"
                        >
                          <span className="body-02-regular text-grey-700">
                            {city}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tours Submenu */}
          <div
            className={`absolute inset-0 bg-white transition-transform duration-300 overflow-y-auto ${
              currentLevel === "tours" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="py-2">
              <button
                onClick={handleBack}
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-grey-50 transition-colors border-b border-grey-200"
              >
                <ChevronLeft className="w-5 h-5 text-grey-600" />
                <span className="body-01-medium text-grey-900">Back</span>
              </button>

              {tourCategories.map((category) => (
                <div key={category.name} className="border-b border-grey-100">
                  <button
                    onClick={() => toggleExpanded(category.name)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-grey-50 transition-colors"
                  >
                    <span className="body-01-medium text-grey-900">
                      {category.name}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 text-grey-600 transition-transform ${
                        expandedItems.includes(category.name) ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {expandedItems.includes(category.name) && (
                    <div className="bg-grey-50 py-2">
                      {category.items.map((item) => (
                        <Link
                          key={item}
                          href={`/tours/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          onClick={handleClose}
                          className="block px-8 py-2 hover:bg-grey-100 transition-colors"
                        >
                          <span className="body-02-regular text-grey-700">
                            {item}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
// Force rebuild

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Globe,
  User,
  LogOut,
  Settings,
  Heart,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import DestinationMenu from "./header/MegaMenu";
import MobileMenu from "./header/MobileMenu";
import NotificationBell from "@/components/notifications/NotificationBell";

// Mock user data - Replace this with your actual auth state later
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
import { destinations as destinationData, packagesData } from "@/data/navigation";
export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDestinationMenu, setShowDestinationMenu] = useState(false);
  const [showPackagesMenu, setShowPackagesMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const destinationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const packagesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navbarItems = [
    { name: "Blog", href: "/blog"},
    { name: "Contact", href: "/contact"},
  ];
  const dropdownItems = [
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
  ];


  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openMenu = (type: "destination" | "packages") => {
    if (type === "destination") {
      if (destinationTimerRef.current)
        clearTimeout(destinationTimerRef.current);
      setShowDestinationMenu(true);
    } else {
      if (packagesTimerRef.current) clearTimeout(packagesTimerRef.current);
      setShowPackagesMenu(true);
    }
  };

  const closeMenu = (type: "destination" | "packages") => {
    if (type === "destination") {
      destinationTimerRef.current = setTimeout(() => {
        setShowDestinationMenu(false);
      }, 200);
    } else {
      packagesTimerRef.current = setTimeout(() => {
        setShowPackagesMenu(false);
      }, 200);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }

      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target as Node)
      ) {
        setShowDestinationMenu(false);
      }
      if (
        packagesRef.current &&
        !packagesRef.current.contains(event.target as Node)
      ) {
        setShowPackagesMenu(false);
      }
    };

    if (showUserMenu || showDestinationMenu || showPackagesMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu, showDestinationMenu, showPackagesMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-grey-200 z-50 h-[76px]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="header-05-bold text-primary-600">
          Trip Nest
        </Link>

        <nav className="hidden md:flex items-center gap-6">
            {dropdownItems.map((item) => (
            <div
              key={item.name}
              ref={item.name === "Destinations" ? destinationRef : packagesRef}
              onMouseEnter={() => openMenu(item.name === "Destinations" ? "destination" : "packages")}
              onMouseLeave={() => closeMenu(item.name === "Destinations" ? "destination" : "packages")}
            >
              <span className="body-01-medium text-grey-700 hover:text-primary-500 transition-colors cursor-pointer">
              {item.name}
              </span>
            </div>
            ))}
          {navbarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="body-01-medium text-grey-700 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
           <NotificationBell />
          <Link href="/help" className="body-01-medium text-grey-800 hover:text-primary-500 transition-colors border-r border-grey-300 pr-2 flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md">
            <span className="">Help</span>
            <Globe className="inline-block ml-2 w-5 h-5" />
          </Link>

          {!user ? (
            <Link
              href="/signin"
              className="py-2.5 body-01-medium text-grey-800 hover:text-primary-500 transition-hover rounded-lg focus-ring flex items-center gap-1"
            >
              Log In
              <ChevronDown className="icon-sm" />
            </Link>
          ) : (
            /* Logged In - User Menu */
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 py-2 px-3 rounded-full transition-colors"
              >
                <Image
                  src={user.avatar || ""}
                  alt={user.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
                <ChevronDown className="w-4 h-4 text-grey-600" />
              </button>
              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-grey-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-grey-200 flex items-center gap-3">
                    <Image
                      src={user.avatar || ""}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="w-9 h-9 rounded-full bg-black shrink-0"
                    />
                    <div>
                      <p className="body-01-medium text-grey-900">
                        {user.name}
                      </p>
                      <p className="body-02-regular text-grey-600">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-grey-50 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <User className="w-4 h-4 text-grey-600" />
                    <span className="body-01-regular text-grey-800">
                      My Profile
                    </span>
                  </Link>

                  <Link
                    href="/bookings"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-grey-50 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <MapPin className="w-4 h-4 text-grey-600" />
                    <span className="body-01-regular text-grey-800">
                      My Bookings
                    </span>
                  </Link>

                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-grey-50 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <Heart className="w-4 h-4 text-grey-600" />
                    <span className="body-01-regular text-grey-800">
                      Favorites
                    </span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-grey-50 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <Settings className="w-4 h-4 text-grey-600" />
                    <span className="body-01-regular text-grey-800">
                      Settings
                    </span>
                  </Link>

                  <div className="border-t border-grey-200 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="body-01-regular text-red-600">
                        Log Out
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-1"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6 text-grey-800" />
          </button>
        </div>
      </div>

      {/* Destination Menu - Full Width */}
      {showDestinationMenu && (
        <div
          onMouseEnter={() => openMenu("destination")}
          onMouseLeave={() => closeMenu("destination")}
        >
          <DestinationMenu categories={destinationData} config={{
            classname: "grid-cols-4",
            defaultActiveId: "popular",
          }}/>
        </div>
      )}

      {showPackagesMenu && (
        <div
          onMouseEnter={() => openMenu("packages")}
          onMouseLeave={() => closeMenu("packages")}
        >
          <DestinationMenu categories={packagesData} config={{
            classname: "grid-cols-2 lg:grid-cols-3",
            defaultActiveId: "honeymoon",
          }}/>
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}

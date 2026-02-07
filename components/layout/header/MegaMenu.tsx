"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MegaMenuItems {
  name: string;
  href: string;
}

interface MegaMenuCategory {
  id: string;
  name: string;
  image: string;
  items: MegaMenuItems[];
}

interface MegaMenuProps {
  categories: MegaMenuCategory[];
  config: {
    classname: string;
    defaultActiveId: string;
  };
}

const MegaMenu = (props: MegaMenuProps) => {
  const [activeRegion, setActiveRegion] = useState<string>(
    props.config.defaultActiveId
  );

  const currentData = props.categories;
  const currentRegion = currentData.find((r) => r.id === activeRegion);
  return (
    <div className="absolute w-full bg-white shadow-2xl rounded-b-lg">
      <div className="max-w-7xl mx-auto hidden md:block z-50 md:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">
          {/* Left Sidebar - Categories */}
          <div className="shrink-0 w-50">
            {currentData.map((category) => (
              <button
                key={category.id}
                onMouseEnter={() => setActiveRegion(category.id)}
                className={cn(
                  `w-full flex items-center justify-between transition-colors text-grey-900`,
                  { "bg-grey-50 rounded-lg pl-2": activeRegion === category.id }
                )}
              >
                <span className="body-01-medium py-3">{category.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
 
          {/* Middle - Items Grid */}
          <div className="flex-3 mt-[14px]">
            <div className={`grid ${props.config.classname} gap-2`}>
              {currentRegion && (
                <>
                  {currentRegion.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="body-01-regular text-grey-800 hover:text-primary-600 transition-colors"
                    >
                      <div className="flex items-center">
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="#"
                    className="body-01-regular text-grey-600 hover:text-primary-600"
                  >
                    Load more
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right - Featured Image */}
          <div className=" flex-2 relative aspect-[4/3] w-full ">
            {currentData.map((category) => (
              <Image
                key={category.id}
                src={category.image}
                alt={category.name}
                fill
                className={` object-cover transition-opacity duration-500 rounded-lg ${
                  activeRegion === category.id ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;

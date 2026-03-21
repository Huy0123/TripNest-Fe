import React, { Suspense } from "react";
import SearchHeader from "@/components/tour/SearchTour";
import FilterSidebar from "@/components/tour/FilterSidebar";
import TourList from "@/components/tour/TourList";
import type { ToursQueryDto } from "@/types/tours";
import { getLocationsServer } from "@/services/locationService";
import { getToursServer } from "@/services/tourService";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const filters: ToursQueryDto = {
    destinationId: typeof resolvedSearchParams.location === 'string' ? resolvedSearchParams.location : 
              (typeof resolvedSearchParams.destinationId === 'string' ? resolvedSearchParams.destinationId : undefined),
    minPrice: resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined,
    search: typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined,
    rating: resolvedSearchParams.rating ? Number(resolvedSearchParams.rating) : undefined,
    duration: resolvedSearchParams.duration ? Number(resolvedSearchParams.duration) : undefined,
    stayOption: resolvedSearchParams.stayOption as any,
    sortBy: (resolvedSearchParams.sortBy as any) || 'createdAt',
    sortOrder: (resolvedSearchParams.sortOrder as 'ASC' | 'DESC') || 'DESC',
    page: resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1,
    limit: 12,
  };

  // Fetch tours with filters
  const res = await getToursServer(filters).catch(() => ({ data: [], meta: { total: 0, page: 1, limit: 10 } }));
  const tours = Array.isArray(res) ? res : (res as any)?.data || [];
  const meta = (res as any)?.meta || { total: tours.length, page: 1, limit: 10 };
  const total = meta.total || tours.length;
  const page = meta.page || 1;
  const limit = meta.limit || 10;
  
  const totalPages = Math.ceil(total / limit) || 1;
  const locationsData = await getLocationsServer().catch(() => []);
  const locations = Array.isArray(locationsData) ? locationsData : (locationsData as any)?.data || [];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Background - reduced height for search page */}
      <div className="h-[300px] w-full relative">
        <Image src="/hero.png" alt="Hero" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Search Header positioned to overlap the bottom of the hero */}
        <div className="absolute max-w-4xl mx-auto -bottom-10 left-0 right-0 px-4 z-[100]">
           <SearchHeader initialLocations={locations} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-20">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
               <FilterSidebar />
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-3">
               <TourList 
                  tours={tours}
                  total={total}
                  page={page}
                  totalPages={totalPages}
               />
            </div>
         </div>
      </div>
    </div>
  );
}

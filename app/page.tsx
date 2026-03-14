/**
 * Homepage - Server Component with Real API and Suspense Streaming
 */

import { Suspense } from 'react';
import HeroSection from "@/components/home/HeroSection";
import JourneyTags from "@/components/home/JourneyTags";
import { getLocationsServer } from '@/services/locationService';

// Dynamic wrappers with API calls inside
import HomeSliderWrapper from "@/components/home/wrappers/HomeSliderWrapper";
import PopularDestinationsWrapper from "@/components/home/wrappers/PopularDestinationsWrapper";
import DomesticToursWrapper from "@/components/home/wrappers/DomesticToursWrapper";
import PromotionalBannerWrapper from "@/components/home/wrappers/PromotionalBannerWrapper";
import SuperDealsWrapper from "@/components/home/wrappers/SuperDealsWrapper";
import InternationalToursWrapper from "@/components/home/wrappers/InternationalToursWrapper";
import BlogSectionWrapper from "@/components/home/wrappers/BlogSectionWrapper";

// Skeleton UI for sections
const SectionSkeleton = () => <div className="h-[400px] w-full animate-pulse bg-gray-100 section-padding-y my-4 rounded-xl" />;

export default async function Home() {
  const locationsData = await getLocationsServer();
  const locations = Array.isArray(locationsData) ? locationsData : (locationsData as any)?.data || [];

  return (
    <>
      <HeroSection locations={locations} />
      
      {/* Streaming the sections using Suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <SuperDealsWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PopularDestinationsWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HomeSliderWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PromotionalBannerWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <DomesticToursWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <InternationalToursWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <BlogSectionWrapper />
      </Suspense>

      <JourneyTags />
    </>
  );
}

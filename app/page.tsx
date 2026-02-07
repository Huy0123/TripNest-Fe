/**
 * Homepage - Server Component with Real API
 */

import dynamic from 'next/dynamic';
import HeroSection from "@/components/home/HeroSection";
import { getFeaturedTours, getPopularTours } from '@/lib/api/tours';

// Dynamic imports for below-the-fold components
const PopularDeals = dynamic(() => import("@/components/home/HomeSlider"), {
  loading: () => <div className="h-96 animate-pulse bg-grey-100 section-padding-y" />
});

const PopularCities = dynamic(() => import("@/components/home/PopularCities"), {
  loading: () => <div className="h-96 animate-pulse bg-grey-100 section-padding-y" />
});

const BlogSection = dynamic(() => import("@/components/home/BlogSection"), {
  loading: () => <div className="h-96 animate-pulse bg-grey-100 section-padding-y" />
});

const RecentPackages = dynamic(() => import("@/components/home/RecentPackages"), {
  loading: () => <div className="h-96 animate-pulse bg-grey-100 section-padding-y" />
});

const ChristmasOffers = dynamic(() => import("@/components/home/ChristmasOffers"), {
  loading: () => <div className="h-96 animate-pulse bg-grey-100 section-padding-y" />
});

const LastMinuteDeals = dynamic(() => import("@/components/home/LastMinuteDeals"), {
  loading: () => <div className="h-96 animate-pulse bg-grey-100 section-padding-y" />
});

const JourneyTags = dynamic(() => import("@/components/home/JourneyTags"), {
  loading: () => <div className="h-96 animate-pulse bg-grey-100 section-padding-y" />
});

export default async function Home() {
  // Fetch featured and popular tours (Server Component)
  const [featuredTours, popularTours] = await Promise.all([
    getFeaturedTours().catch(() => []),
    getPopularTours(10).catch(() => []),
  ]);

  return (
    <>
      <HeroSection />
      <PopularDeals tours={popularTours} />
      <PopularCities />
      <BlogSection />
      <RecentPackages tours={featuredTours} />
      <ChristmasOffers />
      <LastMinuteDeals />
      <JourneyTags />
    </>
  );
}

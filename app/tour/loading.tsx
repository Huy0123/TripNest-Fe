/**
 * Tours Loading State
 */

import { TourCardSkeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Skeleton */}
      <div className="h-[300px] w-full bg-grey-200 animate-pulse relative">
        <div className="absolute -bottom-10 left-0 right-0 px-4">
          <div className="h-32 bg-white rounded-2xl shadow-lg animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-app mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="space-y-6">
              <div className="h-12 bg-grey-200 rounded-lg animate-pulse" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-20 bg-grey-100 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          </aside>

          {/* Tour List Skeleton */}
          <main className="flex-1">
            <div className="mb-6 h-10 bg-grey-200 rounded animate-pulse" />
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <TourCardSkeleton key={i} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

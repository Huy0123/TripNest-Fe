import React from "react";
import TourCard from "./TourCard";
import { ChevronDown } from "lucide-react";
import { Tour } from "@/types/tours";
import { NoToursFound } from "@/components/ui/empty-state";

interface TourListProps {
  tours: Tour[];
  total: number;
  page: number;
  totalPages: number;
}

export default function TourList({ tours, total, page, totalPages }: TourListProps) {
  if (tours.length === 0) {
    return <NoToursFound />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="header-04-medium text-grey-900">
          {total} {total === 1 ? 'tour' : 'tours'} found
        </h2>
        <div className="flex items-center gap-2">
          <span className="body-02-medium text-grey-600">Sort By</span>
          <button className="flex items-center gap-2 px-4 py-2 border border-grey-200 rounded-lg bg-white body-02-medium text-grey-800 hover:border-primary-500 transition-hover focus-ring">
            Recommended
            <ChevronDown className="icon-sm" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {tours.map((tour) => (
          <TourCard 
            key={tour.id}
            id={tour.id}
            image={tour.image || ""}
            title={tour.name}
            tags={[(tour as any).type || "Tour"]}
            departureDates={[]}
            price={tour.price || 0}
            rating={tour.rating || 0}
            reviews={(tour as any).reviewCount || 0}
            stars={4} // Mock or derived
            hotelName={(tour as any).location?.city || "Điểm đến"}
            duration={{ nights: (tour.duration || 0) > 1 ? (tour.duration || 0) - 1 : 0, days: tour.duration || 0 }}
            onlyLeft={undefined}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            className="px-4 py-2 border border-grey-300 rounded-lg body-02-medium text-grey-700 hover:bg-grey-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 body-02-medium text-grey-900">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            className="px-4 py-2 border border-grey-300 rounded-lg body-02-medium text-grey-700 hover:bg-grey-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

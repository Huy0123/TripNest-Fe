import React from "react";
import { MapPin, Search, Heart, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 text-grey-300">
        {icon}
      </div>
      <h3 className="header-04-bold text-grey-900 mb-2">{title}</h3>
      <p className="body-01-regular text-grey-600 mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Predefined empty states
export function NoToursFound({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      icon={<MapPin className="w-16 h-16" />}
      title="No tours found"
      description="Try adjusting your filters or search criteria to find more tours"
      action={onClearFilters ? {
        label: "Clear filters",
        onClick: onClearFilters
      } : undefined}
    />
  );
}

export function SearchNotFound({ searchQuery }: { searchQuery?: string }) {
  return (
    <EmptyState
      icon={<Search className="w-16 h-16" />}
      title="No results found"
      description={searchQuery 
        ? `We couldn't find any results for "${searchQuery}". Try different keywords.`
        : "Try searching with different keywords"
      }
    />
  );
}

export function NoFavorites({ onBrowseTours }: { onBrowseTours?: () => void }) {
  return (
    <EmptyState
      icon={<Heart className="w-16 h-16" />}
      title="No favorites yet"
      description="Start exploring and save your favorite tours to see them here"
      action={onBrowseTours ? {
        label: "Browse tours",
        onClick: onBrowseTours
      } : undefined}
    />
  );
}

export function NoBookings({ onBrowseTours }: { onBrowseTours?: () => void }) {
  return (
    <EmptyState
      icon={<Calendar className="w-16 h-16" />}
      title="No bookings yet"
      description="You haven't booked any tours yet. Start planning your next adventure!"
      action={onBrowseTours ? {
        label: "Explore tours",
        onClick: onBrowseTours
      } : undefined}
    />
  );
}

export function NoBlogPosts() {
  return (
    <EmptyState
      icon={<Search className="w-16 h-16" />}
      title="No blog posts found"
      description="Check back later for more travel tips and destination guides"
    />
  );
}

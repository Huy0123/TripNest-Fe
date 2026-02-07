import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-grey-200", className)}
      {...props}
    />
  );
}

// Predefined skeleton components
export function TourCardSkeleton() {
  return (
    <div className="rounded-2xl border border-grey-200 overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Image Skeleton */}
        <Skeleton className="w-full md:w-[300px] h-[240px] md:h-auto rounded-none" />
        
        {/* Content Skeleton */}
        <div className="p-6 flex-1 space-y-4">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />
          
          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          
          {/* Dates */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          
          {/* Amenities */}
          <div className="flex gap-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
          
          {/* Footer */}
          <div className="pt-4 border-t border-grey-100">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardItemSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md">
      {/* Image */}
      <Skeleton className="h-64 w-full rounded-none" />
      
      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-5 w-12" />
        </div>
        
        {/* Date and Price */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-grey-100">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="pt-3 flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-8 border border-grey-200 space-y-6">
        <Skeleton className="h-7 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

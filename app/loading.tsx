/**
 * Homepage Loading State
 */

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="h-screen bg-grey-200 animate-pulse" />
      
      {/* Sections Skeleton */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="section-padding-y section-padding-x">
          <div className="container-app">
            <div className="h-8 w-48 bg-grey-200 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-64 bg-grey-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

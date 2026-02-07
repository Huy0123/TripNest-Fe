import React from "react";
import Image from "next/image";

interface CardItemsProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  dateRange: string;
  originalPrice?: number;
  price: number;
  discount?: number;
  isGuestFavorite?: boolean;
  limited?: boolean;
}

export default function CardItems({
  title,
  image,
  rating,
  dateRange,
  originalPrice,
  price,
  discount,
  isGuestFavorite,
  limited,
}: CardItemsProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-card shadow-card-hover">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {isGuestFavorite && (
            <span className="rounded-full bg-white/95 px-3 py-1 body-02-medium text-grey-700 backdrop-blur-sm">
              Guest favorite
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
              {discount}% Off
            </span>
          )}
          {limited && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
              Limited-time Deal
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Rating */}
        <div className="mb-2 flex items-start justify-between">
          <h3 className="header-06-bold text-grey-900">{title}</h3>
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="body-02-bold text-grey-900">
              {rating}
            </span>
          </div>
        </div>

        {/* Date and Price */}
        <div className="flex items-center justify-between">
          <p className="body-02-regular text-grey-600">{dateRange}</p>
          <div className="flex items-center gap-2">
            {originalPrice && originalPrice !== price && (
              <span className="body-02-regular text-grey-400 line-through">
                €{originalPrice}
              </span>
            )}
            <span className="body-01-bold text-grey-900">
              {discount ? (
                <span className="text-orange-600">€{price}</span>
              ) : (
                `From €${price}`
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

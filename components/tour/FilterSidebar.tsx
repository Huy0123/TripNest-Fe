"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronUp } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { StayOption } from "@/types/tours";
import { useDebounce } from "@/hooks/useDebounce";

const stayOptionsMap: Record<string, StayOption | "Any"> = {
  "Any": "Any",
  "Hotels": StayOption.HOTEL,
  "Lodges": StayOption.LODGE,
  "Resorts": StayOption.RESORT,
  "Inns": StayOption.INN
};

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Price State
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  // Other Filters
  const [duration, setDuration] = useState(searchParams.get("duration") || "");
  const [stayRating, setStayRating] = useState<number>(Number(searchParams.get("rating")) || 0);
  const [stayOption, setStayOption] = useState<string>(searchParams.get("stayOption") || "Any");

  const [hoverRating, setHoverRating] = useState<number>(0);

  const updateParams = useCallback((name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "Any" && value !== "0" && value !== "") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  // Sync state with URL if it changes externally
  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setDuration(searchParams.get("duration") || "");
    setStayRating(Number(searchParams.get("rating")) || 0);
    setStayOption(searchParams.get("stayOption") || "Any");
  }, [searchParams]);

  // Sync price with URL using debounce
  useEffect(() => {
    if (debouncedMinPrice !== (searchParams.get("minPrice") || "")) {
      updateParams("minPrice", debouncedMinPrice);
    }
  }, [debouncedMinPrice, updateParams, searchParams]);

  useEffect(() => {
    if (debouncedMaxPrice !== (searchParams.get("maxPrice") || "")) {
      updateParams("maxPrice", debouncedMaxPrice);
    }
  }, [debouncedMaxPrice, updateParams, searchParams]);

  const handleRatingClick = (rating: number) => {
    const newValue = stayRating === rating ? 0 : rating;
    setStayRating(newValue);
    updateParams("rating", newValue.toString());
  };

  const handleStayOptionChange = (optionKey: string) => {
    setStayOption(optionKey);
    const apiValue = stayOptionsMap[optionKey];
    updateParams("stayOption", apiValue === "Any" ? null : apiValue);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDuration(val);
    updateParams("duration", val);
  };

  return (
    <div className="space-y-6">
      {/* Price */}
      <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
          <h3 className="header-06-bold text-grey-900">Price</h3>
          <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="border border-grey-300 rounded-lg p-2 flex-1">
            <span className="block text-[10px] text-grey-500 uppercase">Min</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0 VNĐ"
              className="w-full outline-none text-sm text-grey-900 font-medium bg-transparent"
            />
          </div>
          <div className="border border-grey-300 rounded-lg p-2 flex-1">
            <span className="block text-[10px] text-grey-500 uppercase">Max</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="50M VNĐ"
              className="w-full outline-none text-sm text-grey-900 font-medium bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Length (Duration) */}
      <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
          <h3 className="header-06-bold text-grey-900">Length (Days)</h3>
          <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <input
          type="number"
          value={duration}
          onChange={handleDurationChange}
          placeholder="e.g. 3"
          className="w-full border border-grey-300 rounded-lg p-3 outline-none text-sm text-grey-900 font-medium"
        />
      </div>

      {/* Stay Rating */}
      <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
          <h3 className="header-06-bold text-grey-900">Stay rating</h3>
          <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((s) => {
            const isActive = s <= (hoverRating || stayRating);
            return (
              <Star
                key={s}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  isActive ? "text-yellow-400 fill-yellow-400" : "text-grey-300 fill-transparent"
                }`}
                onMouseEnter={() => setHoverRating(s)}
                onClick={() => handleRatingClick(s)}
              />
            );
          })}
        </div>
      </div>

      {/* Stay Option */}
      <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
          <h3 className="header-06-bold text-grey-900">Stay option</h3>
          <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="space-y-3">
          {Object.keys(stayOptionsMap).map((label) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="stay"
                checked={stayOption === label}
                onChange={() => handleStayOptionChange(label)}
                className="w-5 h-5 border-grey-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="body-02-regular text-grey-700">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}


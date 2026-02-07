"use client";

import React, { useState } from "react";
import { Search, MapPin, Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Data
const destinations = [
  {
    value: "europe",
    label: "Europe",
    sub: "History, culture, and diverse landscapes",
  },
  { value: "africa", label: "Africa", sub: "Breathtaking landscapes" },
  { value: "asia", label: "Asia", sub: "Contrasts and endless wonders" },
  { value: "americas", label: "Americas", sub: "Vibrant cultures" },
  { value: "paris", label: "Paris", sub: "Romance, art, and the Eiffel Tower" },
  { value: "kyoto", label: "Kyoto", sub: "Temples and cherry blossoms" },
  { value: "cairo", label: "Cairo", sub: "Ancient pyramids and history" },
  { value: "london", label: "London", sub: "Big Ben, history, and culture" },
];

export default function SearchHeader({ className }: { className?: string }) {
  const [fromLocation, setFromLocation] = useState("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // State for popovers
  const [openDestination, setOpenDestination] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  // Filter locations based on fromLocation input
  const filteredFromLocations = destinations.filter(
    (dest) =>
      dest.label.toLowerCase().includes(fromLocation.toLowerCase()) ||
      dest.sub.toLowerCase().includes(fromLocation.toLowerCase())
  );

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-xl max-w-5xl mx-auto z-20 w-full",
        className
      )}
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-grey-200">
        <div className="relative flex-1">
          <Popover open={openLocation} onOpenChange={setOpenLocation}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex-1 p-4 md:px-6 hover:bg-grey-50 rounded-t-2xl md:rounded-l-2xl transition-colors",
                  openLocation && "bg-primary-50 hover:bg-primary-50"
                )}
              >
                <label className="flex flex-col w-full">
                  <span className="text-grey-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> From
                  </span>
                  <input
                    type="text"
                    value={fromLocation}
                    onFocus={() => setOpenLocation(true)}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="text-grey-900 font-bold text-lg bg-transparent border-none outline-none placeholder:text-grey-300 w-full p-0 focus:ring-0"
                    placeholder="Enter location"
                  />
                  <span className="text-grey-400 text-xs mt-0.5">
                    Where are you starting?
                  </span>
                </label>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup heading="Available Locations">
                    {filteredFromLocations.map((dest) => (
                      <CommandItem
                        key={dest.value}
                        value={dest.value}
                        onSelect={(currentValue) => {
                          const label =
                            destinations.find((d) => d.value === currentValue)
                              ?.label || currentValue;
                          setFromLocation(label);
                          setOpenLocation(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">{dest.label}</span>
                          <span className="text-xs text-grey-500">
                            {dest.sub}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* DESTINATION INPUT (Popover + Command) */}
        <div className="flex-1">
          <Popover open={openDestination} onOpenChange={setOpenDestination}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex-1 p-4 md:px-6 hover:bg-grey-50 transition-colors cursor-pointer h-full text-left",
                  openDestination && "bg-primary-50 hover:bg-primary-50"
                )}
              >
                <div className="flex flex-col h-full justify-center">
                  <span className="text-grey-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Destination
                  </span>
                  <div className="text-grey-900 font-bold text-lg truncate">
                    {destination ? destination : "Select Destination"}
                  </div>
                  <span className="text-grey-400 text-xs mt-0.5 truncate">
                    {destination
                      ? destinations.find(
                          (d) =>
                            d.value.toLowerCase() === destination.toLowerCase()
                        )?.sub
                      : "Where do you want to go?"}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search destination..." />
                <CommandList>
                  <CommandEmpty>No destination found.</CommandEmpty>
                  <CommandGroup heading="Popular Destinations">
                    {destinations.map((dest) => (
                      <CommandItem
                        key={dest.value}
                        value={dest.value}
                        onSelect={(currentValue) => {
                          // Capitalize for display
                          const label =
                            destinations.find((d) => d.value === currentValue)
                              ?.label || currentValue;
                          setDestination(label);
                          setOpenDestination(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">{dest.label}</span>
                          <span className="text-xs text-grey-500">
                            {dest.sub}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* DATE INPUT (Popover + Calendar) */}
        <div className="flex-1">
          <Popover open={openDate} onOpenChange={setOpenDate}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex-1 p-4 md:px-6 hover:bg-grey-50 transition-colors cursor-pointer h-full md:rounded-r-none",
                  openDate && "bg-primary-50 hover:bg-primary-50"
                )}
              >
                <div className="flex flex-col h-full justify-center">
                  <span className="text-grey-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" /> Date
                  </span>
                  <div className="text-grey-900 font-bold text-lg">
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "d MMM")} -{" "}
                          {format(date.to, "d MMM")}
                        </>
                      ) : (
                        format(date.from, "d MMM yyyy")
                      )
                    ) : (
                      "Select Dates"
                    )}
                  </div>
                  <span className="text-grey-400 text-xs mt-0.5">
                    When do you want to go?
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  // Do not close immediately on range selection to allow selecting end date
                }}
                numberOfMonths={2}
                pagedNavigation
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* SEARCH BUTTON */}
        <div className="p-3 flex items-center justify-center">
          <Button
            size="lg"
            className="w-full md:w-auto px-8 h-14 rounded-xl text-base gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Search
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

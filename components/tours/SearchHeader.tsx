"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar as CalendarIcon,
  X,
  Users,
  ChevronDown,
} from "lucide-react";
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

// Static data
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
  { value: "bali", label: "Bali", sub: "Tropical paradise and temples" },
  { value: "new-york", label: "New York", sub: "The city that never sleeps" },
];

interface Guests {
  adults: number;
  children: number;
}

export default function SearchHeader({ className }: { className?: string }) {
  const [fromLocation, setFromLocation] = useState("");
  const [destination, setDestination] = useState<{ value: string; label: string } | null>(null);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState<Guests>({ adults: 1, children: 0 });

  // Popover open states
  const [openDestination, setOpenDestination] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);

  const totalGuests = guests.adults + guests.children;

  const handleGuestChange = (type: "adults" | "children", delta: number) => {
    setGuests((prev) => {
      const next = prev[type] + delta;
      if (type === "adults" && next < 1) return prev; // min 1 adult
      if (type === "children" && next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  const handleDateSelect = (d: DateRange | undefined) => {
    setDate(d);
    // Auto-close when both dates are selected
    if (d?.from && d?.to) {
      setTimeout(() => setOpenDate(false), 300);
    }
  };

  const router = useRouter();
  const isSearchReady = !!fromLocation && !!destination;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSearchReady) return;

    const params = new URLSearchParams();
    params.set("from", fromLocation);
    params.set("destination", destination!.value);
    if (date?.from) params.set("dateFrom", format(date.from, "yyyy-MM-dd"));
    if (date?.to) params.set("dateTo", format(date.to, "yyyy-MM-dd"));
    params.set("adults", String(guests.adults));
    params.set("children", String(guests.children));

    router.push(`/tours?${params.toString()}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSearch}
      className={cn(
        "bg-white rounded-2xl shadow-xl max-w-5xl mx-auto z-20 w-full",
        className
      )}
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-grey-200">

        {/* FROM LOCATION */}
        <div className="relative flex-1">
          <Popover open={openLocation} onOpenChange={setOpenLocation}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex-1 p-4 md:px-6 hover:bg-grey-50 rounded-t-2xl md:rounded-l-2xl transition-colors cursor-pointer",
                  openLocation && "bg-primary-50 hover:bg-primary-50"
                )}
              >
                <div className="flex flex-col w-full">
                  <span className="text-grey-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> From
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={fromLocation}
                      onFocus={() => setOpenLocation(true)}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="text-grey-900 font-bold text-lg bg-transparent border-none outline-none placeholder:text-grey-300 w-full p-0 focus:ring-0 flex-1"
                      placeholder="Enter location"
                      aria-label="Departure location"
                    />
                    {fromLocation && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFromLocation("");
                        }}
                        className="text-grey-400 hover:text-grey-600 transition-colors shrink-0"
                        aria-label="Clear departure location"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <span className="text-grey-400 text-xs mt-0.5">
                    Where are you starting?
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search departure..."
                  value={fromLocation}
                  onValueChange={setFromLocation}
                />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup heading="Available Locations">
                    {destinations
                      .filter(
                        (dest) =>
                          !fromLocation ||
                          dest.label.toLowerCase().includes(fromLocation.toLowerCase()) ||
                          dest.sub.toLowerCase().includes(fromLocation.toLowerCase())
                      )
                      .map((dest) => (
                        <CommandItem
                          key={dest.value}
                          value={dest.value}
                          onSelect={() => {
                            setFromLocation(dest.label);
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

        {/* DESTINATION */}
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
                  <div className="flex items-center gap-1">
                    <div className="text-grey-900 font-bold text-lg truncate flex-1">
                      {destination ? destination.label : "Select Destination"}
                    </div>
                    {destination && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDestination(null);
                        }}
                        className="text-grey-400 hover:text-grey-600 transition-colors shrink-0"
                        aria-label="Clear destination"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <span className="text-grey-400 text-xs mt-0.5 truncate">
                    {destination
                      ? destinations.find((d) => d.value === destination.value)?.sub
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
                        value={dest.label}
                        onSelect={() => {
                          setDestination({ value: dest.value, label: dest.label });
                          setOpenDestination(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold">{dest.label}</span>
                          <span className="text-xs text-grey-500">{dest.sub}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* DATE RANGE */}
        <div className="flex-1">
          <Popover open={openDate} onOpenChange={setOpenDate}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex-1 p-4 md:px-6 hover:bg-grey-50 transition-colors cursor-pointer h-full",
                  openDate && "bg-primary-50 hover:bg-primary-50"
                )}
              >
                <div className="flex flex-col h-full justify-center">
                  <span className="text-grey-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" /> Date
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="text-grey-900 font-bold text-lg flex-1">
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "d MMM")} –{" "}
                            {format(date.to, "d MMM")}
                          </>
                        ) : (
                          format(date.from, "d MMM yyyy")
                        )
                      ) : (
                        "Select Dates"
                      )}
                    </div>
                    {date?.from && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDate(undefined);
                        }}
                        className="text-grey-400 hover:text-grey-600 transition-colors shrink-0"
                        aria-label="Clear dates"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <span className="text-grey-400 text-xs mt-0.5">
                    {date?.from && !date.to ? "Select end date" : "When do you want to go?"}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleDateSelect}
                numberOfMonths={2}
                pagedNavigation
                initialFocus
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* GUESTS */}
        <div className="flex-1">
          <Popover open={openGuests} onOpenChange={setOpenGuests}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex-1 p-4 md:px-6 hover:bg-grey-50 transition-colors cursor-pointer h-full",
                  openGuests && "bg-primary-50 hover:bg-primary-50"
                )}
              >
                <div className="flex flex-col h-full justify-center">
                  <span className="text-grey-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Users className="w-4 h-4" /> Guests
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="text-grey-900 font-bold text-lg flex-1">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
                    </div>
                    <ChevronDown className="w-4 h-4 text-grey-400 shrink-0" />
                  </div>
                  <span className="text-grey-400 text-xs mt-0.5">
                    {guests.adults} adult{guests.adults > 1 ? "s" : ""}
                    {guests.children > 0 && `, ${guests.children} child${guests.children > 1 ? "ren" : ""}`}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="end">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-grey-900">Adults</p>
                    <p className="text-xs text-grey-500">Age 12+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestChange("adults", -1)}
                      disabled={guests.adults <= 1}
                      className="w-8 h-8 rounded-full border border-grey-300 flex items-center justify-center text-grey-700 hover:bg-grey-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease adults"
                    >
                      –
                    </button>
                    <span className="w-5 text-center font-bold text-grey-900">
                      {guests.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange("adults", 1)}
                      className="w-8 h-8 rounded-full border border-grey-300 flex items-center justify-center text-grey-700 hover:bg-grey-100 transition-colors"
                      aria-label="Increase adults"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-grey-900">Children</p>
                    <p className="text-xs text-grey-500">Age 2–11</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestChange("children", -1)}
                      disabled={guests.children <= 0}
                      className="w-8 h-8 rounded-full border border-grey-300 flex items-center justify-center text-grey-700 hover:bg-grey-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease children"
                    >
                      –
                    </button>
                    <span className="w-5 text-center font-bold text-grey-900">
                      {guests.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange("children", 1)}
                      className="w-8 h-8 rounded-full border border-grey-300 flex items-center justify-center text-grey-700 hover:bg-grey-100 transition-colors"
                      aria-label="Increase children"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-grey-200">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setOpenGuests(false)}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* SEARCH BUTTON */}
        <div className="p-3 flex items-center justify-center">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto px-8 h-14 rounded-xl text-base gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isSearchReady}
            title={!isSearchReady ? "Please fill in departure and destination" : "Search tours"}
          >
            <Search className="w-5 h-5" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}

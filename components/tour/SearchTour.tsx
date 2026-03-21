"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, X, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { destinations as navDestinations } from "@/data/navigation";

import { Button } from "@/components/ui/button";
import { useLocations } from "@/hooks/queries/useLocations";



const regionEmoji: Record<string, string> = {
  "việt-nam": "🇻🇳",
  "thái-lan": "🇹🇭",
  "nhật-bản": "🇯🇵",
  "hàn-quốc": "🇰🇷",
  "khác": "🌍"
};

// ─── Autocomplete component ───────────────────────────────────────────────────
interface AutocompleteProps {
  value: string;
  onChange: (v: string) => void;
  onSelect?: (label: string, value: string) => void;
  placeholder: string;
  label: string;
  icon: React.ReactNode;
  borderClass?: string;
  groups: any[];
}

function Autocomplete({ value, onChange, onSelect, placeholder, label, icon, borderClass, groups }: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  // All groups expanded by default
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (groups.length > 0 && Object.keys(openGroups).length === 0) {
      setOpenGroups(Object.fromEntries(groups.map((g) => [g.id, true])));
    }
  }, [groups]);

  const toggleGroup = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  // Flat list for filtering
  const allPlaces = groups.flatMap((g) =>
    g.items.map((item: any) => ({ ...item, group: g.name }))
  );

  // Filtered: group + items that match query
  const query = value.trim().toLowerCase();
  const filteredGroups = query
    ? [{ id: "results", name: "Kết quả", items: allPlaces.filter((p: any) => p.label.toLowerCase().includes(query)) }]
    : groups;

  const totalResults = filteredGroups.reduce((sum, g) => sum + g.items.length, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative flex-1", borderClass)}>
      {/* Trigger row */}
      <div
        className={"flex items-center gap-3 px-5 py-4 transition-colors cursor-text h-full"}
        onClick={() => { setOpen(true); wrapRef.current?.querySelector("input")?.focus(); }}
      >
        <span className={cn("shrink-0 transition-colors", open ? "text-blue-500" : "text-slate-400")}>
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-1">{label}</p>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onChange={(e) => { onChange(e.target.value); setOpen(true); }}
            className="w-full bg-transparent border-none outline-none p-0 focus:ring-0 font-bold text-lg text-slate-900 placeholder:text-slate-400"
          />
        </div>
        {value && (
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onChange(""); }}
            className="text-slate-300 hover:text-slate-500 transition-colors shrink-0 p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl z-[100] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {query ? `Tìm thấy ${totalResults} địa điểm` : "Tất cả địa điểm"}
            </span>
            {query && totalResults === 0 && (
              <span className="text-xs text-slate-400">Thử tìm từ khóa khác</span>
            )}
          </div>

          {/* Scrollable list — max 320px ≈ 8 rows */}
          <div className="overflow-y-auto max-h-80 py-1">
            {totalResults === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-slate-400">Không tìm thấy địa điểm &ldquo;{value}&rdquo;</div>
            ) : (
              filteredGroups.map((group) =>
                group.items.length === 0 ? null : (
                  <div key={group.id}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => !query && toggleGroup(group.id)}
                      className={cn(
                        "w-full px-4 pt-3 pb-1 flex items-center gap-1.5 select-none",
                        !query && "hover:bg-slate-50 transition-colors"
                      )}
                    >
                      <span className="text-sm">{regionEmoji[group.id] ?? "📍"}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex-1 text-left">
                        {group.name}
                        <span className="ml-1 font-normal normal-case text-slate-300">
                          ({group.items.length})
                        </span>
                      </span>
                      {!query && (
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 text-slate-300 transition-transform duration-200",
                            openGroups[group.id] ? "rotate-0" : "-rotate-90"
                          )}
                        />
                      )}
                    </button>
                    {/* Items grid — collapse when closed */}
                    {(query || openGroups[group.id]) && (
                      <div className="grid grid-cols-2 px-2 pb-2 gap-0.5">
                        {group.items.map((place: any) => (
                          <button
                            key={place.value}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              onChange(place.label);
                              if (onSelect) onSelect(place.label, place.value);
                              setOpen(false);
                            }}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors",
                              "hover:bg-blue-50 group"
                            )}
                          >
                            <MapPin className="w-3 h-3 text-slate-300 group-hover:text-blue-400 shrink-0 transition-colors" />
                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 truncate">
                              {place.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default function SearchTour({ className, initialLocations }: { className?: string, initialLocations?: any[] }) {
  const router = useRouter();

  const [from, setFrom]         = useState("");
  const [destination, setDest]  = useState("");
  const [destId, setDestId]     = useState("");

  // Fetch locations from API with fallbackData for SEO
  const { locations } = useLocations(initialLocations);

  // Transform locations into grouped structure
  const PLACE_GROUPS = locations.reduce((acc: any[], loc: any) => {
    const groupName = loc.country || "Khác";
    let group = acc.find(g => g.name === groupName);
    if (!group) {
      group = { id: groupName.toLowerCase().replace(/\s+/g, '-'), name: groupName, items: [] };
      acc.push(group);
    }
    group.items.push({
      label: `${loc.city}, ${loc.country}`,
      value: loc.id,
      city: loc.city,
      country: loc.country
    });
    return acc;
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (from) params.set("search", from); // Use search as keyword fallback
    if (destId) {
      params.set("location", destId);
    } else if (destination) {
      params.set("search", destination);
    }
    
    router.push(`/tour?${params.toString()}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSearch}
      className={cn(
        "bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full",
        className
      )}
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">

        {/* FROM */}
        <Autocomplete
          label="Điểm khởi hành"
          placeholder="Bạn khởi hành từ đâu?"
          value={from}
          onChange={setFrom}
          icon={<MapPin className="w-5 h-5" />}
          groups={PLACE_GROUPS}
        />

        {/* DESTINATION */}
        <Autocomplete
          label="Điểm đến"
          placeholder="Bạn muốn đi đâu?"
          value={destination}
          onChange={(v) => {
            setDest(v);
            setDestId(""); // Reset ID if user types something else
          }}
          onSelect={(_, id) => setDestId(id)}
          icon={<Globe className="w-5 h-5" />}
          groups={PLACE_GROUPS}
        />

        {/* SEARCH */}
        <div className="p-3 flex items-center justify-center shrink-0">
          <Button
            type="submit"
            className="h-14 px-10 rounded-xl bg-primary-500 text-lg font-bold text-white gap-2 w-full md:w-auto hover:bg-primary-600 shadow-md hover:shadow-lg"
          >
            <Search className="w-5 h-5" />
            Tìm kiếm
          </Button>
        </div>
      </div>
    </form>
  );
}

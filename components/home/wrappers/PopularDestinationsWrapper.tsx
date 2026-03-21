import PopularDestinations from "@/components/home/PopularDestinations";
import { getLocationsServer } from "@/services/locationService";
import type { Location } from "@/types/location";

export default async function PopularDestinationsWrapper() {
  const locationsData = await getLocationsServer().catch(() => []);
  const locations = Array.isArray(locationsData) ? locationsData : (locationsData as any)?.data || [];
  
  // Specific list of popular Vietnam cities we want to feature
  const vnCities = ['Đà Nẵng', 'Phú Quốc', 'Sapa', 'Hà Nội', 'Đà Lạt', 'Hạ Long', 'Hội An', 'Hồ Chí Minh', 'Nha Trang'];
  const filtered = locations.filter((loc: Location) => vnCities.includes(loc.city));
  
  // Sort them loosely based on our list priority
  filtered.sort((a: Location, b: Location) => vnCities.indexOf(a.city) - vnCities.indexOf(b.city));

  return <PopularDestinations locations={filtered.slice(0, 6)} />;
}

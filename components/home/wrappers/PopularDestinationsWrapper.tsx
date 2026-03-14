import PopularDestinations from "@/components/home/PopularDestinations";
import { getLocationsServer } from "@/services/locationService";

export default async function PopularDestinationsWrapper() {
  const locationsData = await getLocationsServer().catch(() => []);
  const locations = Array.isArray(locationsData) ? locationsData : (locationsData as any)?.data || [];
  
  return <PopularDestinations locations={locations.slice(0, 6)} />;
}

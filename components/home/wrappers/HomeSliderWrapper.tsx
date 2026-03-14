import HomeSlider from "@/components/home/HomeSlider";
import { getToursServer } from "@/services/tourService";

export default async function HomeSliderWrapper() {
  const res = await getToursServer({ limit: 10, sortBy: 'rating', sortOrder: 'DESC' }).catch(() => ({ data: [] }));
  const tours = Array.isArray(res) ? res : (res as any)?.data || [];
  
  if (!tours?.length) return <HomeSlider />; 
  
  return <HomeSlider tours={tours} />;
}

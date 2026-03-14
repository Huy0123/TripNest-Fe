import SuperDeals from "@/components/home/SuperDeals";
import { getDiscountedToursServer } from "@/services/tourService";

export default async function SuperDealsWrapper() {
  const toursData = await getDiscountedToursServer().catch(() => []);
  const rawTours = Array.isArray(toursData) ? toursData : (toursData as any)?.data || [];
  const tours = rawTours.slice(0, 15);
  
  return <SuperDeals tours={tours} />;
}

import DomesticTours from "@/components/home/DomesticTours";
import { getToursServer } from '@/services/tourService';

export default async function DomesticToursWrapper() {
  const res = await getToursServer({ location: 'Vietnam', limit: 15 }).catch(() => ({ data: [] }));
  const tours = Array.isArray(res) ? res : (res as any)?.data || [];
  
  return <DomesticTours tours={tours} />;
}

import RegionalTours from "@/components/home/RegionalTours";
import { getToursServer } from '@/services/tourService';

export default async function BeachToursWrapper() {
  const res = await getToursServer({ limit: 15, destinationSearch: 'Phú Quốc, Nha Trang, Đà Nẵng, Vũng Tàu' }).catch(() => ({ data: [] }));
  const tours = Array.isArray(res) ? res : (res as any)?.data || [];
  
  return <RegionalTours title="Tour Biển Đảo Hot Nhất" tours={tours} />;
}

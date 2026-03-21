import RegionalTours from "@/components/home/RegionalTours";
import { getToursServer } from '@/services/tourService';

export default async function MountainToursWrapper() {
  const res = await getToursServer({ limit: 15, destinationSearch: 'Sapa, Hạ Long, Hà Giang, Mộc Châu, Đà Lạt' }).catch(() => ({ data: [] }));
  const tours = Array.isArray(res) ? res : (res as any)?.data || [];
  
  return <RegionalTours title="Khám Phá Vùng Cao & Phía Bắc" tours={tours} />;
}

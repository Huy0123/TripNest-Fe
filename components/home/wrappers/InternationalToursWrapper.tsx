import InternationalTours from "@/components/home/InternationalTours";
import { getToursServer } from "@/services/tourService";

export default async function InternationalToursWrapper() {
  // For international, we might want to exclude Vietnam if possible, but let's just fetch for now
  const res = await getToursServer({ limit: 15 }).catch(() => ({ data: [] }));
  const tours = Array.isArray(res) ? res : (res as any)?.data || [];

  return <InternationalTours tours={tours} />;
}

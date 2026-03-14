import { getTourDetailServer } from '@/services/tourService';
import { getTourSessionsByTourServer } from '@/services/tourSessionService';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import TourBreadcrumb from '@/components/tour/TourBreadcrumb';
import TourImageGallery from '@/components/tour/TourImageGallery';
import TourHeaderContent from '@/components/tour/TourHeaderContent';
import TourBookingCard from '@/components/tour/TourBookingCard';
import TourTicketWidget from '@/components/tour/TourTicketWidget';
import TourIntro from '@/components/tour/TourIntro';

export default async function TourDetailPage({
  params
}: {
  params: Promise<{ id: string, locale?: string }>
}) {
  const resolvedParams = await params;
  const tourId = resolvedParams.id;
  
  // Real data fetching in parallel
  let tour: any;
  let sessions: any[] = [];
  
  try {
    const [tourRes, sessionsRes] = await Promise.all([
      getTourDetailServer(tourId),
      getTourSessionsByTourServer(tourId).catch(err => {
        console.error('Error fetching sessions:', err);
        return [];
      })
    ]);

    tour = (tourRes as any)?.data || tourRes;
    sessions = (sessionsRes as any)?.data || sessionsRes;
    
    console.log('Fetched tour detail:', tourId);
  } catch (error) {
    console.error('Error fetching tour detail data:', error);
    return notFound();
  }

  if (!tour) return notFound();

  const locationString = [
    tour.departureLocation?.city || tour.location?.city,
    tour.departureLocation?.country || tour.location?.country || "VN"
  ].filter(Boolean).join(", ");

  const discountedPrice = tour.discount ? tour.price * (1 - tour.discount / 100) : undefined;

  // Transform images for gallery if needed
  const galleryImages = tour.images?.map((img: string, idx: number) => ({
    id: String(idx),
    imageUrl: img,
    isMain: idx === 0
  })) || [
    { id: '1', imageUrl: tour.image || "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop", isMain: true }
  ];

  return (
    <div className="bg-white min-h-screen pb-20 pt-0 relative">
      <div className="relative w-full">
        <div className="absolute inset-0 h-[300px] md:h-[450px] bg-gradient-to-b from-[#fa5b32] to-[#fd886b] -z-10 rounded-b-[40px] md:rounded-b-[80px]"></div>
        <TourBreadcrumb tourName={tour.name} location={tour.departureLocation || { city: tour.city }} />
        <TourImageGallery images={galleryImages} tourName={tour.name} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-6 md:mt-10">
        <TourHeaderContent 
          title={tour.name}
          location={locationString}
          duration={tour.duration}
        />

        <hr className="my-8 border-gray-100" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10 lg:pr-8">
            <section>
              <h2 className="text-[22px] font-bold text-[#141414] mb-4">Bạn sẽ trải nghiệm</h2>
              <p className="text-[#4b4b4b] leading-relaxed text-[15px]">
                {tour.detail?.description || "Thông tin đang được cập nhật..."}
              </p>
            </section>

            <section>
              <h2 className="text-[22px] font-bold text-[#141414] mb-4">Điểm nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.detail?.highlights?.map((hl: string, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <div className="mt-0.5 bg-green-100 p-0.5 rounded-full mr-3 shrink-0">
                      <Check className="w-3.5 h-3.5 text-green-600 stroke-[3]" />
                    </div>
                    <span className="text-[#4b4b4b] text-[15px]">{hl}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 border-gray-100">
            <div className="sticky top-40 relative z-10">
              <TourBookingCard 
                price={tour.price} 
                discountPrice={discountedPrice}
              />
            </div>
          </div>
        </div>

        {/* This widget will now handle fetching real sessions */}
        <TourTicketWidget 
          tourId={tourId}
          price={tour.price} 
          discountPrice={discountedPrice}
          initialSessions={sessions}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 space-y-10 lg:pr-8">
            <TourIntro title={tour.name} description={tour.detail?.description || "Rất hân hạnh được phục vụ quý khách."} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <section>
                <h2 className="text-[18px] font-bold text-[#141414] mb-4 flex items-center gap-2">Bao gồm</h2>
                <ul className="space-y-3">
                  {tour.detail?.includes?.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start text-[#4b4b4b] text-[15px]">
                      <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-[18px] font-bold text-[#141414] mb-4 flex items-center gap-2">Không bao gồm</h2>
                <ul className="space-y-3">
                  {tour.detail?.excludes?.map((exc: string, i: number) => (
                    <li key={i} className="flex items-start text-[#4b4b4b] text-[15px]">
                      <div className="w-5 h-5 flex items-center justify-center text-red-500 font-bold mr-2 shrink-0">✕</div>
                      {exc}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

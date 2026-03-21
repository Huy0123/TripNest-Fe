import { tourService } from "./tourService";
import { tourDetailService } from "./tourDetailService";
import { tourSessionService } from "./tourSessionService";
import { reviewService } from "./reviewService";
import { userService } from "./userService";
import { DepartureStatus } from "@/types/tour-session";

export const seedService = {
  seedTourData: async (tourId: string) => {
    // 0. Get current user for reviews
    const user = await userService.getProfile();
    const userId = (user as any).data?.id || (user as any).id;

    // 1. Get current tour to check if it exists
    const tourRes = await tourService.findOne(tourId);
    const tour = (tourRes as any).data || tourRes;

    if (!tour) throw new Error("Tour not found");

    // 2. Create/Update Tour Detail
    const detailData = {
      tourId,
      description: "Hành trình khám phá vẻ đẹp kỳ vĩ của thiên nhiên Việt Nam, từ những dãy núi cao đến bờ biển xanh mướt. Một chuyến đi không thể bỏ lỡ cho những tín đồ du lịch.",
      experience: "Trải nghiệm văn hóa địa phương đặc sắc, thưởng thức ẩm thực vùng miền và tham gia các hoạt động ngoài trời đầy hào hứng như trekking, lặn biển hoặc thư giãn tại các khu resort cao cấp.",
      itinerary: [
        { day: "1", title: "Khám phá trung tâm", description: "Bắt đầu hành trình tại các điểm di tích lịch sử và văn hóa nổi tiếng nhất khu vực." },
        { day: "2", title: "Hòa mình vào thiên nhiên", description: "Tham quan các kỳ quan thiên nhiên và tận hưởng bầu không khí trong lành." },
        { day: "3", title: "Trải nghiệm ẩm thực và mua sắm", description: "Tự do khám phá đặc sản địa phương và mua quà lưu niệm trước khi kết thúc chuyến đi." }
      ],
      moreInfo: [
        { title: "Bao gồm", subtitle: "Những dịch vụ đã có", items: ["Vé máy bay khứ hồi", "Khách sạn 4 sao", "Các bữa ăn theo chương trình", "Hướng dẫn viên nhiệt tình"] },
        { title: "Không bao gồm", subtitle: "Các chi phí cá nhân", items: ["Tiền tip cho HDV", "Bảo hiểm du lịch (tùy chọn)", "Các bữa ăn ngoài chương trình"] }
      ]
    };

    let detailId = tour.detail?.id;
    if (!tour.detail) {
      const detailRes = await tourDetailService.create(detailData);
      detailId = (detailRes as any).data?.id || (detailRes as any).id;
    } else {
      await tourDetailService.update(detailId, detailData);
    }

    // 3. Create Sample Sessions
    const today = new Date();
    const sessions = [
      {
        tourId,
        startDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        capacity: 20,
        adultPrice: tour.price,
        status: DepartureStatus.OPEN
      },
      {
        tourId,
        startDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        capacity: 15,
        adultPrice: tour.price * 0.9,
        status: DepartureStatus.OPEN
      }
    ];

    await Promise.all(sessions.map(s => tourSessionService.create(s)));

    // 4. Create Sample Reviews
    const reviews = [
      {
        tourId,
        userId,
        rating: 5,
        comment: "Chuyến đi tuyệt vời! Hướng dẫn viên rất nhiệt tình và chu đáo. Khách sạn đẹp hơn mong đợi."
      },
      {
        tourId,
        userId,
        rating: 5,
        comment: "Cảnh đẹp xuất sắc, lịch trình rất hợp lý. Sẽ còn quay lại ủng hộ TripNest nhiều lần nữa."
      },
      {
        tourId,
        userId,
        rating: 4,
        comment: "Mọi thứ đều ổn, chỉ có bữa trưa ngày thứ 2 hơi ít món so với dự kiến. Nhưng tổng thể vẫn rất đáng đi."
      }
    ];

    await Promise.all(reviews.map(r => reviewService.create(r)));

    return { detailId, sessionCount: sessions.length, reviewCount: reviews.length };
  }
};

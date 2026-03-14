"use client";

import React, { useState } from "react";

export default function JourneyTags() {
  const [activeTab, setActiveTab] = useState("popular");

  const tabs = [
    { id: "popular", label: "Phổ biến nhất" },
    { id: "world", label: "Khám phá Thế giới" },
    { id: "domestic", label: "Điểm đến trong nước" },
    { id: "international", label: "Điểm đến quốc tế" },
    { id: "cruise", label: "Du thuyền sang trọng" },
    { id: "experience", label: "Trải nghiệm độc đáo" },
    { id: "deal", label: "Ưu đãi sốc" },
  ];

  // Realistic data for travel categories
  const linksData: Record<string, string[][]> = {
    popular: [
      ["Sun World Ba Den Mountain", "Vé VinWonders Cửa Hội", "Lotte World Aquarium | Hà Nội", "Vé xe buýt 2 tầng Hà Nội City Sightseeing", "Vé xem chương trình Tinh hoa Bắc Bộ"],
      ["Vé khu vui chơi giáo dục VinKE", "Vé múa rối nước Thăng Long", "Hành trình di sản Hội An", "Vé cáp treo Bà Nà Hills", "VinWonders Nha Trang"],
      ["Sun World Fansipan Legend", "Vé bảo tàng tranh 3D Art in Paradise", "Vé tham quan Landmark 81", "Bữa tối trên du thuyền Sông Sài Gòn", "Vé cáp treo Hòn Thơm"],
      ["Cổng trời Bali tại Đà Lạt", "Vườn chim Thung Nham-Ninh Bình", "Khu du lịch Tràng An", "Vé vào cổng Bà Nà Hills", "Cầu Vàng Đà Nẵng"],
      ["Trượt tuyết tại Snow Town", "Vé Jump Arena TPHCM", "Thành phố không ngủ Grand World", "Vườn thú Safari Phú Quốc", "Công viên nước Aquatopia"]
    ],
    world: [
      ["Paris - Pháp", "Tokyo - Nhật Bản", "Seoul - Hàn Quốc", "Bangkok - Thái Lan", "Singapore - Đảo quốc"],
      ["London - Anh", "Rome - Ý", "Amsterdam - Hà Lan", "Sydney - Úc", "New York - Mỹ"],
      ["Bali - Indonesia", "Phuket - Thái Lan", "Jeju - Hàn Quốc", "Dubai - UAE", "Istanbul - Thổ Nhĩ Kỳ"],
      ["Zurich - Thụy Sĩ", "Vienna - Áo", "Prague - CH Séc", "Barcelona - Tây Ban Nha", "Maldives"],
      ["Kyoto - Nhật Bản", "Đài Bắc - Đài Loan", "Hong Kong", "Kuala Lumpur - Malaysia", "Luang Prabang - Lào"]
    ],
    domestic: [
      ["Hà Nội - Nghìn năm văn hiến", "TP. Hồ Chí Minh - Năng động", "Đà Nẵng - Thành phố đáng sống", "Nha Trang - Biển xanh nắng vàng", "Phú Quốc - Đảo ngọc"],
      ["Đà Lạt - Thành phố ngàn hoa", "Sa Pa - Thị trấn trong sương", "Hội An - Phố cổ lung linh", "Huế - Cố đô trầm mặc", "Ninh Bình - Hạ Long trên cạn"],
      ["Vũng Tàu - Biển gọi", "Quy Nhơn - Hoang sơ", "Phan Thiết - Đồi cát trắng", "Mũi Né - Thiên đường resort", "Cần Thơ - Gạo trắng nước trong"],
      ["Hà Giang - Cao nguyên đá", "Cao Bằng - Thác Bản Giốc", "Mộc Châu - Mùa hoa cải", "Yên Bái - Mùa lúa chín", "Bắc Cạn - Hồ Ba Bể"],
      ["Quảng Bình - Vương quốc hang động", "Quảng Ninh - Kỳ quan thế giới", "Vĩnh Phúc - Tam Đảo mờ sương", "Thái Nguyên - ATK Định Hóa", "Lạng Sơn - Đỉnh Mẫu Sơn"]
    ],
    international: [
      ["Tour Châu Âu 10 ngày", "Khám phá Nhật Bản mùa hoa anh đào", "Hàn Quốc mùa lá đỏ", "Sắc màu Thái Lan", "Singapore - Malaysia 5 ngày"],
      ["Tour Mỹ 12 ngày", "Úc - New Zealand kỳ thú", "Vẻ đẹp huyền bí Ai Cập", "Dubai sang trọng", "Thổ Nhĩ Kỳ - Hành trình qua hai đại lục"],
      ["Nam Phi hoang dã", "Bắc Âu huyền diệu", "Tây Ban Nha - Bồ Đào Nha", "Ý - Đất nước của tình yêu", "Đức - Hà Lan - Bỉ - Pháp"],
      ["Trung Quốc - Vạn Lý Trường Thành", "Đài Loan - Thiên đường ẩm thực", "Hong Kong sôi động", "Lào - Đất nước triệu voi", "Campuchia - Angkor huyền bí"],
      ["Pháp - Thụy Sĩ - Ý", "Hy Lạp - Biển xanh Santorini", "Nga - Đêm trắng Saint Petersburg", "Ấn Độ - Taj Mahal", "Maldives thiên đường"]
    ],
    cruise: [
      ["Du thuyền Heritage Bình Chuẩn", "Du thuyền Capella Hạ Long", "Du thuyền Stellar of the Seas", "Du thuyền Paradise Elegance", "Du thuyền Orchid Cruises"],
      ["Du thuyền Ambassador Hạ Long", "Du thuyền Elite of the Seas", "Du thuyền Mon Cheri Cruises", "Du thuyền Le Theatre Cruises", "Du thuyền Scarlet Pearl"],
      ["Du thuyền Spectrum of the Seas", "Du thuyền Disney Adventure", "Du thuyền Genting Dream", "Du thuyền Costa Serena", "Du thuyền Celebrity Solstice"],
      ["Du thuyền Sông Sài Gòn", "Du thuyền Sông Hàn Đà Nẵng", "Du thuyền Cần Thơ", "Du thuyền Ninh Bình", "Du thuyền Huế"],
      ["Du thuyền 5 sao quốc tế", "Du thuyền khám phá Nam Cực", "Du thuyền sông Nile", "Du thuyền Địa Trung Hải", "Du thuyền biển Baltic"]
    ],
    experience: [
      ["Khinh khí cầu tại Mũi Né", "Nhảy dù lượn tại Đà Nẵng", "Zipline tại Quảng Bình", "Chèo Kayak tại Hạ Long", "Lặn biển ngắm san hô Phú Quốc"],
      ["Camping tại Đà Lạt", "Trekking Fansipan", "Leo núi tại Hà Giang", "Khám phá Sơn Đoòng", "Chạy marathon tại Hội An"],
      ["Workshop làm gốm Bát Tràng", "Trải nghiệm làm nông dân", "Lớp học nấu ăn Việt Nam", "Dệt vải tại Sapa", "Làm lồng đèn Hội An"],
      ["Tắm khoáng nóng Onsen", "Spa thảo dược cung đình", "Yoga trên biển", "Meditation tại thiền viện", "Chăm sóc sức khỏe tại resort"],
      ["Tiệc tối trên bãi biển", "Thưởng thức trà chiều", "Săn mây tại Y Tý", "Ngắm hoàng hôn trên sông", "Giao lưu văn hóa cồng chiêng"]
    ],
    deal: [
       ["Giảm 50% tour Thái Lan", "Săn vé máy bay 0 đồng", "Combo Đà Lạt 3N2Đ cực rẻ", "Ưu đãi hè rực rỡ", "Sale sập sàn lễ hội"],
       ["Mua 1 tặng 1 vé tham quan", "Giảm 30% khách sạn 5 sao", "Tour Nha Trang giá sốc", "Flash sale cuối tuần", "Đặc quyền chủ thẻ ngân hàng"],
       ["Khuyến mãi đặt sớm", "Ưu đãi khách hàng thân thiết", "Quà tặng khi đặt tour", "Voucher du lịch hấp dẫn", "Giảm giá cho nhóm đông"],
       ["Đồng giá 99k vé khu vui chơi", "Giảm 10% khi đặt qua app", "Coupon du lịch quốc tế", "Sale Tết nguyên đán", "Mùa thu lá vàng giá tốt"],
       ["Combo Vinpearl giá đẹp", "Ưu đãi bay cùng Vietjet", "Vietnam Airlines khuyến mãi", "Bamboo Airways sale", "Ưu đãi từ Trip Nest"]
    ]
  };

  const activeLinks = linksData[activeTab] || linksData["popular"];

  return (
    <section className="relative overflow-hidden pt-4 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative">
        {/* Tabs Header */}
        <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar no-scrollbar">
          <div className="flex gap-6 min-w-max pb-[-1px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-[14px] md:text-[15px] font-bold transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#0194f3]"
                    : "text-[#666666] hover:text-gray-900"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#97c514] rounded-t-sm" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
            {activeLinks.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-3">
                {column.map((linkText, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="text-[13px] text-[#555555] hover:text-[#0194f3] leading-relaxed transition-colors line-clamp-2"
                  >
                    {linkText}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

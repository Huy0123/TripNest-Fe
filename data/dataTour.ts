interface SliderItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  dateRange: string;
  price: number;
  isGuestFavorite: boolean;
  originalPrice?: number;
  discount?: number;
}

export const deals: SliderItem[] = [
    {
      id: 1,
      title: "Italy in 21 Days",
      image: "/lake.png",
      rating: 4.9,
      dateRange: "Jan 5 - 26",
      price: 7500,
      isGuestFavorite: true,
    },
    {
      id: 2,
      title: "Thailand Heaven",
      image: "/lake.png",
      rating: 4.65,
      dateRange: "Jan 5 - 12",
      originalPrice: 1199,
      price: 1199,
      isGuestFavorite: false,
    },
    {
      id: 3,
      title: "Japan's Experience",
      image: "/lake.png",
      rating: 4.65,
      dateRange: "Jan 5 - 12",
      originalPrice: 1199,
      price: 1199,
      discount: 30,
      isGuestFavorite: true,
    },
  ];
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Hidden Gems in Italy",
    excerpt: "Discover the secret spots in Italy that most tourists miss. From small villages in Tuscany to secluded beaches in Puglia.",
    content: "Full content would go here...",
    image: "/blog/italy.jpg",
    author: "Maria Rossi",
    date: "Dec 15, 2024",
    category: "Destinations",
    slug: "top-10-hidden-gems-italy",
  },
  {
    id: "2",
    title: "A Complete Guide to Backpacking Southeast Asia",
    excerpt: "Everything you need to know about planning a backpacking trip through Thailand, Vietnam, Cambodia, and Laos.",
    content: "Full content would go here...",
    image: "/blog/asia.jpg",
    author: "Alex Chen",
    date: "Jan 03, 2025",
    category: "Travel Tips",
    slug: "backpacking-southeast-asia",
  },
  {
    id: "3",
    title: "Luxury Travel on a Budget: Is it Possible?",
    excerpt: "Tips and tricks for experiencing 5-star luxury without breaking the bank. Smart booking strategies and destinations.",
    content: "Full content would go here...",
    image: "/blog/luxury.jpg",
    author: "Sarah Johnson",
    date: "Jan 10, 2025",
    category: "Budget Travel",
    slug: "luxury-travel-on-budget",
  },
  {
    id: "4",
    title: "Sustainable Travel: How to Reduce Your Carbon Footprint",
    excerpt: "Practical ways to travel more sustainably. From choosing eco-friendly accommodations to responsible wildlife tourism.",
    content: "Full content would go here...",
    image: "/blog/sustainable.jpg",
    author: "David Smith",
    date: "Jan 20, 2025",
    category: "Eco Tourism",
    slug: "sustainable-travel-tips",
  },
  {
    id: "5",
    title: "The Ultimate Packing List for a Winter Vacation",
    excerpt: "Don't get caught in the cold! Our comprehensive checklist for packing for a ski trip or winter city break.",
    content: "Full content would go here...",
    image: "/blog/winter.jpg",
    author: "Emma Wilson",
    date: "Feb 01, 2025",
    category: "Packing Guides",
    slug: "winter-vacation-packing-list",
  },
  {
    id: "6",
    title: "Best Food Cities in the World",
    excerpt: "A culinary journey through the world's best food cities. From street food in Bangkok to fine dining in Paris.",
    content: "Full content would go here...",
    image: "/blog/food.jpg",
    author: "Jean Pierre",
    date: "Feb 14, 2025",
    category: "Food & Drink",
    slug: "best-food-cities",
  },
];

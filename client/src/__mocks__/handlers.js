import { http, HttpResponse } from "msw";

// ─── Default mock data ────────────────────────────────────────
export const mockHealthData = {
  status: "ok",
  message: "Server is running",
  timestamp: new Date().toISOString(),
};

export const mockProducts = [
  {
    id: 1,
    name: "WMX Rubber Zebra Sandal",
    price: 36,
    category: "women",
    badge: "Our Picks",
    colors: ["#D4A574", "#1a1a1a"],
    image: "/images/sandal.jpg",
  },
  {
    id: 2,
    name: "Supper Skiny Jogger in Brown",
    price: 89,
    category: "men",
    badge: "Your Choice",
    colors: ["#8B6914", "#3d3d3d"],
    image: "/images/jogger.jpg",
  },
];

// ─── Request handlers ─────────────────────────────────────────
export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json(mockHealthData);
  }),

  http.get("/api/products", () => {
    return HttpResponse.json(mockProducts);
  }),
];

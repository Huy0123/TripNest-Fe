import React from "react";
import PromotionalBanner from "../PromotionalBanner";
import { getPromotionsServer, Promotion } from "@/services/promotionService";

export default async function PromotionalBannerWrapper() {
  const promotionsData = await getPromotionsServer().catch(() => []);
  const promotions: Promotion[] = Array.isArray(promotionsData) ? promotionsData : (promotionsData as any)?.data || [];
  
  const activePromotion = promotions.find(p => p.isActive) || null;

  return <PromotionalBanner promotion={activePromotion} />;
}

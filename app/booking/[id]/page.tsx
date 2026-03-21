import React from "react";
import ClientBookingPage from "./ClientBookingPage";
import { tourService } from "@/services/tourService";
import { notFound } from "next/navigation";

export default async function BookingPage({
  params
}: {
  params: Promise<{ id: string, locale: string }>
}) {
  const resolvedParams = await params;
  const tourId = resolvedParams.id;
  
  let tour: any;
  try {
    tour = await tourService.findOne(tourId);
  } catch (error) {
    return notFound();
  }

  if (!tour) return notFound();

  const tourData = tour.data || tour;

  return (
    <ClientBookingPage 
      tourId={tourData.id}
      tourName={tourData.name}
      tourImage={tourData.image}
      basePrice={tourData.price}
    />
  );
}

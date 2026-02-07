"use client";

import React from "react";
import Link from "next/link";

interface HelpTopic {
  title: string;
  description: string;
  link?: string;
}

const topics: HelpTopic[] = [
  {
    title: "Getting Started with Tour Bookings",
    description:
      "Welcome to our tour reservation platform! Explore destinations, compare options, and secure your perfect tour in just a few clicks. Our intuitive search filters help you find tours by location, date, or type of experience.",
  },
  {
    title: "Managing Your Reservations",
    description:
      "Access your reservations anytime by logging into your account and navigating to 'My Bookings.' Here, you can view, update, or modify your booking details. Need to cancel or reschedule? Simply follow the on-screen instructions.",
  },
  {
    title: "Payments and Billing",
    description:
      "We accept various payment methods, including credit cards, PayPal, and local options. During checkout, choose your preferred method and complete the payment securely. Visit our Billing Help section for troubleshooting tips and payment receipt requests.",
  },
  {
    title: "Understanding Tour Packages",
    description:
      "Each tour package includes specific services like transportation, accommodation, and guided activities. Review the 'What's Included' section on each tour page to ensure it meets your needs. Add-ons like meals or excursions can be selected during checkout.",
  },
  {
    title: "Flexible Cancellation and Refunds",
    description:
      "Life happens, and plans change. Our flexible cancellation policies let you adjust your booking as needed. Check your booking's specific terms to see refund eligibility and rescheduling options. Refunds typically process within 5-7 business days.",
  },
  {
    title: "Group Bookings and Custom Tours",
    description:
      "Planning a trip for family, friends, or colleagues? We make group bookings simple. Request a custom tour package for your group, or select an existing tour and specify the number of participants at checkout. Discounts may apply for larger groups.",
  },
  {
    title: "Travel Insurance and Safety",
    description:
      "Stay protected with travel insurance. We offer plans that cover cancellations, medical emergencies, and unexpected disruptions. Add insurance during the booking process or contact us for coverage details.",
  },
  {
    title: "Accessibility and Special Requests",
    description:
      "Our tours aim to accommodate all travelers. Notify us during booking if you need assistance with mobility, dietary requirements, or other special needs. We'll work with our partners to ensure your comfort.",
  },
  {
    title: "Staying Safe During COVID-19",
    description:
      "We prioritize your health and safety. All tours follow local COVID-19 guidelines, including sanitization protocols and mask requirements. Flexible booking options are available if your plans are affected by travel restrictions.",
  },
  {
    title: "Earning Rewards with Our Loyalty Program",
    description:
      "Join our loyalty program to enjoy exclusive benefits. Earn points for every booking, and redeem them for discounts on future trips. Track your rewards in your account and unlock special offers.",
  },
  {
    title: "Need Assistance? Contact Us",
    description:
      "Our support team is here to help with any issues you may encounter. Visit the Help Center for resources, or reach out via live chat, email, or phone. Response times vary based on your inquiry type and time zone.",
  },
  {
    title: "Sharing Feedback and Reviews",
    description:
      "Your input matters! Share your experience to help us improve. Leave a review for completed tours through your account or provide general feedback using our contact form.",
  },
];

export default function HelpChoose() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {topic.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {topic.description}
          </p>
        </div>
      ))}
    </div>
  );
}

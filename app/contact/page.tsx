"use client";

import React from "react";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-[var(--header-height)]">
      {/* Header */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about your next adventure? We're here to help!
            Reach out to our team of travel experts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info - 1 Column */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>

          {/* Contact Form - 2 Columns */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
            <p className="text-gray-600">
              123 Travel Street, Adventure City
              <br />
              New York, NY 10012
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Phone Number</h4>
            <p className="text-gray-600">
              <a href="tel:+15551234567" className="hover:text-orange-600 transition-colors">
                +1 (555) 123-4567
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Mon-Fri, 9am-6pm EST
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
            <p className="text-gray-600">
              <a href="mailto:hello@tripnest.com" className="hover:text-orange-600 transition-colors">
                hello@tripnest.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
        <div className="flex gap-4">
          {/* Social icons placeholders */}
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer">
              FB
          </div>
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer">
              TW
          </div>
          <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer">
              IG
          </div>
        </div>
      </div>
    </div>
  );
}

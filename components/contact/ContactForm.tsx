"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/error-state";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Handle form submission logic here
      console.log("Form submitted:", formData);
      
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-grey-100 shadow-sm">
      <h3 className="header-04-bold text-grey-900 mb-6">Send us a Message</h3>
      
      {submitSuccess && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="body-01-medium text-green-800">
            ✓ Thank you! Your message has been sent successfully.
          </p>
        </div>
      )}
      
      {submitError && (
        <div className="mb-6">
          <FormError 
            message={submitError}
            onDismiss={() => setSubmitError(null)}
          />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          <Input
            label="Email Address"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="body-02-medium text-grey-900">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full h-12 px-4 py-3 rounded-lg border border-grey-200 body-01-regular transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white disabled:bg-grey-100 disabled:cursor-not-allowed"
          >
            <option value="" disabled>Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="booking">Booking Assistance</option>
            <option value="feedback">Feedback</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>

        <Textarea
          label="Message"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="How can we help you?"
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          isLoading={isSubmitting}
          loadingText="Sending..."
          disabled={isSubmitting}
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}

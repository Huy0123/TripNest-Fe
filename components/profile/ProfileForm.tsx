"use client";

import React from "react";
import { ProfileInput } from "./ProfileInput";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function ProfileForm() {
  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-grey-200">
        <h2 className="header-05-bold text-grey-900 mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInput 
            label="First Name" 
            placeholder="Anna" 
            defaultValue="Anna"
          />
          <ProfileInput 
            label="Last Name" 
            placeholder="Smith" 
            defaultValue="Smith"
          />
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-grey-700">Date of birth</label>
            <div className="grid grid-cols-3 gap-4">
               <div className="relative">
                 <select className="w-full h-12 appearance-none rounded-lg border border-grey-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
                    <option>16</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500 pointer-events-none" />
               </div>
                <div className="relative">
                 <select className="w-full h-12 appearance-none rounded-lg border border-grey-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
                    <option>09</option>
                 </select>
                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500 pointer-events-none" />
               </div>
                <div className="relative">
                 <select className="w-full h-12 appearance-none rounded-lg border border-grey-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
                    <option>1995</option>
                 </select>
                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500 pointer-events-none" />
               </div>
            </div>
          </div>
          
          <ProfileInput 
            label="Phone number" 
            placeholder="e.g., +1234567890" 
          />
        </div>
      </div>

      {/* Personal Address */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-grey-200">
        <h2 className="header-05-bold text-grey-900 mb-6">Personal Address</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ProfileInput 
            label="E-mail" 
            defaultValue="anna.smith@gmail.com"
          />
           <div className="space-y-1.5">
            <label className="text-sm font-medium text-grey-700">Nationality</label>
             <div className="relative">
                 <select className="w-full h-12 appearance-none rounded-lg border border-grey-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
                    <option>Iranian</option>
                 </select>
                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500 pointer-events-none" />
               </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <ProfileInput 
                label="Address 1" 
             />
             <ProfileInput 
                label="Address 2" 
                placeholder="e.g., Apt 4B, Suite 205, Building 7"
             />
        </div>
      </div>
      
       {/* Actions */}
       <div className="flex justify-end gap-4">
           <Button variant="outline" className="w-32 h-12 text-base border-grey-300 text-grey-600">
               Discard
           </Button>
           <Button className="w-32 h-12 text-base bg-grey-300 text-grey-600 hover:bg-grey-400">
               Save
           </Button>
           {/* Note: Screenshot has a grey 'Save' button. Usually save is primary color. 
               The screenshot shows "Save" as greyed out / disabled? 
               Or maybe just a grey style. Let's make it look like the screenshot (grey).
           */}
       </div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

interface ProfileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function ProfileInput({ className, label, ...props }: ProfileInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-grey-700">
        {label}
      </label>
      <input
        className={cn(
          "flex h-12 w-full rounded-lg border border-grey-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

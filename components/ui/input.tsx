import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isValid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, isValid, id, ...props }, ref) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block body-02-medium text-grey-700"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "w-full h-12 px-4 rounded-lg border transition-all duration-200",
            "bg-white text-grey-900 body-01-regular placeholder:text-grey-400",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
            "disabled:bg-grey-100 disabled:text-grey-500 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            isValid && "border-green-500 focus:ring-green-500 focus:border-green-500",
            !error && !isValid && "border-grey-200",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="body-02-regular text-red-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="body-02-regular text-grey-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

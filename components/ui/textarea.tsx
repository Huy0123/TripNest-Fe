import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isValid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, isValid, id, ...props }, ref) => {
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block body-02-medium text-grey-700"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "w-full px-4 py-3 rounded-lg border transition-all duration-200",
            "bg-white text-grey-900 body-01-regular placeholder:text-grey-400",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
            "disabled:bg-grey-100 disabled:text-grey-500 disabled:cursor-not-allowed",
            "resize-none",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            isValid && "border-green-500 focus:ring-green-500 focus:border-green-500",
            !error && !isValid && "border-grey-200",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="body-02-regular text-red-600" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="body-02-regular text-grey-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

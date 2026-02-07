import React from "react";
import { AlertCircle, WifiOff, ServerCrash, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "error" | "warning" | "info";
}

export function ErrorState({ 
  icon, 
  title, 
  description, 
  action,
  variant = "error" 
}: ErrorStateProps) {
  const iconColor = {
    error: "text-red-600",
    warning: "text-orange-500",
    info: "text-blue-500",
  }[variant];

  const bgColor = {
    error: "bg-red-50",
    warning: "bg-orange-50",
    info: "bg-blue-50",
  }[variant];

  const borderColor = {
    error: "border-red-200",
    warning: "border-orange-200",
    info: "border-blue-200",
  }[variant];

  return (
    <div className={`rounded-lg border ${borderColor} ${bgColor} p-6`}>
      <div className="flex items-start gap-4">
        <div className={iconColor}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="body-01-bold text-grey-900 mb-1">{title}</h4>
          <p className="body-02-regular text-grey-700 mb-4">{description}</p>
          {action && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={action.onClick}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Predefined error states
export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      icon={<WifiOff className="w-5 h-5" />}
      title="Network connection error"
      description="Unable to connect to the server. Please check your internet connection and try again."
      action={{
        label: "Try again",
        onClick: onRetry
      }}
      variant="error"
    />
  );
}

export function ServerError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      icon={<ServerCrash className="w-5 h-5" />}
      title="Something went wrong"
      description="We're experiencing technical difficulties. Please try again in a few moments."
      action={{
        label: "Retry",
        onClick: onRetry
      }}
      variant="error"
    />
  );
}

export function FormError({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <ErrorState
      icon={<AlertCircle className="w-5 h-5" />}
      title="Form submission failed"
      description={message}
      action={onDismiss ? {
        label: "Dismiss",
        onClick: onDismiss
      } : undefined}
      variant="error"
    />
  );
}

export function LoadingError({ onRetry, message }: { onRetry: () => void; message?: string }) {
  return (
    <ErrorState
      icon={<AlertCircle className="w-5 h-5" />}
      title="Failed to load data"
      description={message || "There was a problem loading the content. Please try again."}
      action={{
        label: "Reload",
        onClick: onRetry
      }}
      variant="error"
    />
  );
}

export function ValidationError({ message }: { message: string }) {
  return (
    <ErrorState
      icon={<AlertCircle className="w-5 h-5" />}
      title="Validation error"
      description={message}
      variant="warning"
    />
  );
}

// Inline error message component (for form fields)
export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
      <p className="body-02-regular text-red-600" role="alert">
        {message}
      </p>
    </div>
  );
}

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg body-01-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 hover:shadow-md",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        outline:
          "border border-grey-300 bg-white hover:bg-grey-50 active:bg-grey-100 text-grey-900",
        secondary:
          "bg-grey-100 text-grey-900 hover:bg-grey-200 active:bg-grey-300",
        ghost: "hover:bg-grey-100 active:bg-grey-200 text-grey-900",
        link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700",
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
        warning: "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, loadingText, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

'use client';

import * as React from "react"
import { NumericInput } from "./numeric-input"

interface PriceInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number | string;
  onChange: (value: number) => void;
}

const PriceInput = React.forwardRef<HTMLInputElement, PriceInputProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <NumericInput
        {...props as any}
        ref={ref}
        value={typeof value === 'string' ? parseInt(value) || 0 : value}
        onChange={(val) => onChange(val ?? 0)}
        thousandSeparator
        suffix="VNĐ"
      />
    );
  }
)
PriceInput.displayName = "PriceInput"

export { PriceInput }

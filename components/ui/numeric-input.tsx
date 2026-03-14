'use client';

import * as React from "react";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";

interface NumericInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: number | undefined | null;
  onChange: (value: number | undefined) => void;
  thousandSeparator?: boolean;
  allowDecimal?: boolean;
  icon?: React.ReactNode;
}

const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ value, onChange, thousandSeparator = false, allowDecimal = false, className, label, icon, ...props }, ref) => {
    const formatValue = (val: number | undefined | null) => {
      if (val === undefined || val === null || isNaN(val)) return "";
      
      let formatted = val.toString();
      
      if (thousandSeparator) {
        const parts = formatted.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        formatted = parts.join(',');
      }
      
      return formatted;
    };

    const [displayValue, setDisplayValue] = React.useState(formatValue(value));

    React.useEffect(() => {
      const formatted = formatValue(value);
      // Only sync from external if the actual numeric value changed
      // This allows the user to have "" or "0" temporarily without sync fighting them
      if (value !== undefined && value !== null) {
        if (formatted !== displayValue && formatValue(parseFloat(displayValue.replace(/\./g, '').replace(/,/g, '.'))) !== formatted) {
          setDisplayValue(formatted);
        }
      } else if (displayValue !== "") {
        setDisplayValue("");
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let rawValue = e.target.value;

      // Remove non-numeric characters (except . and , if needed)
      const cleanRegex = allowDecimal ? /[^\d.,]/g : /[^\d]/g;
      let cleanValue = rawValue.replace(cleanRegex, "");

      // Standardize decimal separator
      if (thousandSeparator) {
        // Vietnamese style: . for thousands, , for decimal
        // We strip . and treat , as . for parsing
        cleanValue = cleanValue.replace(/\./g, "").replace(/,/g, ".");
      }

      // Handle leading zeros
      if (cleanValue.length > 1 && cleanValue.startsWith('0') && !cleanValue.startsWith('0.')) {
        cleanValue = cleanValue.replace(/^0+/, '');
      }

      if (cleanValue === "" || cleanValue === ".") {
        setDisplayValue(cleanValue);
        onChange(undefined);
        return;
      }

      const numericValue = allowDecimal ? parseFloat(cleanValue) : parseInt(cleanValue, 10);

      if (!isNaN(numericValue)) {
        // Update display with formatting
        setDisplayValue(formatValue(numericValue));
        onChange(numericValue);
      } else {
        setDisplayValue("");
        onChange(undefined);
      }
    };

    return (
      <div className="relative w-full">
        <Input
          {...props}
          ref={ref}
          type="text"
          label={label ? (
            <span className="flex items-center gap-2">
              {icon}
              {label}
            </span>
          ) as any : undefined}
          value={displayValue}
          onChange={handleChange}
          className={cn(className)}
        />
      </div>
    );
  }
);

NumericInput.displayName = "NumericInput";

export { NumericInput };

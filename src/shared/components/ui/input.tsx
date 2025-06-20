import * as React from "react";

import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors outline-none",
        // Border and focus states
        "border-gray-300 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
        // Placeholder styles
        "placeholder:text-gray-400",
        // Text selection
        "selection:bg-primary selection:text-white",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        // Hover state
        "hover:border-gray-400",
        // Error state
        "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/20",
        // File input specific styles
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700",
        // Date/time input styles
        "[&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-80",
        // Number input arrow styles
        "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&[type=number]]:[-moz-appearance:textfield]",
        className
      )}
      {...props}
    />
  );
}

export { Input };

"use client";

import * as React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pilih tanggal",
  disabled = false,
  className,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            // Base styles
            "w-full h-10 justify-start text-left font-normal bg-white border-gray-300 hover:border-gray-400 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
            // Text color states
            !date && "text-gray-400",
            date && "text-gray-900",
            // Disabled state
            disabled && "opacity-50 cursor-not-allowed hover:border-gray-300",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          {date ? format(date, "dd MMMM yyyy", { locale: id }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          disabled={(date) => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return false;
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// For React Hook Form integration
interface DatePickerFieldProps extends DatePickerProps {
  name?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  error?: string;
}

export function DatePickerField({
  value,
  onChange,
  error,
  className,
  ...props
}: DatePickerFieldProps) {
  return (
    <div className="space-y-2">
      <DatePicker
        date={value}
        onDateChange={onChange}
        className={cn(
          error &&
            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

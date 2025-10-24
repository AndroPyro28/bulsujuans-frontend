"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CompoBox, type CompoBoxOption } from "./combobox";

interface FormSearchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: CompoBoxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function FormSearch<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  className,
}: FormSearchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name} className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            {label}
          </FormLabel>
          <FormControl>
            <CompoBox
              filterKey={name} // so it works with your CompoBox API
              options={options}
              value={field.value}
              onChange={(_, value) => field.onChange(value)} // integrate with RHF
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              emptyMessage={emptyMessage}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

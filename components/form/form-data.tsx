import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormDateProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: "date" | "time" | "datetime-local";
  placeholder?: string;
}

export function FormDate<T extends FieldValues>({
  control,
  name,
  label,
  type = "date",
  placeholder,
}: FormDateProps<T>) {
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
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              value={
                field.value
                  ? type === "datetime-local"
                    ? new Date(field.value).toISOString().slice(0, 16)
                    : type === "date"
                    ? new Date(field.value).toISOString().slice(0, 10)
                    : field.value
                  : ""
              }
              onChange={(e) => field.onChange(e.target.value)}
              className="bg-gray-100"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

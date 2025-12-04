import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: "number" | "text" | "email" | "password" | "file" | "hidden";
  placeholder?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
}: FormInputProps<T>) {
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
              autoComplete="off"
              id={name}
              {...field}
              type={type}
              placeholder={placeholder}
              value={field.value ?? ""}
              onChange={(e) =>
                type === "number" ? field.onChange(e.target.valueAsNumber) : field.onChange(e.target.value)
              }
              className="bg-gray-100"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

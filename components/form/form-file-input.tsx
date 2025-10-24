import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface FormFileInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  multiple?: boolean;
  accept?: string; // e.g. "image/*,application/pdf"
}

export function FormFileInput<T extends FieldValues>({
  control,
  name,
  label,
  multiple = false,
  accept,
}: FormFileInputProps<T>) {
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
              type="file"
              multiple={multiple}
              accept={accept}
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;
                field.onChange(multiple ? Array.from(files) : files[0]);
              }}
              className="bg-gray-100"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

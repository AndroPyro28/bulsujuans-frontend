import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface FormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
}

export function FormCheckbox<T extends FieldValues>({ control, name, label, description }: FormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
          <FormControl>
            <Checkbox checked={field.value || false} onCheckedChange={(checked) => field.onChange(checked)} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

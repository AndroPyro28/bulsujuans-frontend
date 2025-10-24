"use client";

import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSubmitButtonProps {
  isSubmitting?: boolean;
  label?: string;
  submittingLabel?: string;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  onClear?: () => void; // 👈 optional clear function
  clearLabel?: string; // optional label override for clear button
}

export function FormSubmitButton({
  isSubmitting = false,
  label = "Submit",
  submittingLabel = "Submitting",
  disabled = false,
  className,
  variant = "default",
  onClear,
  clearLabel = "Clear",
}: FormSubmitButtonProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {onClear && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-x-1 text-xs"
          onClick={onClear}
        >
          <RotateCcw size={14} />
          {clearLabel}
        </Button>
      )}

      <Button
        type="submit"
        variant={variant}
        className={cn(
          "dark:text-white cursor-pointer self-end disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        disabled={disabled || isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-x-2">
            {submittingLabel}
            <Loader2 size={18} className="animate-spin" />
          </div>
        ) : (
          label
        )}
      </Button>
    </div>
  );
}

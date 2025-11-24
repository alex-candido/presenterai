import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface TextareaAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function TextareaAdapter<TFormValues extends FieldValues>({
  field,
  rows = 3,
  placeholder,
  disabled,
  isSubmitting,
}: TextareaAdapterProps<TFormValues>) {
  return (
    <Textarea
      {...field}
      placeholder={placeholder}
      value={field.value ?? ""}
      disabled={disabled || isSubmitting}
      rows={rows}
    />
  );
}
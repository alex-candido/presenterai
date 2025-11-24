import { Checkbox } from "@/components/ui/checkbox";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface CheckboxAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function CheckboxAdapter<TFormValues extends FieldValues>({
  field,
  disabled,
  isSubmitting,
}: CheckboxAdapterProps<TFormValues>) {
  return (
    <Checkbox
      checked={field.value}
      onCheckedChange={field.onChange}
      disabled={disabled || isSubmitting}
    />
  );
}
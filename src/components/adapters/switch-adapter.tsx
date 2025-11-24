import { Switch } from "@/components/ui/switch";
import * as React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface SwitchAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function SwitchAdapter<TFormValues extends FieldValues>({
  field,
  disabled,
  isSubmitting,
}: SwitchAdapterProps<TFormValues>) {
  return (
    <Switch
      checked={field.value}
      onCheckedChange={field.onChange}
      disabled={disabled || isSubmitting}
    />
  );
}
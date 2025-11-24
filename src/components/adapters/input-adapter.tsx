import { Input } from "@/components/ui/input";
import * as React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface InputAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function InputAdapter<TFormValues extends FieldValues>({
  field,
  type = "text",
  placeholder,
  disabled,
  isSubmitting,
}: InputAdapterProps<TFormValues>) {
  return (
    <Input
      {...field}
      type={type}
      placeholder={placeholder}
      value={field.value ?? ""}
      disabled={disabled || isSubmitting}
    />
  );
}
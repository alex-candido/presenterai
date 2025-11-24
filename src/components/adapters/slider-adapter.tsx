import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface SliderAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function SliderAdapter<TFormValues extends FieldValues>({
  field,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  isSubmitting,
}: SliderAdapterProps<TFormValues>) {
  return (
    <Slider
      value={[field.value]}
      onValueChange={(value) => field.onChange(value[0])}
      min={min}
      max={max}
      step={step}
      disabled={disabled || isSubmitting}
    />
  );
}
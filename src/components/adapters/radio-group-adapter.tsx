import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

interface RadioGroupAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  radioOptions: RadioOption[];
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function RadioGroupAdapter<TFormValues extends FieldValues>({
  field,
  radioOptions,
  disabled,
  isSubmitting,
}: RadioGroupAdapterProps<TFormValues>) {
  return (
    <RadioGroup
      onValueChange={field.onChange}
      defaultValue={field.value}
      className="flex flex-col space-y-1"
      disabled={disabled || isSubmitting}
    >
      {radioOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
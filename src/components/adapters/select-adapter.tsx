import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

interface SelectAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  placeholder?: string;
  selectOptions: Option[];
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function SelectAdapter<TFormValues extends FieldValues>({
  field,
  placeholder,
  selectOptions,
  disabled,
  isSubmitting,
}: SelectAdapterProps<TFormValues>) {
  return (
    <Select
      value={
        field.value !== undefined && field.value !== null
          ? String(field.value)
          : ""
      }
      onValueChange={field.onChange}
      disabled={disabled || isSubmitting}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectOptions?.map((option) => (
          <SelectItem
            key={String(option.value)}
            value={String(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
"use client";

import { CheckboxAdapter } from "@/components/adapters/checkbox-adapter";
import { DatePickerAdapter } from "@/components/adapters/datepicker-adapter";
import { FileInputAdapter } from "@/components/adapters/file-input-adapter";
import { InputAdapter } from "@/components/adapters/input-adapter";
import { RadioGroupAdapter } from "@/components/adapters/radio-group-adapter";
import { SelectAdapter } from "@/components/adapters/select-adapter";
import { SliderAdapter } from "@/components/adapters/slider-adapter";
import { SwitchAdapter } from "@/components/adapters/switch-adapter";
import { TextareaAdapter } from "@/components/adapters/textarea-adapter";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

// Base props common to all field types
type BaseFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  label: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  ui?: {
    formItem?: string;
    formLabel?: string;
    formDescription?: string;
  };
};

// Props for specific field types
type InputFieldProps = {
  renderAs?: "input"; // Default, so it's optional
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};

type TextareaFieldProps = {
  renderAs: "textarea";
  rows?: number;
  placeholder?: string;
};

type SelectFieldProps = {
  renderAs: "select";
  placeholder?: string;
  selectOptions: {
    value: string | number;
    label: string;
    disabled?: boolean;
  }[];
};

type SwitchFieldProps = {
  renderAs: "switch";
};

type CheckboxFieldProps = {
  renderAs: "checkbox";
};

type RadioGroupFieldProps = {
  renderAs: "radio-group";
  radioOptions: { value: string; label: string; disabled?: boolean }[];
};

type DatePickerFieldProps = {
  renderAs: "datepicker";
  placeholder?: string;
};

type SliderFieldProps = {
  renderAs: "slider";
  min?: number;
  max?: number;
  step?: number;
};

type FileInputFieldProps = {
  renderAs: "file-input";
};

type ComboboxFieldProps = {
  renderAs: "combobox";
  placeholder?: string;
  comboboxItems: any[];
  comboboxItemKeyExtractor: (item: any) => string | number;
  comboboxItemDisplayExtractor: (item: any) => string;
  comboboxItemValueExtractor: (item: any) => string | number;
  onComboboxSearchTermChange?: (searchTerm: string) => void;
  isLoadingComboboxItems?: boolean;
  comboboxEmptyMessage?: string;
  comboboxLoadingMessage?: string;
  comboboxPlaceholder?: string;
};

// Discriminated union of all possible field props
export type FormFieldAdapterProps<TFormValues extends FieldValues> =
  BaseFieldProps<TFormValues> &
    (
      | InputFieldProps
      | TextareaFieldProps
      | SelectFieldProps
      | SwitchFieldProps
      | CheckboxFieldProps
      | RadioGroupFieldProps
      | DatePickerFieldProps
      | SliderFieldProps
      | FileInputFieldProps
      | ComboboxFieldProps
    );

export function FormFieldAdapter<TFormValues extends FieldValues>(
  props: FormFieldAdapterProps<TFormValues>,
) {
  const { control, name, label, description, className, ui } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cn("form-item-layout", className, ui?.formItem)}>
            {label && (
              <FormLabel className={cn("form-label mb-2", ui?.formLabel)}>
                {label}
              </FormLabel>
            )}
            {description && (
              <FormDescription
                className={cn("form-description mb-2", ui?.formDescription)}
              >
                {description}
              </FormDescription>
            )}
            <FormControl>
              {(() => {
                if (props.renderAs === "textarea") {
                  return (
                    <TextareaAdapter<TFormValues> field={field} {...props} />
                  );
                }
                if (props.renderAs === "select") {
                  return (
                    <SelectAdapter<TFormValues> field={field} {...props} />
                  );
                }
                if (props.renderAs === "switch") {
                  return (
                    <SwitchAdapter<TFormValues> field={field} {...props} />
                  );
                }
                if (props.renderAs === "checkbox") {
                  return (
                    <CheckboxAdapter<TFormValues> field={field} {...props} />
                  );
                }
                if (props.renderAs === "radio-group") {
                  return (
                    <RadioGroupAdapter<TFormValues> field={field} {...props} />
                  );
                }
                if (props.renderAs === "datepicker") {
                  return (
                    <DatePickerAdapter<TFormValues> field={field} {...props} />
                  );
                }
                if (props.renderAs === "slider") {
                  return (
                    <SliderAdapter<TFormValues> field={field} {...props} />
                  );
                }
                if (props.renderAs === "file-input") {
                  return (
                    <FileInputAdapter<TFormValues> field={field} {...props} />
                  );
                }
                // Combobox already handled in a previous step
                // Default case for `input` or when `renderAs` is undefined
                return <InputAdapter<TFormValues> field={field} {...props} />;
              })()}
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

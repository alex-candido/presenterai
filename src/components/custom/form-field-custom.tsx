"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type FormFieldCustomProps<TFormValues extends FieldValues> = {
  control?: Control<TFormValues>;
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
  children: React.ReactNode; 
};

export function FormFieldCustom<TFormValues extends FieldValues>(
  props: FormFieldCustomProps<TFormValues>,
) {
  const { control, name, label, description, className, ui, children } = props;

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
              {React.cloneElement(children as React.ReactElement, { ...field })}
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

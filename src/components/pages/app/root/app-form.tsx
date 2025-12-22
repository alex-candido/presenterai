"use client";

import * as React from "react";
import { Control, FieldErrors, UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { AppCreateGenerationInput } from "@/schemas/app/generation-schema";
import { AppFormControls } from "./app-form-controls";

interface AppFormProps extends React.HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<AppCreateGenerationInput, any>;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  control: Control<AppCreateGenerationInput>;
  isSubmitting: boolean;
  errors: FieldErrors<AppCreateGenerationInput>; 
}

export function AppForm({
  form,
  handleSubmit,
  control,
  isSubmitting,
  errors,
  className,
  ...props
}: AppFormProps) {
  return (
    <div className={cn("app-form flex flex-col", className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'A 10-slide presentation on the future of renewable energy'"
                    className="resize-none"
                    rows={6}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AppFormControls isSubmitting={isSubmitting} isValid={form.formState.isValid} />
        </form>
      </Form>
    </div>
  );
}
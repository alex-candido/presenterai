import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, UseFormProps, useForm as useReactHookForm } from "react-hook-form";
import { z } from "zod";

import { API_MESSAGES } from "@/config/messages";

interface UseFormHookProps<TFormValues extends FieldValues, TApiResult> {
  schema: z.Schema<TFormValues>;
  mutationFn: (data: TFormValues) => Promise<TApiResult>;
  onSuccess?: (data: TApiResult, formValues: TFormValues) => void;
  onError?: (error: Error, formValues: TFormValues) => void;
  defaultValues?: UseFormProps<TFormValues>["defaultValues"];
  mode?: UseFormProps<TFormValues>["mode"]; // Adicionado mode
}

export function useForm<TFormValues extends FieldValues, TApiResult>({
  schema,
  mutationFn,
  onSuccess,
  onError,
  defaultValues,
  mode = "onChange", // Definido 'onChange' como padrão
}: UseFormHookProps<TFormValues, TApiResult>) {
  const form = useReactHookForm<TFormValues>({
    resolver: zodResolver(schema as any),
    defaultValues,
    mode, // Passado para o hook
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, disabled, isReady, isDirty, dirtyFields, isSubmitting, touchedFields, isValid, isValidating, validatingFields, submitCount, isSubmitSuccessful, isSubmitted, isLoading },
    resetField,
    reset,
    watch,
    setValue,
    clearErrors,
    getFieldState,
    subscribe,
    trigger,
    getValues,
    setFocus,
    unregister,
    setError: setFormError,
  } = form;

  const onSubmit = async (data: TFormValues) => {
    setFormError("root", { type: "manual", message: "" });

    try {
      const result = await mutationFn(data);
      onSuccess?.(result, data);
    } catch (err: any) {
      let message = API_MESSAGES.COMMON.GENERIC_API_ERROR;

      if (typeof err?.message === "string") {
        message = err.message;
      } else if (typeof err?.message === "object") {
        message = JSON.stringify(err.message);
      }

      setFormError("root", { type: "manual", message });
      onError?.(new Error(message), data);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    formState: {
      errors,
      disabled,
      isReady,
      isDirty,
      dirtyFields,
      isSubmitting,
      touchedFields,
      isValid,
      isValidating,
      validatingFields,
      submitCount,
      isSubmitSuccessful,
      isSubmitted,
      isLoading,
    },
    form,
    register,
    control,
    defaultValues,
    resetField,
    reset,
    watch,
    setValue,
    clearErrors,
    getFieldState,
    subscribe,
    trigger,
    getValues,
    setFocus,
    unregister,
  };
}

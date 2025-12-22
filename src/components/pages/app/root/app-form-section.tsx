"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { API_MESSAGES } from "@/config/messages";
import { APP_ROUTES } from "@/config/routes";
import { useAppGenerations } from "@/hooks/use-app-generations";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import {
  AppCreateGenerationInput,
  appCreateGenerationSchema,
} from "@/schemas/app/generation-schema";
import { AppForm } from "./app-form";

export function AppFormSection({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { createGeneration } = useAppGenerations();
  const createGenerationMutation = createGeneration();

  const { form, handleSubmit, control, formState } = useForm<
    AppCreateGenerationInput,
    any
  >({
    schema: appCreateGenerationSchema,
    defaultValues: {
      prompt: "",
    },
    mutationFn: async (data) => createGenerationMutation.mutateAsync(data),
    onSuccess: (result) => {
      console.log(result)
      toast.success(API_MESSAGES.COMMON.CREATE_SUCCESS);
      startTransition(() => {
        router.push(APP_ROUTES.APP.GENERATE.DETAIL(result.id));
      });
    },
  });

  return (
    <div className={cn("app-form-section", className)} {...props}>
      <AppForm
        form={form}
        control={control}
        handleSubmit={handleSubmit}
        isSubmitting={formState.isSubmitting || isPending}
        errors={formState.errors}
      />
    </div>
  );
}
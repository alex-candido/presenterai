"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

import { APP_ROUTES } from "@/config/routes";
import { useAuthActions } from "@/hooks/use-auth";
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
  const { useSession } = useAuthActions();
  const { data: session } = useSession();
  const user: any = session?.user;

  const { form, handleSubmit, control, formState, setValue } = useForm<
    AppCreateGenerationInput,
    any
  >({
    schema: appCreateGenerationSchema,
    defaultValues: {
      prompt: "",
      userId: undefined,
    },
    mutationFn: async (data) => createGenerationMutation.mutateAsync(data),
    onSuccess: (result) => {
      startTransition(() => {
        router.push(APP_ROUTES.APP.GENERATE.DETAIL(result.id));
      });
    },
  });

  useEffect(() => {
    if (user?.id) {
      setValue("userId", user.id, { shouldValidate: true });
    }
  }, [user?.id, setValue]);

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
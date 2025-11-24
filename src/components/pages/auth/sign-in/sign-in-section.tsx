import { authActions } from "@/actions/auth-actions";
import { useForm } from "@/hooks/use-form";
import { cn } from "@/lib/utils";
import { SignInFormValues, signInSchema } from "@/schemas/auth-schema";
import { useRouter } from "next/navigation";
import { SignInForm } from "./sign-in-form";

export function SignInSection({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { signInCredentials } = authActions();
  const router = useRouter();

  const action = async (data: SignInFormValues) => {
    const { error, data: resultData } = await signInCredentials(data);
    if (error) throw new Error(error.message);
    return resultData;
  };

  const {
    form,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormValues, any>({ schema: signInSchema, defaultValues: {
      email: "",
      password: "",
    },
    mutationFn: action,
    onSuccess: () => {
      router.push("/app");
    },
  });

  return (
    <section className={cn("sign-in-section", className)} {...props}>
      <SignInForm
        form={form}
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
      />
    </section>
  );
}

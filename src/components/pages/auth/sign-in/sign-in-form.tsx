
'use client';

import { AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

import { AlertAdapter, ButtonAdapter, FormFieldAdapter } from '@/components/adapters';
import { Form } from '@/components/ui/form';
import { useForm } from '@/hooks/use-form';
import { cn } from '@/lib/utils';
import { API_MESSAGES } from '@/lib/utils/messages';
import { SignInFormValues, signInSchema } from '@/schemas/auth-schema';

export function SignInForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    form,
    handleSubmit,
    control,
    isSubmitting,
    apiError,
  } = useForm<SignInFormValues, { message: string }>({
    schema: signInSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    mutationFn: async (data) => {
      // Simulate API call
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.password === 'error') {
            reject(new Error(API_MESSAGES.AUTH.SIGN_IN_FAILED));
          } else {
            resolve({ message: API_MESSAGES.AUTH.SIGN_IN_SUCCESS });
          }
        }, 1500);
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
    },
    onError: () => {
      setIsSuccess(false);
    },
  });

  return (
    <div className={cn('sign-in-form', className)} {...props}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {isSuccess && (
            <AlertAdapter
              variant="default"
              title="Sucesso!"
              description={API_MESSAGES.AUTH.SIGN_IN_SUCCESS}
              icon={<CheckCircle className="h-4 w-4" />}
            />
          )}
          {apiError && !isSuccess && (
            <AlertAdapter
              variant="destructive"
              title="Erro de Autenticação"
              description={apiError}
              icon={<AlertCircle className="h-4 w-4" />}
            />
          )}
          <FormFieldAdapter
            renderAs="input"
            type="email"
            control={control}
            name="email"
            label="E-mail"
            placeholder="seu@email.com"
          />
          <FormFieldAdapter
            renderAs="input"
            type="password"
            control={control}
            name="password"
            label="Senha"
            placeholder="********"
          />
          <ButtonAdapter type="submit" disabled={isSubmitting} className="cursor-pointer w-full">
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </ButtonAdapter>
        </form>
      </Form>
    </div>
  );
}

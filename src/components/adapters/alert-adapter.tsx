
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cva, type VariantProps } from 'class-variance-authority';

const alertAdapterVariants = cva('', {
  variants: {
    variant: {
      default: '',
      destructive: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface AlertAdapterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertAdapterVariants> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const AlertAdapter = React.forwardRef<HTMLDivElement, AlertAdapterProps>(
  ({ className, variant, title, description, icon, ...props }, ref) => {
    return (
      <Alert
        ref={ref}
        className={className}
        variant={variant ?? 'default'}
        {...props}
      >
        {icon}
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    );
  }
);

AlertAdapter.displayName = 'AlertAdapter';

export { AlertAdapter };

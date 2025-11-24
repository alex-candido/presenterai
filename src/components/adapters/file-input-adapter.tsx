import { Input } from "@/components/ui/input";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface FileInputAdapterProps<TFormValues extends FieldValues> {
  field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  placeholder?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
}

export function FileInputAdapter<TFormValues extends FieldValues>({
  field,
  placeholder,
  disabled,
  isSubmitting,
}: FileInputAdapterProps<TFormValues>) {
  // Destructure to handle the `onChange` specifically for file inputs
  const { onChange, ...rest } = field;

  return (
    <Input
      {...rest}
      type="file"
      placeholder={placeholder}
      disabled={disabled || isSubmitting}
      onChange={(event) => {
        // Pass the FileList to react-hook-form
        onChange(event.target.files);
      }}
    />
  );
}
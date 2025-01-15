import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

type TextInputProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  className?: string;
  placeHolder?: string;
};

const TextInput = ({
  id,
  className,
  placeholder,
  ...props
}: TextInputProps) => {
  const { register } = useFormContext();
  return (
    <input
      id={id}
      type="text"
      className={cn(className)}
      placeholder={placeholder}
      {...register(id)}
      {...props}
    />
  );
};

export default TextInput;

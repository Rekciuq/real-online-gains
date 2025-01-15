import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

type PasswordInput = ComponentPropsWithoutRef<"input"> & {
  id: string;
  className?: string;
};

const PasswordInput = ({ id, className, ...props }: PasswordInput) => {
  const { register } = useFormContext();
  return (
    <input
      id={id}
      type="password"
      className={cn(className)}
      {...register(id)}
      {...props}
    />
  );
};

export default PasswordInput;

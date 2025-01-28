import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  id: string;
  className?: string;
};

const TextArea = ({ id, className, ...props }: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const defaultClassNames =
    "border border-emerald-100 resize-none rounded-md py-1 px-2 hover:border-emerald-200 focus-visible:outline-emerald-400";

  return (
    <textarea
      className={cn(
        defaultClassNames,
        errors[id] &&
          "border-red-400 hover:border-red-300 focus-visible:outline-red-500",
        className,
      )}
      {...register(id)}
      {...props}
    />
  );
};

export default TextArea;

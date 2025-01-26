import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

type RadioInputProps = {
  id: string;
  className?: string;
  value: string;
};

const RadioInput = ({ id, className, value }: RadioInputProps) => {
  const defaultClassNames = "!border-emerald-100 !hover:border-emerald-200";
  const { register } = useFormContext();
  return (
    <input
      className={cn(defaultClassNames, className)}
      value={value}
      type="radio"
      {...register(id)}
    />
  );
};

export default RadioInput;

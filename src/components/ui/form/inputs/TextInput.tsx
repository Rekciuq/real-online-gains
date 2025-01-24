import { TEXT_INPUT_TYPE } from "@/constants/inputTypes";
import { MAX_TEXT_INPUT_LENGTH } from "@/constants/validation/length";
import { cn } from "@/lib/utils";
import { InputsTypeProps } from "@/types/common";
import { useFormContext } from "react-hook-form";

const TextInput = ({
  id,
  className,
  placeholder,
  ...props
}: InputsTypeProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const defaultClassNames =
    "border border-emerald-100 rounded-md py-1 px-2 hover:border-emerald-200 focus-visible:outline-emerald-400";

  return (
    <input
      type={TEXT_INPUT_TYPE}
      className={cn(
        defaultClassNames,
        errors[id] &&
          "border-red-400 hover:border-red-300 focus-visible:outline-red-500",
        className,
      )}
      placeholder={placeholder}
      maxLength={MAX_TEXT_INPUT_LENGTH}
      {...register(id)}
      {...props}
    />
  );
};

export default TextInput;

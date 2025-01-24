import { PASSWORD_INPUT_TYPE, TEXT_INPUT_TYPE } from "@/constants/inputTypes";
import { cn } from "@/lib/utils";
import { InputsTypeProps } from "@/types/common";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Eye from "../../icons/Eye";
import CrossedEye from "../../icons/CrossedEye";
import { MAX_TEXT_INPUT_LENGTH } from "@/constants/validation/length";

const PasswordInput = ({ id, className, ...props }: InputsTypeProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const defaultClassNames =
    "border border-emerald-100 rounded-md w-full py-1 px-2 pr-8 hover:border-emerald-200 focus-visible:outline-emerald-400";

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? TEXT_INPUT_TYPE : PASSWORD_INPUT_TYPE}
        className={cn(
          defaultClassNames,
          errors[id] &&
            "border-red-400 hover:border-red-300 focus-visible:outline-red-500",
          className,
        )}
        maxLength={MAX_TEXT_INPUT_LENGTH}
        {...register(id)}
        {...props}
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="absolute p-2 top-0.5 right-0 cursor-pointer"
      >
        {showPassword ? (
          <Eye className="h-4 w-4 stroke-black" />
        ) : (
          <CrossedEye className="h-4 w-4 stroke-black" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;

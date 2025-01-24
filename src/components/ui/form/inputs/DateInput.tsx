import { DATE_INPUT_TYPE } from "@/constants/inputTypes";
import { cn } from "@/lib/utils";
import { InputsTypeProps } from "@/types/common";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const DateInput = ({ id, className, ...props }: InputsTypeProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [dateValue, setDateValue] = useState("");
  const defaultClassNames =
    "border border-emerald-100 rounded-md w-full py-1 px-2 hover:border-emerald-200 focus-visible:outline-emerald-400";

  const { ref, ...rest } = register(id, {
    onChange: (event) => setDateValue(event.target.value),
  });

  const clearInput = () => {
    const clearedValue = "";
    dateRef!.current!.value = clearedValue;
    setDateValue(clearedValue);
  };

  return (
    <div className="relative">
      <input
        id={id}
        ref={(event) => {
          ref(event);
          dateRef.current = event;
        }}
        type={DATE_INPUT_TYPE}
        className={cn(
          defaultClassNames,
          errors[id] &&
            "border-red-400 hover:border-red-300 focus-visible:outline-red-500",
          className,
        )}
        {...rest}
        {...props}
      />
      {dateValue && (
        <div
          onClick={clearInput}
          className="absolute z-1 top-2.5 right-8 hover:cursor-pointer p-2 flex justify-center items-center bg-transparent"
        >
          <div className="w-0.5 h-3 rotate-45 absolute z-1 border-r bg-black border-r-black"></div>
          <div className="w-0.5 h-3 -rotate-45 absolute z-1 border-r bg-black border-r-black"></div>
        </div>
      )}
    </div>
  );
};

export default DateInput;

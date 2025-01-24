import { IMAGE_PREFIX } from "@/constants/imageTypes";
import { IMAGE_INPUT_TYPE, TEXT_INPUT_TYPE } from "@/constants/inputTypes";
import { cn } from "@/lib/utils";
import { InputsTypeProps } from "@/types/common";
import Image from "next/image";
import { SyntheticEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageInput = ({ id, className, ...props }: InputsTypeProps) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imagePath, setImagePath] = useState("");
  const [imageDisplayPath, setImageDisplayPath] = useState("");

  const { ref, ...rest } = register(id, {
    onChange: (event) => {
      const file: File = event.target.files?.[0];
      if (!file || !file.type.startsWith(IMAGE_PREFIX)) {
        clearInput(event);
        return;
      }

      setImagePath(file.name);
      const imageURL = URL.createObjectURL(file);
      setImageDisplayPath(imageURL);
    },
  });

  const clearInput = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();

    const clearedValue = "";
    imageRef!.current!.value = clearedValue;
    setImagePath(clearedValue);
    setImageDisplayPath(clearedValue);

    trigger(id);
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        id={id}
        ref={(event) => {
          ref(event);
          imageRef.current = event;
        }}
        type={IMAGE_INPUT_TYPE}
        className="hidden"
        {...rest}
        {...props}
      />
      <label
        htmlFor={id}
        className="relative h-full w-full block group cursor-pointer"
      >
        <input
          type={TEXT_INPUT_TYPE}
          className={cn(
            "border border-emerald-100 rounded-md w-full py-1 px-2 pr-8 hover:border-emerald-200 focus-visible:outline-emerald-400 pointer-events-none",
            errors[id] && "border-red-400 group-hover:border-red-300",
            className,
          )}
          value={imagePath}
          readOnly
        />
        {!!imagePath && (
          <div
            onClick={clearInput}
            className="absolute z-1 top-2.5 right-2 hover:cursor-pointer p-2 flex justify-center items-center bg-transparent"
          >
            <div className="w-0.5 h-3 rotate-45 absolute z-1 border-r bg-black border-r-black"></div>
            <div className="w-0.5 h-3 -rotate-45 absolute z-1 border-r bg-black border-r-black"></div>
          </div>
        )}
      </label>
      <div className="min-h-7 min-w-7 h-7 w-7 rounded-full relative">
        {imageDisplayPath ? (
          <Image
            fill
            className="rounded-full object-cover"
            src={imageDisplayPath}
            alt="Profile Picture"
          />
        ) : (
          <div className="bg-emerald-300 rounded-full h-full w-full flex items-center justify-center">
            <div className="absolute h-[70%] rounded-full border-r-2 border-r-white"></div>
            <div className="absolute h-[70%] rounded-full border-r-2 border-r-white rotate-90"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageInput;

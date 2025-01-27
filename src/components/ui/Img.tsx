import { cn } from "@/lib/utils";
import Image from "next/image";

type ImgProps = {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
};

const Img = ({ src, alt, containerClassName, className }: ImgProps) => {
  return (
    <div className={cn("relative h-8 w-8 rounded-full", containerClassName)}>
      <Image
        className={cn("rounded-full object-cover", className)}
        fill
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Img;

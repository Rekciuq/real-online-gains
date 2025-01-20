import { cva, VariantProps } from "class-variance-authority";
import Loader from "./Loader";
import { cn } from "@/lib/utils";

const button = cva("button", {
  variants: {
    intent: {
      submit: "border border-emerald-300 focus-visible:outline-emerald-400",
    },
    size: {
      small: "",
      big: "w-full px-2 py-1 rounded-md",
    },
    disabled: {
      false: null,
      true: "opacity-70 pointer-events-none",
    },
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {}

const Button = ({
  intent,
  size,
  disabled,
  className,
  children,
}: ButtonProps) => {
  return (
    <button className={cn(button({ intent, size, disabled, className }))}>
      <>
        {disabled ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader className="h-6 text-emerald-300" />
          </div>
        ) : (
          children
        )}
      </>
    </button>
  );
};

export default Button;

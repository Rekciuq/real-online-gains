import { cva, VariantProps } from "class-variance-authority";
import Loader from "./icons/Loader";
import { cn } from "@/lib/utils";

const button = cva("button", {
  variants: {
    intent: {
      submit:
        "border border-emerald-300 hover:border-emerald-200 hover:bg-emerald-300 hover:text-white transition-colors focus-visible:outline-emerald-400",
      danger:
        "border border-red-300 hover:border-red-200 hover:bg-red-300 transition-colors hover:text-white focus:outline-red-400",
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
  onClick,
}: ButtonProps) => {
  const lodaderColors = {
    submit: "text-emerald-300",
    danger: "text-red-300",
  };

  return (
    <button
      onClick={onClick}
      className={cn(button({ intent, size, disabled, className }))}
    >
      <>
        {disabled ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader className={cn("h-6", intent && lodaderColors[intent])} />
          </div>
        ) : (
          children
        )}
      </>
    </button>
  );
};

export default Button;

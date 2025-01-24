import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  const defaultClassNames =
    "flex justify-center items-center p-2 rounded-md border shadow-xl border-emerald-100 shadow-emerald-50";
  return <div className={cn(defaultClassNames, className)}>{children}</div>;
};

export default Card;

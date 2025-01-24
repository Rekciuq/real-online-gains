import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
  children: React.ReactNode;
};

const Header = ({ className, children }: HeaderProps) => {
  return (
    <h1 className={cn("font-semibold text-4xl text-center m-2", className)}>
      {children}
    </h1>
  );
};

export default Header;

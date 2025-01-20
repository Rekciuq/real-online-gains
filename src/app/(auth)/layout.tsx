import Card from "@/components/ui/card/Card";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>{children}</Card>
    </div>
  );
};

export default AuthLayout;

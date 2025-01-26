import Card from "@/components/ui/card/Card";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return <Card className="w-fit">{children}</Card>;
};

export default ProfileLayout;

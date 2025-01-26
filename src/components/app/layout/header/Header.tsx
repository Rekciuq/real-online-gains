import Button from "@/components/ui/Button";
import { LOGOUT_ROUTE } from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  userFullName: string | null;
  imageSrc?: string;
};

const Header = ({ userFullName, imageSrc }: HeaderProps) => {
  return (
    <div className="border-b shadow-xl border-emerald-100 shadow-emerald-50 flex justify-end">
      {userFullName && <p>{userFullName}</p>}
      {imageSrc && <Image fill src={imageSrc} alt="Thing" />}
      <Link href={LOGOUT_ROUTE}>
        <Button intent={"danger"} size={"big"}>
          Logout
        </Button>
      </Link>
    </div>
  );
};

export default Header;

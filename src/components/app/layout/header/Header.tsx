import Button from "@/components/ui/Button";
import { LOGOUT_ROUTE } from "@/constants/routes";
import Link from "next/link";
import Img from "@/components/ui/Img";
import { Dispatch, SetStateAction } from "react";
import Loader from "@/components/ui/icons/Loader";

type HeaderProps = {
  userFullName: string | null;
  imageSrc?: string;
  setNavigation: Dispatch<SetStateAction<boolean>>;
  showNavigation: boolean;
};

const Header = ({
  userFullName,
  imageSrc,
  setNavigation,
  showNavigation,
}: HeaderProps) => {
  const handleShowNavigation = () => {
    const currentState = !showNavigation;

    setNavigation(currentState);
  };
  return (
    <div className="border-b shadow-xl border-emerald-100 shadow-emerald-50 flex justify-between items-center p-4">
      <div
        onClick={handleShowNavigation}
        className="w-9 h-7 flex flex-col justify-between group cursor-pointer p-2"
      >
        {showNavigation ? (
          <div className="flex h-full w-full justify-center items-center relative">
            <div className="h-5 w-9 bg-transparent"></div>
            <div className="absolute w-full border-b-2 rotate-45 border-emerald-300 max-md:border-b group-hover:border-emerald-200 transition-colors"></div>
            <div className="absolute w-full border-b-2 -rotate-45 border-emerald-300 max-md:border-b group-hover:border-emerald-200 transition-colors"></div>
          </div>
        ) : (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border-b-2 border-emerald-300 max-md:border-b group-hover:border-emerald-200 transition-colors"
              ></div>
            ))}
          </>
        )}
      </div>
      <div className="gap-2 flex justify-end items-center">
        {!!imageSrc && userFullName !== null ? (
          <>
            <p>{userFullName}</p>
            <Img src={imageSrc} alt="Profile Picture" />
          </>
        ) : (
          <Loader className="h-8 w-20 text-emerald-300" />
        )}
        <Link href={LOGOUT_ROUTE}>
          <Button intent={"danger"} size={"big"}>
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

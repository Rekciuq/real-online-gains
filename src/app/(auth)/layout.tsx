"use client";

import Card from "@/components/ui/card/Card";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/constants/routes";
import { LOGIN, REDIRECT_TO, SIGNUP } from "@/constants/text/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignup = pathname === SIGNUP_ROUTE;
  return (
    <div className="flex justify-center flex-col gap-3 items-center h-dvh">
      <Card>{children}</Card>
      <div className="flex gap-2">
        <p>{REDIRECT_TO}</p>
        <Link
          className="text-emerald-500 hover:text-emerald-300"
          href={isSignup ? LOGIN_ROUTE : SIGNUP_ROUTE}
        >
          {isSignup ? LOGIN : SIGNUP}
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;

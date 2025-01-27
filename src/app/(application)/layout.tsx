"use client";

import Header from "@/components/app/layout/header/Header";
import SideBar from "@/components/app/layout/sidebar/SideBar";
import Card from "@/components/ui/card/Card";
import { LOCAL_IMAGE, LOCAL_USER } from "@/constants/localStorageItems";
import { LOGOUT_ROUTE } from "@/constants/routes";
import LocalStorageService from "@/services/client/LocalStorageService";
import { Image, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<Image | null>(null);
  const [showNavigation, setShowNavigation] = useState(true);

  useEffect(() => {
    const user = LocalStorageService.getItem(LOCAL_USER);
    const image = LocalStorageService.getItem(LOCAL_IMAGE);
    if (!user || !image) router.push(LOGOUT_ROUTE);

    setUser(user);
    setImage(image);
  }, [router]);

  const firstname = user?.firstName ? user?.firstName : "";
  const lastname = user?.lastName ? user?.lastName : "";
  const fullName = firstname + " " + lastname;

  return (
    <div>
      <Header
        showNavigation={showNavigation}
        setNavigation={setShowNavigation}
        userFullName={!firstname && !lastname ? "" : fullName}
        imageSrc={image?.url}
      />
      {showNavigation && <SideBar />}
      <div className="p-10 m-10 flex justify-center">
        <Card className="w-fit">{children}</Card>
      </div>
    </div>
  );
}

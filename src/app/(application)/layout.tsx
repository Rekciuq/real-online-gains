"use client";

import Header from "@/components/app/layout/header/Header";
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
        userFullName={!firstname && !lastname ? "" : fullName}
        imageSrc={image?.url}
      />
      <p>App layout</p>
      {children}
    </div>
  );
}

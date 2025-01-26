import { LOCAL_USER } from "@/constants/localStorageItems";
import {
  ADMIN_DASHBOARD_ROUTE,
  CHATS_ROUTE,
  PROFILE_ROUTE,
} from "@/constants/routes";
import LocalStorageService from "@/services/client/LocalStorageService";
import { User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = LocalStorageService.getItem(LOCAL_USER);

    setUser(user);
  }, []);

  const navLinks = [
    { link: ADMIN_DASHBOARD_ROUTE, label: "Admin Dashboard" },
    { link: CHATS_ROUTE, label: "Chats" },
    { link: PROFILE_ROUTE + `/${user?.id}`, label: "Profile" },
  ];

  return (
    <div className="relative">
      <div className="absolute p-4 bg-white rounded-md top-4 left-2 flex flex-col gap-3 border border-emerald-200">
        {navLinks.map((link, index) => (
          <Link
            key={link.link + index}
            className="hover:opacity-60 transition-opacity"
            href={link.link}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;

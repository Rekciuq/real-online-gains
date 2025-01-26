"use client";

import { LOGIN_ROUTE } from "@/constants/routes";
import { TOAST_MESSAGE_SUCCESS_LOGOUT } from "@/constants/toastMessages/success";
import LocalStorageService from "@/services/client/LocalStorageService";
import ToastEmitter from "@/services/client/ToastEmitter";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    LocalStorageService.removeAll();
    ToastEmitter.success(TOAST_MESSAGE_SUCCESS_LOGOUT);
    router.push(LOGIN_ROUTE);
  });
};

export default LogoutPage;

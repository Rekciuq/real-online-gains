import ToastEmitter from "@/services/client/ToastEmitter";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect } from "react";

type handleResponseClientProps<T> = {
  data?: T | null;
  error: Error | null;
  successMessage?: string;
  dataCb?: (data: T) => void;
  errorCb?: (error: string) => void;
  router?: AppRouterInstance;
  link?: string;
};

const useHandleResponseClient = <T>({
  data,
  error,
  successMessage,
  errorCb,
  dataCb,
  router,
  link,
}: handleResponseClientProps<T>) => {
  useEffect(() => {
    if (!data) return;

    if (dataCb) dataCb(data);

    if (successMessage) ToastEmitter.success(successMessage);

    if (router && link) {
      router.push(link);
    }
  }, [data, dataCb, successMessage, router, link]);

  useEffect(() => {
    if (!error) return;

    if (typeof error === "string") {
      if (errorCb) {
        errorCb(error);
      }
      ToastEmitter.error(error);
    }
  }, [error, errorCb]);
};

export default useHandleResponseClient;

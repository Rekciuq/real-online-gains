import ToastEmitter from "@/services/client/ToastEmitter";
import { useEffect } from "react";

type handleResponseClientProps<T> = {
  data?: T;
  error: Error | null;
  successMessage: string;
  dataCb?: (data: T) => void;
  errorCb?: (error: string) => void;
};

const useHandleResponseClient = <T>({
  data,
  error,
  successMessage,
  errorCb,
  dataCb,
}: handleResponseClientProps<T>) => {
  useEffect(() => {
    if (data) {
      if (dataCb) {
        dataCb(data);
      }
      ToastEmitter.success(successMessage);
    }
  }, [data, dataCb, successMessage]);

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        if (errorCb) {
          errorCb(error);
        }
        ToastEmitter.error(error);
      }
    }
  }, [error, errorCb]);
};

export default useHandleResponseClient;

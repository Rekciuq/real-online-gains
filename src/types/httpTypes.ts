import { AxiosRequestConfig } from "axios";

export type RequestWithData<TData> = {
  url?: string;
  data: TData;
  config?: AxiosRequestConfig;
};

export type RequestWithFormData<TData> = {
  url?: string;
  image: TData;
  config?: AxiosRequestConfig;
};

export type RequestWithoutData = {
  url?: string;
  config?: AxiosRequestConfig;
};

"use client";
import {
  NETWORK_ERROR,
  UNHANDLED_NETWORK_ERROR,
} from "@/constants/errors/api-server-errors";
import {
  RequestWithData,
  RequestWithFormData,
  RequestWithoutData,
} from "@/types/httpTypes";
import axios, { AxiosInstance } from "axios";

class HttpService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL,
    });
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor() {
    this.instance.interceptors.request.use((config) => {
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }
      return config;
    });
  }

  private setupResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response) => Promise.resolve(response),
      (error) => {
        if (!error.response) {
          return Promise.reject(NETWORK_ERROR);
        }

        const serverErrorMessage =
          error.response.data?.message || UNHANDLED_NETWORK_ERROR;
        return Promise.reject(serverErrorMessage);
      },
    );
  }

  protected async get<TData>({ url = "", config = {} }: RequestWithoutData) {
    try {
      const response = await this.instance.get<TData>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async post<TData>({
    url = "",
    data,
    config = {},
  }: RequestWithData<TData>) {
    try {
      const response = await this.instance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async postForm<TData>({
    url = "",
    image,
    config = {},
  }: RequestWithFormData<TData>) {
    try {
      const response = await this.instance.postForm(url, image, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async put<TData>({
    url = "",
    data,
    config = {},
  }: RequestWithData<TData>) {
    try {
      const response = await this.instance.put<TData>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  protected async delete({ url = "", config = {} }: RequestWithoutData) {
    try {
      const response = await this.instance.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default HttpService;

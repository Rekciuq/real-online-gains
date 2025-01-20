import { RequestWithData, RequestWithoutData } from "@/types/httpTypes";
import axios, { AxiosInstance } from "axios";

class HttpService {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<TData>({ url = "", config = {} }: RequestWithoutData) {
    try {
      const response = await this.instance.get<TData>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async post<TData>({ url = "", data, config = {} }: RequestWithData<TData>) {
    try {
      const response = await this.instance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<TData>({ url = "", data, config = {} }: RequestWithData<TData>) {
    try {
      const response = await this.instance.put<TData>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete({ url = "", config = {} }: RequestWithoutData) {
    try {
      const response = await this.instance.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default HttpService;

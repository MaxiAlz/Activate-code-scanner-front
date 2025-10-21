import { AxiosRequestConfig } from "axios";

export interface ServerError {
  message: string;
  name: string;
  stack?: string;
  config?: AxiosRequestConfig;
  code?: string;
  status?: number;
  response?: {
    status?: number;
    data?: unknown;
  };
}

"use client";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import qs from "query-string";

const controller = new AbortController();

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // trigger refresh token
      } else if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      console.error("No response received from server");
    }

    return Promise.reject(error);
  }
);

type queryFnProps = {
  url: string;
  queryParams?: Record<string, any> | null;
  headers?: any | {};
};

export const queryFn = async <T>({
  url,
  queryParams = {},
  headers = {},
}: queryFnProps) => {
  const newUrl = qs.stringifyUrl({
    url,
    query: { ...queryParams },
  });

  const { data } = await apiClient.get<T>(newUrl, {
    headers: { ...headers },
    signal: controller.signal,
  });
  return data;
};

type useQueryProcessorProps = {
  url: string;
  queryParams?: Record<string, any>;
  key: any[];
  options?: Record<string, any>;
  headers?: Record<string, any>;
};

export const useQueryProcessor = <T>({
  url,
  queryParams = {},
  key = [],
  options = {},
  headers = {},
}: useQueryProcessorProps) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => queryFn({ url, queryParams, headers }),
    ...options,
  });
};

export type HttpMutationMethod = "DELETE" | "POST" | "PUT" | "PATCH";

type mutationFnProps<T> = {
  url: string;
  queryParams?: Record<string, any> | null;
  headers?: any | {};
  method: HttpMutationMethod;
  value: T;
};

export const mutationFn = async <T>({
  url,
  queryParams = {},
  method,
  value,
  headers = {},
}: mutationFnProps<T>) => {
  const newUrl = qs.stringifyUrl({
    url,
    query: { ...queryParams },
  });

  switch (method) {
    case "DELETE":
      return (
        await apiClient.delete<T>(newUrl, {
          headers,
          signal: controller.signal,
        })
      ).data;
    case "PATCH":
      return (
        await apiClient.patch<T>(newUrl, value, {
          headers,
          signal: controller.signal,
        })
      ).data;
    case "POST":
      return (
        await apiClient.post<T>(newUrl, value, {
          headers,
          signal: controller.signal,
        })
      ).data;
    case "PUT":
      return (
        await apiClient.put<T>(newUrl, value, {
          headers,
          signal: controller.signal,
        })
      ).data;
    default:
      throw new Error("Invalid mutation method");
  }
};

type useMutationProcessorProps = {
  url: string;
  queryParams?: Record<string, any>;
  method: HttpMutationMethod;
  key: any[];
  options?: Record<string, any>;
  headers?: Record<string, any>;
};

export const useMutateProcessor = <T, K>({
  url,
  queryParams = {},
  method,
  key = [],
  options = {},
  headers = {},
}: useMutationProcessorProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (value: T) =>
      mutationFn<T>({ url, queryParams, method, value, headers }) as K,
    onMutate: (data: T) => {
      const previousData = queryClient.getQueryData<T>(key);
      if (Array.isArray(previousData)) {
        queryClient.setQueryData(key, (old: any[]) => {
          if (method === "DELETE")
            return old.filter((value) => value?.id != data);
          if (method === "POST")
            return Array.isArray(data) ? [...old, ...data] : [...old, data];
        });
      }
      return { previousData };
    },
    onError: (err, newData, context) => {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
      } else {
        console.error(err);
      }
      queryClient.setQueryData(key, context?.previousData);
      console.log("🚨 error mutate processor 🚨");
    },
    onSuccess() {
      console.log("✅ success mutate processor ✅");
    },
    onSettled: async () => {
      console.log("♻️ settled mutate processor ♻️");
      return await queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

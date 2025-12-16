import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/api/auth/login", data);
      return res.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await api.post("/api/auth/register", data);
      return res.data;
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/api/auth/me");
      return res.data;
    },
    retry: false,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

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

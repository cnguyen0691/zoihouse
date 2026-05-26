import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      return data;
    }
  });
}
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertCard } from "@shared/routes";

export function useCards() {
  return useQuery({
    queryKey: [api.cards.list.path],
    queryFn: async () => {
      const res = await fetch(api.cards.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch cards");
      return api.cards.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertCard) => {
      const res = await fetch(api.cards.create.path, {
        method: api.cards.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.cards.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create card");
      }
      return api.cards.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cards.list.path] });
    },
  });
}

export function useDeleteCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.cards.delete.path, { id });
      const res = await fetch(url, {
        method: api.cards.delete.method,
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Card not found");
        throw new Error("Failed to delete card");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cards.list.path] });
    },
  });
}

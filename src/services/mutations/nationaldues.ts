import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import {
  type ToggleDueStatusResponse,
  type CreateNationalDuesPayload,
} from "../types/nationaldues";

const saveNationalDues = async ({
  payload,
  id,
}: {
  payload: CreateNationalDuesPayload;
  id?: string;
}): Promise<{ message: string }> => {
  const url = id ? `/dues/${id}?isNational=true` : "/dues?isNational=true";
  const method = id ? "patch" : "post";

  const response = await apiClient.request<{ message: string }>({
    url,
    method,
    data: JSON.stringify(payload),
    headers: id ? undefined : { "Content-Type": "application/json" },
  });

  return response.data;
};

export const useSaveNationalDues = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveNationalDues,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["national-dues"] });
      queryClient.invalidateQueries({ queryKey: ["dues-detail", id] });
    },
  });
};

const toggleDuesStatus = ({ id, action }: { id: string; action: "activate" | "deactivate" }) => {
  return apiClient.patch<ToggleDueStatusResponse>(`/dues/${id}/status?action=${action}`);
};

export const useToggleDuesStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleDuesStatus,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["national-dues"] });
      queryClient.invalidateQueries({ queryKey: ["dues-detail", id] });
    },
  });
};

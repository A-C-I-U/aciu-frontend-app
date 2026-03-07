import { useMutation } from "@tanstack/react-query";
import apiClient from "..";
import type { UserProfileResponse, UserProfilePayload } from "../types/auth";

export const useUserProfile = () => {
  return useMutation<UserProfileResponse, Error, UserProfilePayload>({
    mutationFn: async (payload: UserProfilePayload) => {
      const response = await apiClient.post<UserProfileResponse>("/auth/me", payload);
      return response.data;
    },
  });
};

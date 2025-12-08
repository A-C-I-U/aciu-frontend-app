import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  UpdateNotificationsPayload,
  UpdateNotificationsResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
  UpdateSecurityPayload,
  UpdateSecurityResponse,
  UserSettings,
} from "../types/settings";
import apiClient from "..";

const fetchUserSettings = async (): Promise<UserSettings> => {
  const response = await apiClient.get<UserSettings>("/settings");
  return response.data;
};

export const useUserSettings = () => {
  return useQuery({
    queryKey: ["userSettings"],
    queryFn: fetchUserSettings,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

const updateUserProfile = async (
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>(
    "/settings/profile",
    payload
  );
  return response.data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });
};

const updateNotificationSettings = async (
  payload: UpdateNotificationsPayload
): Promise<UpdateNotificationsResponse> => {
  const response = await apiClient.put<UpdateNotificationsResponse>(
    "/settings/notifications",
    payload
  );
  return response.data;
};

export const useUpdateNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });
};

const updateSecuritySettings = async (
  payload: UpdateSecurityPayload
): Promise<UpdateSecurityResponse> => {
  const response = await apiClient.put<UpdateSecurityResponse>(
    "/settings/security",
    payload
  );
  return response.data;
};

export const useUpdateSecurity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSecuritySettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
    },
  });
};

const changePassword = async (
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
  const response = await apiClient.put<ChangePasswordResponse>(
    "/settings/security",
    payload
  );
  return response.data;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

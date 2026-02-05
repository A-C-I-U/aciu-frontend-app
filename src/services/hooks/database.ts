import { useQuery } from "@tanstack/react-query";
import {
  type MemberProfile,
  type Member,
  type Branch,
  type AgeGrade,
  type DatabaseStats,
} from "../types/database";
import apiClient from "..";

export const useDatabaseOverview = () => {
  return useQuery<DatabaseStats, Error>({
    queryKey: ["database-stats"],
    queryFn: async (): Promise<DatabaseStats> => {
      const response = await apiClient.get<DatabaseStats>(`/database/national-dashboard`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
export const useDatabaseMembers = () => {
  return useQuery<Member[], Error>({
    queryKey: ["database-members"],
    queryFn: async (): Promise<Member[]> => {
      const response = await apiClient.get<Member[]>("/database/members");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useMemberProfile = (id: string) => {
  return useQuery<MemberProfile>({
    queryKey: ["member-profile", id],
    queryFn: async (): Promise<MemberProfile> => {
      const response = await apiClient.get<MemberProfile>(`/branch/members/${id}/overview/`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!id,
  });
};

export const useDatabaseBranches = () => {
  return useQuery<Branch[]>({
    queryKey: ["database-branches"],
    queryFn: async (): Promise<Branch[]> => {
      const response = await apiClient.get<Branch[]>(`/database/branches`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useDatabaseAgeGrades = () => {
  return useQuery<AgeGrade[]>({
    queryKey: ["database-age-grades"],
    queryFn: async (): Promise<AgeGrade[]> => {
      const response = await apiClient.get<AgeGrade[]>(`/database/agegrades`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

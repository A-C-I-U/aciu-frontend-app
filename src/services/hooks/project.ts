import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type {
  Project,
  ProjectDetails,
  ProjectDonation,
  ProjectRecommendationsResponse,
  RecommendedProject,
} from "../types/projects";

export type ProjectStatus = "ongoing" | "completed";

const fetchProjects = async (status: ProjectStatus): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>(`/projects?status=${status}`);
  return response.data;
};

export const useProjects = (status: ProjectStatus) => {
  return useQuery({
    queryKey: ["projects", status],
    queryFn: () => fetchProjects(status),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

const fetchProjectRecommendations = async (
  projectId: string
): Promise<RecommendedProject[]> => {
  const response = await apiClient.get<ProjectRecommendationsResponse>(
    `/projects/${projectId}/recommendations`
  );
  return response.data.recommendedProjects;
};

export const useProjectRecommendations = (projectId: string) => {
  return useQuery({
    queryKey: ["project-recommendations", projectId],
    queryFn: () => fetchProjectRecommendations(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Fetch project details
const fetchProjectDetails = async (
  projectId: string
): Promise<ProjectDetails> => {
  const response = await apiClient.get<ProjectDetails>(
    `/projects/${projectId}`
  );
  return response.data;
};

export const useProjectDetails = (projectId: string) => {
  return useQuery({
    queryKey: ["projectDetails", projectId],
    queryFn: () => fetchProjectDetails(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

const fetchProjectDonations = async (
  projectId: string
): Promise<ProjectDonation[]> => {
  const response = await apiClient.get<ProjectDonation[]>(
    `/projects/${projectId}/donations`
  );
  return response.data;
};

export const useProjectDonations = (projectId: string) => {
  return useQuery({
    queryKey: ["project-donations", projectId],
    queryFn: () => fetchProjectDonations(projectId),
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

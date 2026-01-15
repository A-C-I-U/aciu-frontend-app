import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type {
  NominatedProject,
  Project,
  ProjectDetails,
  ProjectDonation,
  ProjectNominationDetail,
  ProjectRecommendationsResponse,
  ProjectStatsResponse,
  RecommendedProject,
} from "../types/projects";
import { useUser } from "@/context/UserContext";

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


const fetchProjectStats = async (): Promise<ProjectStatsResponse> => {
  const response = await apiClient.get<ProjectStatsResponse>("/member-dashboard/projects-dashboard");
  return response.data;
}

export const useProjectStats = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ["projects", "stats"],
    queryFn: () => fetchProjectStats(),
    enabled: user?.role === "national_admin",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

const fetchNominatedProjects = async (): Promise<NominatedProject[]> => {
  const response = await apiClient.get<NominatedProject[]>("/projects/nominated");
  return response.data;
}

export const useNominatedProjects = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ["projects", "nominated-projects"],
    queryFn: () => fetchNominatedProjects(),
    enabled: user?.role === "national_admin",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  })
}

export const useProjectNominationDetail = (id: string) => {
  return useQuery<ProjectNominationDetail, Error>({
    queryKey: ['project-nomination', 'detail', id],
    enabled: !!id,
    queryFn: async (): Promise<ProjectNominationDetail> => {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  })
}
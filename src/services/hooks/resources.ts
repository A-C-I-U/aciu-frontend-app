import apiClient from "..";
import type { ResourceApiResponse, ResourceResponse } from "../types/resources";
import { useQuery } from '@tanstack/react-query';

const fetchResources = async (): Promise<ResourceApiResponse> => {
  const response = await apiClient.get<ResourceApiResponse>('/resources/aciu-resources');
  return response.data;
};

export const useResources = () => {
  return useQuery({
    queryKey: ['aciu-resources'],
    queryFn: fetchResources,
    staleTime: 10 * 60 * 1000, 
    gcTime: 15 * 60 * 1000, 
  });
};

const fetchMeetingReports = async (): Promise<ResourceApiResponse> => {
  const response = await apiClient.get<ResourceApiResponse>('/resources/meeting-reports');
  return response.data;
};

export const useMeetingReports = () => {
  return useQuery({
    queryKey: ['meeting-reports'],
    queryFn: fetchMeetingReports,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

const fetchResourceById = async (resourceId: string): Promise<ResourceResponse> => {
  const response = await apiClient.get<ResourceResponse>(`/resources/${resourceId}`);
  return response.data;
};

export const useResourceById = (resourceId: string) => {
  return useQuery({
    queryKey: ['resource', resourceId],
    queryFn: () => fetchResourceById(resourceId),
    enabled: !!resourceId, 
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
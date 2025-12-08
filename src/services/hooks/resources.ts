import apiClient from "..";
import type { MeetingReportsResponse, Resource, ResourcesResponse } from "../types/resources";
import { useQuery } from '@tanstack/react-query';

const fetchResources = async (): Promise<ResourcesResponse> => {
  const response = await apiClient.get<ResourcesResponse>('/resources');
  return response.data;
};

export const useResources = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources,
    staleTime: 10 * 60 * 1000, 
    gcTime: 15 * 60 * 1000, 
  });
};

const fetchMeetingReports = async (): Promise<MeetingReportsResponse> => {
  const response = await apiClient.get<MeetingReportsResponse>('/resources/meeting-reports');
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

const fetchResourceById = async (resourceId: string): Promise<Resource> => {
  const response = await apiClient.get<Resource>(`/resources/${resourceId}`);
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
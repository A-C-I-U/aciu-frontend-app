import apiClient from "..";
import type { ResourcesResponse } from "../types/resources";
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
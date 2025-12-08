import { useQuery } from '@tanstack/react-query';
import apiClient from '..';
import type { DashboardResponse, FinancesResponse } from '../types/dashboad';


export const useDashboardOverview = () => {
  return useQuery<DashboardResponse, Error>({
    queryKey: ['dashboard', 'overview'],
    queryFn: async (): Promise<DashboardResponse> => {
      const response = await apiClient.get<DashboardResponse>('/member-dashboard/overview');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  });
};




export const useFinances = () => {
  return useQuery<FinancesResponse, Error>({
    queryKey: ['dashboard', 'finances'],
    queryFn: async (): Promise<FinancesResponse> => {
      const response = await apiClient.get<FinancesResponse>('/member-dashboard/finances');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  });
};
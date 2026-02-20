import { useQuery } from '@tanstack/react-query';
import apiClient from '..';
import { 
  type TransactionsResponse, 
  type DashboardResponse, 
  type FinancesResponse, 
  type NationalDashboardStats,
  type DashboardWithdrawalApiResponse
} from '../types/dashboad';
import { useUser } from '@/context/UserContext';
import { type GetMemberProfileResponse } from '../types/members';


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

const fetchUpcomingEvents = async (year: string, month: string): Promise<GetMemberProfileResponse> => {
  const response = await apiClient.get<GetMemberProfileResponse>(`/member-dashboard/events?year=${year}&month=${month}`)
  return response.data
}

export const useMemberUpcomingEvents = (year: string, month: string) => {
  return useQuery({
      queryKey: ["member-upcoming-events"],
      queryFn: () => fetchUpcomingEvents(year, month),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000
  })
}

export const useNationalDashboardStats = () => {
  const { user } = useUser();
  return useQuery<NationalDashboardStats, Error>({
    queryKey: ['dashboard', 'nationalAdmin'],
    enabled: user?.role === "national_admin",
    queryFn: async (): Promise<NationalDashboardStats> => {
      const response = await apiClient.get<NationalDashboardStats>('/dashboard');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  })
}

export const useNationalDashboardWithdrawals = () => {
  const { user } = useUser();
  return useQuery<any, Error>({
    queryKey: ['dashboard', 'nationalAdmin', 'withdrawalRequests'],
    enabled: user?.role === "national_admin",
    queryFn: async (): Promise<any> => {
      const response = await apiClient.get<any>('/dashboard/withdrawals?page=1&limit=10');
      return response.data;
    },
    select: (data) => ({
      ...data,
      data: data.data.slice(0, 10),
    }),
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  })
}

export const useNationalDashboardWithdrawalDetail = (id: string) => {
  return useQuery<DashboardWithdrawalApiResponse, Error>({
    queryKey: ['withdrawal-detail', id],
    enabled: !!id,
    queryFn: async (): Promise<DashboardWithdrawalApiResponse> => {
      const response = await apiClient.get<{ message: string; data: DashboardWithdrawalApiResponse }>(`/withdrawal/${id}`);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  })
}

export const useNationalDashboardTransactions = (year: number) => {
  return useQuery<TransactionsResponse, Error>({
    queryKey: ["transactions", "dashboard", year],
    queryFn: async (): Promise<TransactionsResponse> => {
      const response = await apiClient.get<TransactionsResponse>(
        `/dashboard/transactions?year=${year}`
      );
      return response.data
    },
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
    enabled: !!year
  })
}
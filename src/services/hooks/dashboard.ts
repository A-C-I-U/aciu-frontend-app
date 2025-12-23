import { useQuery } from '@tanstack/react-query';
import apiClient from '..';
import { 
  type TransactionsResponse, 
  type DashboardResponse, 
  type FinancesResponse, 
  type NationalDashboardStats, 
  type WithdrawalDetailResponse 
} from '../types/dashboad';
import { useUser } from '@/context/UserContext';

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
    queryKey: ['dashboard', 'nationalAdmin', 'withrawalRequests'],
    enabled: user?.role === "national_admin",
    queryFn: async (): Promise<any> => {
      const response = await apiClient.get<any>('/dashboard/withdrawals');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    retry: 2,
  })
}

export const useWithdrawalDetail = (id: string) => {
  return useQuery<WithdrawalDetailResponse, Error>({
    queryKey: ['withdrawal', 'detail', id],
    enabled: !!id,
    queryFn: async (): Promise<WithdrawalDetailResponse> => {
      const response = await apiClient.get<{ message: string; data: WithdrawalDetailResponse }>(`/withdrawal/${id}`);
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
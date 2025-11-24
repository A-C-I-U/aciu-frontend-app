import { useQuery } from '@tanstack/react-query';
import apiClient from '..';
import type { DonationsDashboardResponse, DuesDashboardResponse, Payment } from '../types/mypayments';


export const useDuesDashboard = () => {
  return useQuery<DuesDashboardResponse, Error>({
    queryKey: ['dues-dashboard'],
    queryFn: async (): Promise<DuesDashboardResponse> => {
      const response = await apiClient.get('/member-dashboard/dues-dashboard');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });
};

export const useDonationsDashboard = () => {
  return useQuery<DonationsDashboardResponse, Error>({
    queryKey: ['donations-dashboard'],
    queryFn: async (): Promise<DonationsDashboardResponse> => {
      const response = await apiClient.get('/member-dashboard/donations-dashboard');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });
};

export interface PaymentsResponse extends Array<Payment> {}

export const getDuesPayments = async (): Promise<PaymentsResponse> => {
  const response = await apiClient.get<PaymentsResponse>('/payments', {
    params: { paymentType: 'DUE' }
  });
  return response.data;
};

export const getDonationsPayments = async (): Promise<PaymentsResponse> => {
  const response = await apiClient.get<PaymentsResponse>('/payments', {
    params: { paymentType: 'DONATION' }
  });
  return response.data;
};

export const paymentQueryKeys = {
  all: ['payments'] as const,
  dues: () => [...paymentQueryKeys.all, 'dues'] as const,
  donations: () => [...paymentQueryKeys.all, 'donations'] as const,
};

export const useDuesPayments = () => {
  return useQuery({
    queryKey: paymentQueryKeys.dues(),
    queryFn: getDuesPayments,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
  });
};

export const useDonationsPayments = () => {
  return useQuery({
    queryKey: paymentQueryKeys.donations(),
    queryFn: getDonationsPayments,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });
};
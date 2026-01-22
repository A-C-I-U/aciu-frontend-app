import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import { 
    type DonationVisualsResponse, 
    type DuesStatusResponse, 
    type DuesPaymentVisualsResponse, 
    type TransactionOverview, 
    type WithdrawalVisualResponse, 
    type WithdrawalResponse, 
    type DonationsResponse, 
    type DuesPaymentResponse, 
    type DuesPaymentDetail, 
    type EventDonationDetails, 
    type ProjectDonationDetails, 
    type WithdrawalDetailResponse, 
    type NationalDuesResponse, 
    type DuesStatusApiResponse,
    type NationalDuesDetail
} from "../types/transactions";

const fetchTransactionsOverview = async (): Promise<TransactionOverview> => {
    const response = await apiClient.get<TransactionOverview>(`/transactions/overview`)
    return response.data;
}

export const useTransactionsOverview = () => {
    return useQuery({
        queryKey: ["transactions-overview"],
        queryFn: () => fetchTransactionsOverview(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const useDuesPaymentsVisuals = (year: number) => {
    return useQuery<DuesPaymentVisualsResponse>({
        queryKey: ["dues-payments", "visuals", year],
        queryFn: async (): Promise<DuesPaymentVisualsResponse> => {
            const response = await apiClient.get<DuesPaymentVisualsResponse>(`/transactions/dues-payments-visuals?year=${year}`);
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: year > 0
    })
}

export const useDuesStatusVisuals = (year: number) => {
    return useQuery<DuesStatusResponse>({
        queryKey: ["dues-status-visual", year],
        queryFn: async () => {
            const response = await apiClient.get<DuesStatusApiResponse<DuesStatusResponse>>(`/transactions/dues-status-visuals?year=${year}`)
            return response.data.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: year > 0
    })
}

export const useEventDonationsVisuals = (year: number) => {
    return useQuery<DonationVisualsResponse>({
        queryKey: ["event-donations-visuals", year],
        queryFn: async (): Promise<DonationVisualsResponse> => {
            const response = await apiClient.get<DonationVisualsResponse>(`/transactions/event-donations-visuals?year=${year}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: year > 0
    })
}

export const useProjectDonationsVisuals = (year: number) => {
    return useQuery<DonationVisualsResponse>({
        queryKey: ["project-donations-visuals", year],
        queryFn: async (): Promise<DonationVisualsResponse> => {
            const response = await apiClient.get<DonationVisualsResponse>(`/transactions/project-donations-visuals?year=${year}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: year > 0
    })
}

export const useWithdrawalVisuals = (year: number) => {
    return useQuery<WithdrawalVisualResponse>({
        queryKey: ["withdrawals-visuals", year],
        queryFn: async (): Promise<WithdrawalVisualResponse> => {
            const response = await apiClient.get<WithdrawalVisualResponse>(`/transactions/withdrawals-visuals?year=${year}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: year > 0
    })
}


export const useWithdrawals = () => {
    return useQuery<WithdrawalResponse[]>({
        queryKey: ["transaction-withdrawals"],
        queryFn: async (): Promise<WithdrawalResponse[]> => {
            const response = await apiClient.get<WithdrawalResponse[]>(`/transactions/withdrawals`);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}


export const useProjectDonations = () => {
    return useQuery<DonationsResponse[]>({
        queryKey: ["project-donations"],
        queryFn: async (): Promise<DonationsResponse[]> => {
            const response = await apiClient.get<DonationsResponse[]>(`/transactions/project-donations`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}


export const useEventDonations = () => {
    return useQuery<DonationsResponse[]>({
        queryKey: ["event-donations"],
        queryFn: async (): Promise<DonationsResponse[]> => {
            const response = await apiClient.get<DonationsResponse[]>(`/transactions/event-donations`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}


export const useDuesPayments = () => {
    return useQuery<DuesPaymentResponse[]>({
        queryKey: ["dues-payments"],
        queryFn: async (): Promise<DuesPaymentResponse[]> => {
            const response = await apiClient.get<DuesPaymentResponse[]>(`/transactions/dues-payments`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}


export const useDuesPaymentDetails = (id: string) => {
    return useQuery<DuesPaymentDetail>({
        queryKey: ["dues-payment-detail", id],
        queryFn: async (): Promise<DuesPaymentDetail> => {
            const response = await apiClient.get<DuesPaymentDetail>(`/transactions/dues-payments/${id}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}

export const useEventDonationDetails = (id: string) => {
    return useQuery<EventDonationDetails>({
        queryKey: ["event-donations-detail", id],
        queryFn: async (): Promise<EventDonationDetails> => {
            const response = await apiClient.get<EventDonationDetails>(`/transactions/event-donations/${id}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}

export const useProjectDonationDetails = (id: string) => {
    return useQuery<ProjectDonationDetails>({
        queryKey: ["project-donations-detail", id],
        queryFn: async (): Promise<ProjectDonationDetails> => {
            const response = await apiClient.get<ProjectDonationDetails>(`/transactions/project-donations/${id}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}

export const useWithdrawalDetails = (id: string) => {
    return useQuery<WithdrawalDetailResponse>({
        queryKey: ["transaction-withdrawal-detail", id],
        queryFn: async (): Promise<WithdrawalDetailResponse> => {
            const response = await apiClient.get<WithdrawalDetailResponse>(`/transactions/withdrawals/${id}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}

export const useNationalDuesDetails = (id: string) => {
    return useQuery<NationalDuesDetail>({
        queryKey: ["national-dues-detail", id],
        queryFn: async (): Promise<NationalDuesDetail> => {
            const response = await apiClient.get<NationalDuesDetail>(`dues/${id}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}

export const useNationalDues = () => {
    return useQuery<NationalDuesResponse[]>({
        queryKey: ["national-dues"],
        queryFn: async (): Promise<NationalDuesResponse[]> => {
            const response = await apiClient.get<NationalDuesResponse[]>(`/transactions/national-dues`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}


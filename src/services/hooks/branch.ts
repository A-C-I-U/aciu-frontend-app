import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type { BranchDashboardResponse, BranchOverviewResponse, BranchDashboardMetrics, BranchOverview, BranchDuesResponse, BranchDue, BranchExecutivesResponse, BranchExecutive, BranchPayment, PaymentDetails, BranchWithdrawalResponse, WithdrawalDetailsResponse, BranchMembersResponse, MemberOverview, MemberActivityResponse, MemberPaymentsResponse, SearchMember } from "../types/branch";

export const useBranchDashboard = () => {
    return useQuery<BranchDashboardMetrics>({
        queryKey: ["branch", "dashboard"],
        queryFn: async () => {
            const response = await apiClient.get<BranchDashboardResponse>("/branch/dashboard");
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useBranchOverview = () => {
    return useQuery<BranchOverview>({
        queryKey: ["branch", "overview"],
        queryFn: async () => {
            const response = await apiClient.get<BranchOverviewResponse>("/branch/overview");
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useBranchDues = () => {
    return useQuery<BranchDue[]>({
        queryKey: ["branch", "dues"],
        queryFn: async () => {
            const response = await apiClient.get<BranchDuesResponse>("/dues");
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useBranchExecutives = () => {
    return useQuery<BranchExecutive[]>({
        queryKey: ["branch", "executives"],
        queryFn: async () => {
            const response = await apiClient.get<BranchExecutivesResponse>("/branch/executives");
            return response.data.executives;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useBranchPayments = () => {
    return useQuery<BranchPayment[]>({
        queryKey: ["branch", "payments"],
        queryFn: async () => {
            const response = await apiClient.get<BranchPayment[]>("/branch/payments");
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const usePaymentDetails = (id: string | null) => {
    return useQuery<PaymentDetails>({
        queryKey: ["payment", "details", id],
        queryFn: async () => {
            if (!id) throw new Error("Payment ID is required");
            const response = await apiClient.get<PaymentDetails>(`/payments/${id}`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useBranchWithdrawals = () => {
    return useQuery<BranchWithdrawalResponse>({
        queryKey: ["branch", "withdrawals"],
        queryFn: async () => {
            const response = await apiClient.get<{ data: BranchWithdrawalResponse }>("/withdrawal");
            return response.data.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};
export const useWithdrawalDetails = (id: string | undefined) => {
    return useQuery<WithdrawalDetailsResponse>({
        queryKey: ["withdrawal", "details", id],
        queryFn: async () => {
            if (!id) throw new Error("ID is required");
            const response = await apiClient.get<WithdrawalDetailsResponse>(`/transactions/withdrawals/${id}`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export const useBranchMembers = () => {
    return useQuery<BranchMembersResponse>({
        queryKey: ["branch", "members"],
        queryFn: async () => {
            const response = await apiClient.get<BranchMembersResponse>("/branch/members");
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useMemberOverview = (id: string | undefined) => {
    return useQuery<MemberOverview>({
        queryKey: ["member", "overview", id],
        queryFn: async () => {
            if (!id) throw new Error("Member ID is required");
            const response = await apiClient.get<MemberOverview>(`/branch/members/${id}/overview/`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export const useMemberActivity = (id: string | undefined) => {
    return useQuery<MemberActivityResponse>({
        queryKey: ["member", "activity", id],
        queryFn: async () => {
            if (!id) throw new Error("Member ID is required");
            const response = await apiClient.get<MemberActivityResponse>(`/branch/members/${id}/activity`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export const useMemberPayments = (id: string | undefined) => {
    return useQuery<MemberPaymentsResponse>({
        queryKey: ["member", "payments", id],
        queryFn: async () => {
            if (!id) throw new Error("Member ID is required");
            const response = await apiClient.get<MemberPaymentsResponse>(`/branch/members/${id}/payments`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export const useSearchMembers = (query: string) => {
    return useQuery<SearchMember[]>({
        queryKey: ["branch", "members", "search", query],
        queryFn: async () => {
            const response = await apiClient.post<SearchMember[]>(`/branch/members/search?q=${query}`);
            return response.data;
        },
        enabled: query.length > 2,
        staleTime: 0,
    });
};

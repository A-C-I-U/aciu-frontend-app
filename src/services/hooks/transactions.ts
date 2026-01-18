import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type { DuesPaymentVisualsResponse, TransactionOverview } from "../types/transactions";

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
            const response = await apiClient.get<DuesPaymentVisualsResponse>(`/dues-payments-visuals?year=${year}`);
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!year
    })
}
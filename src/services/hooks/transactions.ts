import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type { TransactionOverview } from "../types/transactions";

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
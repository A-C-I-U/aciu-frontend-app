import { useQuery } from "@tanstack/react-query"
import type { NationalDuesDetail } from "../types/transactions"
import apiClient from ".."
import type { ActivityLogResponse, DuesRulesResponse } from "../types/dues"

export const useDuesDetails = (id: string) => {
    return useQuery<NationalDuesDetail>({
        queryKey: ["dues-detail", id],
        queryFn: async (): Promise<NationalDuesDetail> => {
            const response = await apiClient.get<NationalDuesDetail>(`dues/${id}`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}

export const useDuesRules = (id: string) => {
    return useQuery<DuesRulesResponse>({
        queryKey: ["dues-detail", id],
        queryFn: async (): Promise<DuesRulesResponse> => {
            const response = await apiClient.get<DuesRulesResponse>(`dues/${id}/rules`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}


export const useDuesActivityLog = (id: string) => {
    return useQuery<ActivityLogResponse>({
        queryKey: ["dues-activity-log", id],
        queryFn: async (): Promise<ActivityLogResponse> => {
            const response = await apiClient.get<ActivityLogResponse>(`dues/${id}/activity-logs`)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!id
    })
}
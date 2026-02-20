import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type { GetMemberDashboardResponse, GetMemberDues, GetMemberProfileResponse } from "../types/members";

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

const fetchMemberBranchDashboard = async (): Promise<GetMemberDashboardResponse> => {
    const response = await apiClient.get<GetMemberDashboardResponse>(`/member-dashboard/branch-dashboard`)
    return response.data;
}

export const useMemberBranchDashboard = () => {
    return useQuery({
        queryKey: ["member-branch-dashboard"],
        queryFn: () => fetchMemberBranchDashboard(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

const fetchMemberDues = async (): Promise<GetMemberDues[]> => {
    const response = await apiClient.get<GetMemberDues[]>(`/dues/member`)
    return response.data;
}

export const useMemberDues = () => {
    return useQuery({
        queryKey: ["member-dues"],
        queryFn: () => fetchMemberDues(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

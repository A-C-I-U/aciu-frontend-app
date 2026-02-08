import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type { GetMemberDuesSummary, GetMemberImpactSummary, GetMemberProfileResponse, MemberContributionsSummary } from "../types/members";

const fetchProfileOverview = async (): Promise<GetMemberProfileResponse> => {
    const response = await apiClient.get<GetMemberProfileResponse>(`/member-dashboard/overview`)
    return response.data
}

export const useProfileOverview = () => {
    return useQuery({
        queryKey: ["profile-overview"],
        queryFn: () => fetchProfileOverview(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

const fetchMemberContributionsSummary = async (): Promise<MemberContributionsSummary> => {
    const response = await apiClient.get<MemberContributionsSummary>(`/member-dashboard/finances`)
    return response.data
}

export const useMemberContributionsSummary = () => {
    return useQuery({
        queryKey: ["member-contributions-summary"],
        queryFn: () => fetchMemberContributionsSummary(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

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

const fetchDuesDashboard = async () : Promise<GetMemberDuesSummary> => {
    const response = await apiClient.get<GetMemberDuesSummary>(`/member-dashboard/dues-dashboard`)
    return response.data
}

export const useMemberDuesDashboard = () => {
    return useQuery({
        queryKey: ["member-dues-dashboard"],
        queryFn: () => fetchDuesDashboard(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

const fetchMemberDashboardBranch = async () : Promise<GetMemberDuesSummary> => {
    const response = await apiClient.get<GetMemberDuesSummary>(`/member-dashboard/dues-dashboard`)
    return response.data
}

export const useMemberDashboardBranch = () => {
    return useQuery({
        queryKey: ["member-dashboard-branch"],
        queryFn: () => fetchMemberDashboardBranch(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

const fetchMemberDonationsOverview = async () : Promise<GetMemberImpactSummary> => {
    const response = await apiClient.get<GetMemberImpactSummary>(`/member-dashboard/donations-dashboard`)
    return response.data
}

export const useMemberDonationsOverview = () => {
    return useQuery({
        queryKey: ["member-donations-overview"],
        queryFn: () => fetchMemberDonationsOverview(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}
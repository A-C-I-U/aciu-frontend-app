import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type {
    VerifyMemberResponse,
    AssignExecutivePayload,
    AssignExecutiveResponse,
    CreateBranchDuesPayload,
    CreateBranchDuesResponse
} from "../types/branch";
import { enqueueSnackbar } from "notistack";

const verifyMember = async (userId: string): Promise<VerifyMemberResponse> => {
    const response = await apiClient.post<VerifyMemberResponse>(`/verify/${userId}/`);
    return response.data;
};

const rejectMember = async ({ userId, reason }: { userId: string, reason: string }): Promise<VerifyMemberResponse> => {
    const response = await apiClient.post<VerifyMemberResponse>(`/verify/${userId}/reject`, { reason });
    return response.data;
};

export const useVerifyMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyMember,
        onSuccess: (data) => {
            enqueueSnackbar(data.message, { variant: "success" });
            queryClient.invalidateQueries({ queryKey: ["branch", "members"] });
            queryClient.invalidateQueries({ queryKey: ["member", "overview"] });
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to verify member";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    });
};

export const useRejectMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectMember,
        onSuccess: (data) => {
            enqueueSnackbar(data.message, { variant: "success" });
            queryClient.invalidateQueries({ queryKey: ["branch", "members"] });
            queryClient.invalidateQueries({ queryKey: ["member", "overview"] });
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to reject member";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    });
};

export const useAssignExecutive = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: AssignExecutivePayload) => {
            const response = await apiClient.post<AssignExecutiveResponse>("/branch/assign", payload);
            return response.data;
        },
        onSuccess: (data) => {
            enqueueSnackbar(data.message, { variant: "success" });
            queryClient.invalidateQueries({ queryKey: ["branch", "executives"] });
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.error ||
                error.response?.data?.message ||
                "Failed to assign executive";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    });
};

export const useCreateBranchDues = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateBranchDuesPayload) => {
            const response = await apiClient.post<CreateBranchDuesResponse>("/dues", payload);
            return response.data;
        },
        onSuccess: (data) => {
            enqueueSnackbar(data.message, { variant: "success" });
            queryClient.invalidateQueries({ queryKey: ["branch", "dues"] });
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to create dues";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    });
};

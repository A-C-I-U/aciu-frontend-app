import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type { SubmitWithdrawalRequest, SubmitWithdrawalResponse } from "../types/branch";
import { enqueueSnackbar } from "notistack";

const submitWithdrawalRequest = async (payload: SubmitWithdrawalRequest): Promise<SubmitWithdrawalResponse> => {
    const formData = new FormData();

    formData.append("withdrawalSource", payload.withdrawalSource.toUpperCase());
    formData.append("amount", payload.amount.toString());
    formData.append("bankName", payload.bankName);
    formData.append("accountName", payload.accountName);
    formData.append("accountNumber", payload.accountNumber);
    formData.append("requestReason", payload.requestReason);
    formData.append("customReason", payload.customReason);

    if (payload.document) {
        formData.append("document", payload.document);
    }

    const response = await apiClient.post<SubmitWithdrawalResponse>("/withdrawal", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const useSubmitWithdrawalRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitWithdrawalRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branch", "withdrawals"] });
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Failed to submit withdrawal request";
            enqueueSnackbar(errorMessage, { variant: "error" });
        }
    });
};

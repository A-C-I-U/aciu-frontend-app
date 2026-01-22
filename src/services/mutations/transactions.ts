import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type { updateWithdrawalRequestPayload } from "../types/transactions";

const updateWithdrawalRequestStatus = ({
    id,
    payload,
}: {
    id: string;
    payload: updateWithdrawalRequestPayload;
}) => {
    return apiClient.patch(`/withdrawal/${id}`, payload);
}

export const useUpdateWithdrawalRequestStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateWithdrawalRequestStatus,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["withdrawals-visual"]});
            queryClient.invalidateQueries({ queryKey: ["transaction-withdrawals"]});
            queryClient.invalidateQueries({ queryKey: ["transaction-withdrawal-detail", id]})
        }
    })
}
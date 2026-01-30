import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type { CreateNationalDuesPayload } from "../types/nationaldues";


const saveNationalDues = async ({
    payload,
    id,
}: {
    payload: CreateNationalDuesPayload;
    id?: string;
}): Promise<{ message: string }> => {


    const url = id ? `/dues/${id}?isNational=true` : "/dues?isNational=true";
    const method = id ? "patch" : "post";

    const response = await apiClient.request<{ message: string }>({
        url,
        method,
        data: JSON.stringify(payload),
            headers: id ? undefined : { "Content-Type": "application/json" },
    });

    return response.data;
};


export const useSaveNationalDues = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveNationalDues,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["national-dues"]});
            queryClient.invalidateQueries({ queryKey: ["dues-detail", id]})
        }
    })
}


const deactivateDues = ({ id }: { id: string }) => {
    return apiClient.patch(`/dues/${id}/deactivate`)
}

export const useDeactivateDues = () => {
     const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deactivateDues,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["national-dues"]});
            queryClient.invalidateQueries({ queryKey: ["dues-detail", id]})
        }
    })
}
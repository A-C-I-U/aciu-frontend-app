import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type { CreateNationalDuesPayload } from "../types/national-dues";


const saveNationalDues = async ({
    payload,
    id,
}: {
    payload: CreateNationalDuesPayload;
    id?: string;
}): Promise<{ message: string }> => {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("currency", payload.currency);
    formData.append("amount", payload.amount);
    formData.append("startDate", payload.startDate);
    formData.append("endDate", payload.endDate);
    formData.append("interval", payload.interval);
    formData.append("gender", payload.gender);
    formData.append("location", payload.location);

    payload.ageGrades.forEach((grade) => formData.append("ageGrades[]", grade));
    payload.memberRoles.forEach((role) => formData.append("memberRoles[]", role));
    payload.notifications.forEach((note) => formData.append("notifications[]", note));

    const url = id ? `/dues/${id}` : "/dues";
    const method = id ? "put" : "post";

    const response = await apiClient.request<{ message: string }>({
    url,
    method,
    data: formData,
        headers: id ? undefined : { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};


export const useSaveNationalDues = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveNationalDues,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['national-dues']})
        }
    })
}
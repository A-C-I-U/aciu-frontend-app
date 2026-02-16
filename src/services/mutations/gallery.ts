import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type { DeleteGalleryResponse, UploadGalleryResponse } from "../types/gallery";

const uploadGallery = async (files: File[]): Promise<UploadGalleryResponse> => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });

    const response = await apiClient.post<UploadGalleryResponse>("/gallery", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

const deleteGallery = async (id: string): Promise<DeleteGalleryResponse> => {
    const response = await apiClient.delete<DeleteGalleryResponse>(`/gallery/${id}`);
    return response.data;
};

export const useUploadGallery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadGallery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
        },
    });
};

export const useDeleteGallery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteGallery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
        },
    });
};

import { useQuery } from "@tanstack/react-query";
import apiClient from "..";
import type { GalleryItem, GalleryResponse, SingleGalleryResponse } from "../types/gallery";

export const useGallery = (category?: string) => {
    return useQuery<GalleryItem[]>({
        queryKey: ["gallery", category],
        queryFn: async () => {
            const response = await apiClient.get<GalleryResponse>("/gallery", {
                params: { category }
            });
            return response.data.gallery;
        },
        staleTime: 5 * 60 * 1000,
    });
};

export const useGalleryItem = (id: string | null) => {
    return useQuery<GalleryItem>({
        queryKey: ["gallery", "item", id],
        queryFn: async () => {
            if (!id) throw new Error("Image ID is required");
            const response = await apiClient.get<SingleGalleryResponse>(`/gallery/${id}`);
            return response.data.galleryItem;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

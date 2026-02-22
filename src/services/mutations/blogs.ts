import apiClient from "..";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBlogPostResponse } from "../types/blogs";

export const createComment = async ({ postId, content }: { postId: string, content: string }): Promise<any> => {
    const response = await apiClient.post(`/comments/${postId}`, { content });
    return response.data;
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createComment,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
            queryClient.invalidateQueries({ queryKey: ["blog-post", variables.postId] });
        },
    });
};

export const deletePublication = async (postId: string): Promise<any> => {
    const response = await apiClient.delete(`/blogposts/${postId}`);
    return response.data;
};

export const useDeletePublication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePublication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-publications"] });
            queryClient.invalidateQueries({ queryKey: ["blog-submissions"] });
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
        },
    });
};

export const updateSubmissionStatus = async ({ postId, status, reason }: { postId: string, status: string, reason?: string }): Promise<any> => {
    const response = await apiClient.patch(`/blogposts/submissions/${postId}`, { status, reason });
    return response.data;
};

export const useUpdateSubmissionStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSubmissionStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-submissions"] });
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
        },
    });
};

export const createBlogPost = async (payload: FormData): Promise<CreateBlogPostResponse> => {
    const response = await apiClient.post<CreateBlogPostResponse>("/blogposts", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useCreateBlogPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBlogPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-submissions"] });
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
            queryClient.invalidateQueries({ queryKey: ["my-publications"] });
        },
    });
};

export const uploadEditorImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await apiClient.post<{ url: string }>("/blogposts/upload-editor-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useUploadEditorImage = () => {
    return useMutation({
        mutationFn: uploadEditorImage,
    });
};

export const saveBlogPostDraft = async (payload: FormData): Promise<any> => {
    const response = await apiClient.post("/blogposts/draft", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useSaveBlogPostDraft = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: saveBlogPostDraft,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-submissions"] });
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
            queryClient.invalidateQueries({ queryKey: ["my-publications"] });
        },
    });
};

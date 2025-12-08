import apiClient from "..";
import type { BlogPostsResponse } from "../types/blogs";
import { useQuery } from "@tanstack/react-query";


export const fetchFeaturedBlogPosts = async (): Promise<BlogPostsResponse> => {
  const response = await apiClient.get<BlogPostsResponse>(
    "/blogposts/?featured=true"
  );
  return response.data;
};

export const fetchAllBlogPosts = async (): Promise<BlogPostsResponse> => {
  const response = await apiClient.get<BlogPostsResponse>("/blogposts");
  return response.data;
};

export const useFeaturedBlogPosts = () => {
  return useQuery<BlogPostsResponse, Error>({
    queryKey: ["blog-posts", "featured"],
    queryFn: fetchFeaturedBlogPosts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllBlogPosts = () => {
  return useQuery<BlogPostsResponse, Error>({
    queryKey: ["blog-posts", "all"],
    queryFn: fetchAllBlogPosts,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
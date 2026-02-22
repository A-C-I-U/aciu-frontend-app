import apiClient from "..";
import type {
  BlogPostsResponse,
  BlogPostStatsResponse,
  PublicationsResponse,
  BlogPostDetailResponse,
  RelatedPostsResponse,
  CommentsResponse,
  SubmissionsResponse,
} from "../types/blogs";
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

export const fetchBlogPostDetails = async (postId: string): Promise<BlogPostDetailResponse> => {
  const response = await apiClient.get<BlogPostDetailResponse>(`/blogposts/${postId}`);
  return response.data;
};

export const fetchRelatedBlogPosts = async (postId: string): Promise<RelatedPostsResponse> => {
  const response = await apiClient.get<RelatedPostsResponse>(`/blogposts/${postId}/related`);
  return response.data;
};

export const fetchPostComments = async (postId: string): Promise<CommentsResponse> => {
  const response = await apiClient.get<CommentsResponse>(`/comments/${postId}`);
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

export const useBlogPostDetails = (postId: string) => {
  return useQuery<BlogPostDetailResponse, Error>({
    queryKey: ["blog-post", postId],
    queryFn: () => fetchBlogPostDetails(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRelatedBlogPosts = (postId: string) => {
  return useQuery<RelatedPostsResponse, Error>({
    queryKey: ["blog-posts", "related", postId],
    queryFn: () => fetchRelatedBlogPosts(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostComments = (postId: string) => {
  return useQuery<CommentsResponse, Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchPostComments(postId),
    enabled: !!postId,
    staleTime: 1 * 60 * 1000,
  });
};

export const getBlogPostStats = async (): Promise<BlogPostStatsResponse> => {
  const response = await apiClient.get<BlogPostStatsResponse>(
    "/member-dashboard/posts-dashboard"
  );
  return response.data;
};

export const useBlogPostStats = () => {
  return useQuery({
    queryKey: ["blog-post-stats"],
    queryFn: getBlogPostStats,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};


export const getMyPublications = async (): Promise<PublicationsResponse> => {
  const response = await apiClient.get<PublicationsResponse>(
    "/blogposts/publications"
  );
  return response.data;
};

export const useMyPublications = () => {
  return useQuery({
    queryKey: ["my-publications"],
    queryFn: getMyPublications,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const fetchSubmissions = async (): Promise<SubmissionsResponse> => {
  const response = await apiClient.get<SubmissionsResponse>("/blogposts/submissions");
  return response.data;
};

export const useSubmissions = () => {
  return useQuery({
    queryKey: ["blog-submissions"],
    queryFn: fetchSubmissions,
    staleTime: 1 * 60 * 1000,
  });
};
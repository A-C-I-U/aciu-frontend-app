export interface BlogPostAuthor {
  id: string;
  fullName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  views: number;
  commentsCount: number;
  tags: string[];
  displayImage: string;
  displayImageAlt: string;
  author: BlogPostAuthor;
}

export interface BlogPostsResponse {
  message: string;
  posts: BlogPost[];
}

export interface BlogPostStats {
  totalSubmissions: number;
  publishedPosts: number;
  pendingApprovals: number;
}

export interface BlogPostStatsResponse {
  message: string;
  stats: BlogPostStats;
}

export interface Publication {
  id: string;
  title: string;
  createdAt: string;
  views: number;
  commentsCount: number;
  updatedAt: string;
  status: "Published" | "Draft" | "Pending" | "Rejected";
}

export interface PublicationsResponse {
  message: string;
  posts: Publication[];
}
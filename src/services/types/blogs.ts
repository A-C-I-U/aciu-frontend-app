export const BlogPostVisibility = {
  PUBLIC: "Public",
  AGE_GRADE: "Age Grade",
  Village: "Village",
} as const;

export type BlogPostVisibility = (typeof BlogPostVisibility)[keyof typeof BlogPostVisibility];

export interface BlogPostAuthor {
  id: string;
  fullName: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    profilePhoto: string | null;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  contentHtml?: string;
  contentJson?: any;
  status?: string;
  visibility?: string;
  featured?: boolean;
  authorId?: string;
  createdAt: string;
  updatedAt?: string;
  views: number;
  commentsCount: number;
  tags: string[];
  displayImage: string | null;
  displayImageAlt: string;
  author: BlogPostAuthor;
}

export interface BlogPostsResponse {
  message: string;
  posts: BlogPost[];
}

export interface BlogPostDetailResponse {
  message: string;
  post: BlogPost;
}

export interface CommentsResponse {
  message: string;
  comments: Comment[];
}

export interface RelatedPostsResponse {
  message: string;
  relatedPosts: BlogPost[];
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
  status: string;
}

export interface PublicationsResponse {
  message: string;
  posts: Publication[];
}

export interface Submission {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  authorName: string;
  branch: string;
}

export interface SubmissionsResponse {
  message: string;
  posts: Submission[];
}

export interface CreateBlogPostPayload {
  title: string;
  description: string;
  contentHtml: string;
  contentJson: any;
  tags: string[];
  displayImage?: File;
  displayImageAlt: string;
  status?: string;
  visibility: string;
  featured?: boolean;
}

export interface CreateBlogPostResponse {
  message: string;
  post: {
    id: string;
    title: string;
    description: string;
    contentHtml: string;
    contentJson: any;
    tags: string[];
    displayImage: string | null;
    displayImageAlt: string;
    status: string;
    visibility: string;
    featured: boolean;
    views: number;
    commentsCount: number;
    authorId: string;
    createdAt: string;
    updatedAt: string;
  };
}
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
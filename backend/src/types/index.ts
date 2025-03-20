export interface User {
  id: string;
  name: string;
  postCount?: number;
}

export interface Post {
  id: number;
  userId: number;
  content: string;
  timestamp?: number;
  commentCount?: number;
}

export interface ApiResponse<T> {
  data: T;
  timestamp: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}
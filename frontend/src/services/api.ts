import axios from 'axios';
import { ApiResponse, User, Post } from '../types';

const API_BASE_URL = 'http://localhost:3001'; // Backend runs on port 3001

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getTopUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
};

export const getTrendingPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<ApiResponse<Post[]>>('/posts?type=popular');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
};

export const getLatestPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<ApiResponse<Post[]>>('/posts?type=latest');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
};
import axios, { AxiosInstance } from 'axios';
import { User, Post } from '../types';
import { config } from '../config';

export class AnalyticsService {
  private users: Map<string, User> = new Map();
  private posts: Map<number, Post> = new Map();
  private lastUpdateTimestamp: number = 0;
  private httpClient: AxiosInstance;

  constructor() {
    console.log('Using access token:', config.accessToken); // Log the token being used
    this.httpClient = axios.create({
      baseURL: config.testServerUrl,
      timeout: config.requestTimeoutMs,
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
      },
    });
  }

  private needsRefresh(): boolean {
    return Date.now() - this.lastUpdateTimestamp > config.refreshIntervalMs;
  }

  public async shouldRefresh(): Promise<boolean> {
    return this.needsRefresh();
  }

  public async refreshData(): Promise<void> {
    try {
      console.log('Fetching users from test server...');
      const usersResponse = await this.httpClient.get('/users');
      const usersData = usersResponse.data.users;

      for (const [id, name] of Object.entries(usersData)) {
        this.users.set(id, { id, name: name as string });
      }

      await Promise.all(
        Array.from(this.users.values()).map(async (user) => {
          console.log(`Fetching posts for user ${user.id}...`);
          const postsResponse = await this.httpClient.get(`/users/${user.id}/posts`);
          const userPosts: Post[] = postsResponse.data.posts;

          user.postCount = userPosts.length;

          await Promise.all(
            userPosts.map(async (post) => {
              console.log(`Fetching comments for post ${post.id}...`);
              const commentsResponse = await this.httpClient.get(`/posts/${post.id}/comments`);
              const timestamp = Date.now();

              this.posts.set(post.id, {
                ...post,
                userId: Number(user.id),
                commentCount: commentsResponse.data.comments.length,
                timestamp,
              });
            })
          );
        })
      );

      this.lastUpdateTimestamp = Date.now();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
        throw new Error(
          `Data refresh failed: Request failed with status code ${error.response?.status} - ${error.response?.statusText}`
        );
      }
      throw new Error(`Data refresh failed: ${(error as Error).message}`);
    }
  }

  public getTopUsers(): User[] {
    return Array.from(this.users.values())
      .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
      .slice(0, 5);
  }

  public getPosts(type: 'popular' | 'latest'): Post[] {
    const postsArray = Array.from(this.posts.values());

    if (type === 'popular') {
      const maxComments = Math.max(...postsArray.map(p => p.commentCount || 0));
      return postsArray.filter(p => p.commentCount === maxComments);
    }

    return postsArray
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
      .slice(0, 5);
  }
}
import axios, { AxiosInstance } from 'axios';
import { User, Post } from '../types';
import { config } from '../config';

export class AnalyticsService {
  private users: Map<string, User> = new Map();
  private posts: Map<number, Post> = new Map();
  private lastUpdateTimestamp: number = 0;
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: config.testServerUrl,
      timeout: config.requestTimeoutMs,
    });
  }

  /**
   * Checks if data needs to be refreshed based on the configured interval
   * @returns {boolean} Whether a refresh is needed
   */
  private needsRefresh(): boolean {
    return Date.now() - this.lastUpdateTimestamp > config.refreshIntervalMs;
  }

  /**
   * Public method to determine if data should be refreshed
   * @returns {Promise<boolean>} Whether a refresh is needed
   */
  public async shouldRefresh(): Promise<boolean> {
    return this.needsRefresh();
  }

  /**
   * Fetches and updates analytics data from the test server
   * @throws {Error} If data refresh fails
   */
  public async refreshData(): Promise<void> {
    try {
      const usersResponse = await this.httpClient.get('/users');
      const usersData = usersResponse.data.users;

      for (const [id, name] of Object.entries(usersData)) {
        this.users.set(id, { id, name: name as string });
      }

      await Promise.all(
        Array.from(this.users.values()).map(async (user) => {
          const postsResponse = await this.httpClient.get(`/users/${user.id}/posts`);
          const userPosts: Post[] = postsResponse.data.posts;

          user.postCount = userPosts.length;

          await Promise.all(
            userPosts.map(async (post) => {
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
      throw new Error(`Data refresh failed: ${(error as Error).message}`);
    }
  }

  /**
   * Gets the top 5 users by post count
   * @returns {User[]} Array of top users
   */
  public getTopUsers(): User[] {
    return Array.from(this.users.values())
      .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
      .slice(0, 5);
  }

  /**
   * Gets posts based on the specified type
   * @param type - 'popular' or 'latest'
   * @returns {Post[]} Array of posts
   */
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
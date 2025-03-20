import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { ApiResponse, ErrorResponse, Post, User } from '../types';

export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  public getTopUsers = async (req: Request, res: Response): Promise<void> => {
    const users = this.analyticsService.getTopUsers();
    const response: ApiResponse<User[]> = {
      data: users,
      timestamp: Date.now(),
    };
    res.json(response);
  };

  public getPosts = async (req: Request, res: Response): Promise<void> => {
    const type = req.query.type as string;
    if (!['popular', 'latest'].includes(type)) {
      const errorResponse: ErrorResponse = {
        error: 'Bad Request',
        message: 'Type must be "popular" or "latest"',
      };
      res.status(400).json(errorResponse);
      return;
    }

    const posts = this.analyticsService.getPosts(type as 'popular' | 'latest');
    const response: ApiResponse<Post[]> = {
      data: posts,
      timestamp: Date.now(),
    };
    res.json(response);
  };
}
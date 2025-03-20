import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service';

export function ensureFreshData(analyticsService: AnalyticsService) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (await analyticsService.shouldRefresh()) {
        await analyticsService.refreshData();
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
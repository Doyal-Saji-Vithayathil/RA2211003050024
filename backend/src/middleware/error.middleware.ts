import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(`[${new Date().toISOString()}] Error: ${error.stack}`);
  const errorResponse: ErrorResponse = {
    error: 'Internal Server Error',
    message: error.message,
  };
  res.status(500).json(errorResponse);
}
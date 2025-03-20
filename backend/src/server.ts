import express from 'express';
import { config } from './config';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsController } from './controllers/analytics.controller';
import { errorHandler } from './middleware/error.middleware';
import { ensureFreshData } from './middleware/data.middleware';

const app = express();
const analyticsService = new AnalyticsService();
const analyticsController = new AnalyticsController(analyticsService);

app.use(express.json());

// Routes
app.get('/users', ensureFreshData(analyticsService), analyticsController.getTopUsers);
app.get('/posts', ensureFreshData(analyticsService), analyticsController.getPosts);

// Error handling
app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await analyticsService.refreshData();
    console.log('Initial data refresh successful');
  } catch (error) {
    console.error('Initial data refresh failed:', (error as Error).message);
    // Continue starting the server; the middleware will handle subsequent refreshes
  }

  app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });
}

startServer();
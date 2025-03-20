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
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();
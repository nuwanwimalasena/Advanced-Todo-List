import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { todoItemRoute } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { connectDB } from './config';
import { handleRecurringTasks } from './services/todoItem';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

// Routes
app.use('/api/todo-items', todoItemRoute);

// Global error handler
app.use(errorHandler);

// Connect to MongoDB
connectDB();
// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running cron job to handle recurring tasks...');
  try {
    handleRecurringTasks();
  } catch (error: any) {
    console.error(error.message);
  }
});
export default app;

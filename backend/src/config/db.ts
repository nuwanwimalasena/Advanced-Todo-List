import mongoose from 'mongoose';
import envConfig from './env';

const connectDb = async () => {
  try {
    await mongoose.connect(envConfig.mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDb;

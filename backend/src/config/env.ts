import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;
}

const envConfig: EnvConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri:
    process.env.MONGO_URI || 'mongodb://root:1234@abcd@mongodb:27017/advanced-todo-app',
};

export default envConfig;

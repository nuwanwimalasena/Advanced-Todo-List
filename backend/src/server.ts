import app from './app';
import { envConfig } from './config';

app.listen(envConfig.port, () => {
  console.log(`Server running on port ${envConfig.port}`);
});

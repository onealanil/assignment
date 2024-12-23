// next.config.js

import { env } from './src/env'; // Ensure you are importing the validated environment variables

export default {
  env: {
    DATABASE_URL: env.DATABASE_URL,  // Pass DATABASE_URL to your app
  },
};

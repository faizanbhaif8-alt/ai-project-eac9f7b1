Here's the complete config.js file:

```javascript
/**
 * Application Configuration File
 * Contains environment-specific settings and constants
 */

const config = {
  // Base API configuration
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://api.example.com/v1',
    timeout: parseInt(process.env.API_TIMEOUT) || 10000,
    retries: parseInt(process.env.API_RETRIES) || 3
  },

  // Authentication settings
  auth: {
    tokenKey: process.env.AUTH_TOKEN_KEY || 'authToken',
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'refreshToken',
    tokenExpiry: parseInt(process.env.TOKEN_EXPIRY) || 3600 // 1 hour in seconds
  },

  // Feature flags
  features: {
    analytics: process.env.FEATURE_ANALYTICS === 'true' || false,
    caching: process.env.FEATURE_CACHING === 'true' || true
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    filePath: process.env.LOG_FILE_PATH || './logs/app.log'
  },

  // Environment settings
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test'
};

// Validate required production environment variables
if (config.isProduction) {
  const requiredEnvVars = ['API_BASE_URL', 'AUTH_TOKEN_KEY'];
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
}

module.exports = config;
```
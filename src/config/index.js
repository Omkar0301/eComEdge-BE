const path = require('path');
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`)
});

const env = process.env.NODE_ENV || 'development';

const development = {
  port: process.env.PORT || 8080,
  db: {
    url: process.env.DB_URL || 'mongodb://mongo:27017/eComEdge'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || 30
  },
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX || 100
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: process.env.CORS_CREDENTIALS === 'true'
  },
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    sender: process.env.SUPPORT_SENDER_EMAIL,
    receiver: process.env.SUPPORT_RECEIVER_EMAIL
  }
};

const config = {
  development,
  production: { ...development }, // In production, use env variables only
  test: {
    ...development,
    db: {
      url: process.env.DB_URL || 'mongodb://localhost:27017/boilerplate-test'
    }
  }
};

module.exports = config[env];

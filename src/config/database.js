const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url);
    logger.info('Database connection established...');

    return mongoose.connection;
  } catch (err) {
    logger.error('Database connection failed:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

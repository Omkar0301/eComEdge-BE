const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.db.url;

db.User = require('./user.model');

module.exports = db;

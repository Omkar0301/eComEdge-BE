const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.db.url;

db.User = require('./user.model');
db.Feature = require('./feature.model');
db.Team = require('./team.model');

module.exports = db;

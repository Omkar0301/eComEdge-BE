const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.db.url;

db.User = require('./user.model');
db.Feature = require('./feature.model');
db.Team = require('./team.model');
db.Portfolio = require('./portfolio.model');
db.Testimonial = require('./testimonial.model');
db.Pricing = require('./pricing.model');

module.exports = db;

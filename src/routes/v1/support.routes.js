const express = require('express');
const supportController = require('../../controllers/v1/support.controller');
const router = express.Router();

router.route('/').post(supportController.sendSupport);

module.exports = router;

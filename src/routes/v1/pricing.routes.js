const express = require('express');
const router = express.Router();
const pricingController = require('../../controllers/v1/pricing.controller');
const validate = require('../../middlewares/validation');
const { pricingValidation } = require('../../validations/pricing.validation');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(pricingController.getAllPricing)
  .post(auth('admin'), validate(pricingValidation.createPricing), pricingController.createPricing);

router
  .route('/:id')
  .get(validate(pricingValidation.getPricing), pricingController.getPricing)
  .patch(auth('admin'), validate(pricingValidation.updatePricing), pricingController.updatePricing)
  .delete(
    auth('admin'),
    validate(pricingValidation.deletePricing),
    pricingController.deletePricing
  );

module.exports = router;

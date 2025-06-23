const express = require('express');
const router = express.Router();
const featureController = require('../../controllers/v1/feature.controller');
const validate = require('../../middlewares/validation');
const auth = require('../../middlewares/auth');
const featureValidation = require('../../validations/feature.validation');
const { uploadSingleImage } = require('../../middlewares/multer');

router.get('/', validate(featureValidation.listFeatures), featureController.getAllFeatures);

router.post(
  '/',
  auth('admin'),
  uploadSingleImage('feature'),
  validate(featureValidation.createFeature),
  featureController.createFeature
);

router
  .route('/:id')
  .get(validate(featureValidation.getFeature), featureController.getFeature)
  .patch(
    auth('admin'),
    uploadSingleImage('feature'),
    validate(featureValidation.updateFeature),
    featureController.updateFeature
  )
  .delete(
    auth('admin'),
    validate(featureValidation.deleteFeature),
    featureController.deleteFeature
  );

module.exports = router;

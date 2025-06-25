const express = require('express');
const router = express.Router();
const testimonialController = require('../../controllers/v1/testimonial.controller');
const validate = require('../../middlewares/validation');
const { testimonialValidation } = require('../../validations/testimonial.validation');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(testimonialController.getAllTestimonials)
  .post(
    auth('admin'),
    validate(testimonialValidation.createTestimonial),
    testimonialController.createTestimonial
  );

router
  .route('/:id')
  .get(validate(testimonialValidation.getTestimonial), testimonialController.getTestimonial)
  .patch(
    auth('admin'),
    validate(testimonialValidation.updateTestimonial),
    testimonialController.updateTestimonial
  )
  .delete(
    auth('admin'),
    validate(testimonialValidation.deleteTestimonial),
    testimonialController.deleteTestimonial
  );

module.exports = router;

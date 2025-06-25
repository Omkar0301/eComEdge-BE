const Joi = require('joi');

const createTestimonial = Joi.object({
  body: Joi.object({
    clientName: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    company: Joi.string().required().trim()
  })
});

const updateTestimonial = Joi.object({
  body: Joi.object({
    clientName: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    company: Joi.string().trim().optional()
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const getTestimonial = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const deleteTestimonial = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

module.exports = {
  testimonialValidation: {
    createTestimonial,
    updateTestimonial,
    getTestimonial,
    deleteTestimonial
  }
};

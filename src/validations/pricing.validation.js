const Joi = require('joi');

const createPricing = Joi.object({
  body: Joi.object({
    name: Joi.string().required().trim(),
    price: Joi.number().required(),
    description: Joi.string().required().trim(),
    features: Joi.array().items(Joi.string().trim()).required()
  })
});

const updatePricing = Joi.object({
  body: Joi.object({
    name: Joi.string().optional().trim(),
    price: Joi.number().optional(),
    description: Joi.string().optional().trim(),
    features: Joi.array().items(Joi.string().trim()).optional()
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const getPricing = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const deletePricing = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

module.exports = {
  pricingValidation: {
    createPricing,
    updatePricing,
    getPricing,
    deletePricing
  }
};

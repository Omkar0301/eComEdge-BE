const Joi = require('joi');

const createPortfolio = Joi.object({
  body: Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    link: Joi.string().uri().required().trim()
  })
});

const updatePortfolio = Joi.object({
  body: Joi.object({
    title: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    link: Joi.string().uri().optional()
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const getPortfolio = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const deletePortfolio = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

module.exports = {
  portfolioValidation: {
    createPortfolio,
    updatePortfolio,
    getPortfolio,
    deletePortfolio
  }
};

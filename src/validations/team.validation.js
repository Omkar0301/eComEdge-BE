const Joi = require('joi');

const socialLinkSchema = Joi.object({
  platform: Joi.string().required().trim(),
  url: Joi.string().uri().required().trim()
});

const createTeam = Joi.object({
  body: Joi.object({
    name: Joi.string().required().trim(),
    role: Joi.string().required().trim(),
    socialLinks: Joi.array().items(socialLinkSchema).optional()
  })
});

const updateTeam = Joi.object({
  body: Joi.object({
    name: Joi.string().trim().optional(),
    role: Joi.string().trim().optional(),
    socialLinks: Joi.array().items(socialLinkSchema).optional()
  }),
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const getTeam = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

const deleteTeam = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});

module.exports = {
  teamValidation: {
    createTeam,
    updateTeam,
    getTeam,
    deleteTeam
  }
};

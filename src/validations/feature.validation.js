const Joi = require('joi');

const featureIdParam = Joi.object().keys({
  id: Joi.string().required().length(24).hex().label('Feature ID')
});

const createFeature = {
  body: Joi.object().keys({
    name: Joi.string().required().label('Name'),
    description: Joi.string().allow('', null)
  })
};

const getFeature = {
  params: featureIdParam
};

const updateFeature = {
  params: featureIdParam,
  body: Joi.object().keys({
    name: Joi.string().label('Name'),
    description: Joi.string().allow('', null)
  })
};

const deleteFeature = {
  params: featureIdParam
};

module.exports = {
  createFeature,
  getFeature,
  updateFeature,
  deleteFeature
};

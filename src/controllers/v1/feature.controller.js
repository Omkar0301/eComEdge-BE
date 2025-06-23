const { status } = require('http-status');
const featureService = require('../../services/feature.service');
const { sendSuccess } = require('../../utils/response');
const parseQuery = require('../../utils/parseQuery');

const featureController = {
  /**
   * Create new feature
   */
  createFeature: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const image_url = req.file ? `/uploads/feature/${req.file.filename}` : null;

      const feature = await featureService.createFeature({ name, description, image_url });
      return sendSuccess(res, 'Feature created successfully', feature, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  getAllFeatures: async (req, res, next) => {
    try {
      const features = await featureService.getAllFeatures();
      return sendSuccess(res, 'features fetched successfully', features, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get feature by ID
   */
  getFeature: async (req, res, next) => {
    try {
      const feature = await featureService.getFeatureById(req.params.id);
      return sendSuccess(res, 'feature fetched successfully', feature, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update feature
   */
  updateFeature: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const image_url = req.file ? `/uploads/feature/${req.file.filename}` : null;

      const updateData = { name, description };
      if (image_url) updateData.image_url = image_url;

      const feature = await featureService.updateFeature(req.params.id, updateData);
      return sendSuccess(res, 'Feature updated successfully', feature, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete feature
   */
  deleteFeature: async (req, res, next) => {
    try {
      await featureService.deleteFeature(req.params.id);
      return sendSuccess(res, 'feature deleted successfully', null, {}, status.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = featureController;

const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const featureRepository = require('../repositories/feature.repository');
const { hashPassword } = require('../utils/password');

class FeatureService {
  /**
   * Create new feature
   */
  async createFeature(data) {
    return await featureRepository.createFeature(data);
  }

  /**
   * Get All Features
   */
  async getAllFeatures() {
    return await featureRepository.findAllFeatures();
  }

  /**
   * Get feature by ID
   */
  async getFeatureById(id) {
    const feature = await featureRepository.findFeatureById(id);
    if (!feature) {
      throw new ApiError(status.NOT_FOUND, 'Feature not found');
    }
    return feature;
  }

  /**
   * Update Feature by ID
   */
  async updateFeature(id, updateData) {
    const updatedFeature = await featureRepository.updateFeature(id, updateData);
    if (!updatedFeature) {
      throw new ApiError(status.NOT_FOUND, 'Feature not found');
    }

    return updatedFeature;
  }

  /**
   * Delete feature by ID
   */
  async deleteFeature(id) {
    const feature = await featureRepository.findFeatureById(id);
    if (!feature) {
      throw new ApiError(status.NOT_FOUND, 'Feature not found');
    }
    const deletedFeature = await featureRepository.deleteFeature(id);
    return deletedFeature;
  }
}

module.exports = new FeatureService();

const Feature = require('../models/feature.model');

class FeatureRepository {
  async createFeature(data) {
    return await Feature.create(data);
  }

  async findAllFeatures() {
    return await Feature.find();
  }

  async findFeatureById(id) {
    return await Feature.findById(id);
  }

  async updateFeature(id, data) {
    return await Feature.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteFeature(id) {
    return await Feature.findByIdAndDelete(id);
  }
}

module.exports = new FeatureRepository();

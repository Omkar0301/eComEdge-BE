const Pricing = require('../models/pricing.model');

class PricingRepository {
  async createPricing(data) {
    return await Pricing.create(data);
  }

  async findAllPricing() {
    return await Pricing.find();
  }

  async findPricingById(id) {
    return await Pricing.findById(id);
  }

  async updatePricing(id, data) {
    return await Pricing.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePricing(id) {
    return await Pricing.findByIdAndDelete(id);
  }
}

module.exports = new PricingRepository();

const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const pricingRepository = require('../repositories/pricing.repository');

class PricingService {
  async createPricing(data) {
    return await pricingRepository.createPricing(data);
  }

  async getAllPricing() {
    const pricing = await pricingRepository.findAllPricing();
    if (!pricing || pricing.length === 0) {
      throw new ApiError(status.NOT_FOUND, 'No pricing plans found');
    }
    return pricing;
  }

  async getPricingById(id) {
    const pricing = await pricingRepository.findPricingById(id);
    if (!pricing) {
      throw new ApiError(status.NOT_FOUND, 'Pricing plan not found');
    }
    return pricing;
  }

  async updatePricing(id, updateData) {
    const pricing = await pricingRepository.findPricingById(id);
    if (!pricing) {
      throw new ApiError(status.NOT_FOUND, 'Pricing plan not found');
    }
    return await pricingRepository.updatePricing(id, updateData);
  }

  async deletePricing(id) {
    const pricing = await pricingRepository.findPricingById(id);
    if (!pricing) {
      throw new ApiError(status.NOT_FOUND, 'Pricing plan not found');
    }
    return await pricingRepository.deletePricing(id);
  }
}

module.exports = new PricingService();

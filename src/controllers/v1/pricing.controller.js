const { status } = require('http-status');
const pricingService = require('../../services/pricing.service');
const { sendSuccess } = require('../../utils/response');

const pricingController = {
  /**
   * Create new pricing plan
   */
  createPricing: async (req, res, next) => {
    try {
      const { name, price, description, features } = req.body;
      const pricing = await pricingService.createPricing({
        name,
        price,
        description,
        features
      });
      return sendSuccess(res, 'Pricing plan created successfully', pricing, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all pricing plans
   */
  getAllPricing: async (req, res, next) => {
    try {
      const pricing = await pricingService.getAllPricing();
      return sendSuccess(res, 'Pricing plans fetched successfully', pricing, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get pricing plan by ID
   */
  getPricing: async (req, res, next) => {
    try {
      const pricing = await pricingService.getPricingById(req.params.id);
      return sendSuccess(res, 'Pricing plan fetched successfully', pricing, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update pricing plan
   */
  updatePricing: async (req, res, next) => {
    try {
      const { name, price, description, features } = req.body;
      const updateData = { name, price, description, features };
      const pricing = await pricingService.updatePricing(req.params.id, updateData);
      return sendSuccess(res, 'Pricing plan updated successfully', pricing, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete pricing plan
   */
  deletePricing: async (req, res, next) => {
    try {
      await pricingService.deletePricing(req.params.id);
      return sendSuccess(res, 'Pricing plan deleted successfully', null, {}, status.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = pricingController;

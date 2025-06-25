const { status } = require('http-status');
const portfolioService = require('../../services/portfolio.service');
const { sendSuccess } = require('../../utils/response');

const portfolioController = {
  /**
   * Create new portfolio item
   */
  createPortfolio: async (req, res, next) => {
    try {
      const { title, description, link } = req.body;
      const image = req.file ? `/uploads/portfolio/${req.file.filename}` : null;
      const portfolio = await portfolioService.createPortfolio({ title, description, image, link });
      return sendSuccess(res, 'Portfolio created successfully', portfolio, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all portfolio items
   */
  getAllPortfolios: async (req, res, next) => {
    try {
      const portfolios = await portfolioService.getAllPortfolios();
      return sendSuccess(res, 'Portfolios fetched successfully', portfolios, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get portfolio item by ID
   */
  getPortfolio: async (req, res, next) => {
    try {
      const portfolio = await portfolioService.getPortfolioById(req.params.id);
      return sendSuccess(res, 'Portfolio fetched successfully', portfolio, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update portfolio item
   */
  updatePortfolio: async (req, res, next) => {
    try {
      const { title, description, link } = req.body;
      const image = req.file ? `/uploads/portfolio/${req.file.filename}` : null;

      const updateData = { title, description, link };
      if (image) updateData.image = image;

      const portfolio = await portfolioService.updatePortfolio(req.params.id, updateData);
      return sendSuccess(res, 'Portfolio updated successfully', portfolio, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete portfolio item
   */
  deletePortfolio: async (req, res, next) => {
    try {
      await portfolioService.deletePortfolio(req.params.id);
      return sendSuccess(res, 'Portfolio deleted successfully', null, {}, status.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = portfolioController;

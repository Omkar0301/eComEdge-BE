const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const portfolioRepository = require('../repositories/portfolio.repository');

class PortfolioService {
  async createPortfolio(data) {
    return await portfolioRepository.createPortfolio(data);
  }

  async getAllPortfolios() {
    const portfolios = await portfolioRepository.findAllPortfolios();
    if (!portfolios || portfolios.length === 0) {
      throw new ApiError(status.NOT_FOUND, 'No portfolio items found');
    }
    return portfolios;
  }

  async getPortfolioById(id) {
    const portfolio = await portfolioRepository.findPortfolioById(id);
    if (!portfolio) {
      throw new ApiError(status.NOT_FOUND, 'Portfolio item not found');
    }
    return portfolio;
  }

  async updatePortfolio(id, updateData) {
    const portfolio = await portfolioRepository.findPortfolioById(id);
    if (!portfolio) {
      throw new ApiError(status.NOT_FOUND, 'Portfolio item not found');
    }
    return await portfolioRepository.updatePortfolio(id, updateData);
  }

  async deletePortfolio(id) {
    const portfolio = await portfolioRepository.findPortfolioById(id);
    if (!portfolio) {
      throw new ApiError(status.NOT_FOUND, 'Portfolio item not found');
    }
    return await portfolioRepository.deletePortfolio(id);
  }
}

module.exports = new PortfolioService();

const Portfolio = require('../models/portfolio.model');

class PortfolioRepository {
  async createPortfolio(data) {
    return await Portfolio.create(data);
  }

  async findAllPortfolios() {
    return await Portfolio.find();
  }

  async findPortfolioById(id) {
    return await Portfolio.findById(id);
  }

  async updatePortfolio(id, data) {
    return await Portfolio.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePortfolio(id) {
    return await Portfolio.findByIdAndDelete(id);
  }
}

module.exports = new PortfolioRepository();

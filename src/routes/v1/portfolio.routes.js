const express = require('express');
const router = express.Router();
const portfolioController = require('../../controllers/v1/portfolio.controller');
const validate = require('../../middlewares/validation');
const { portfolioValidation } = require('../../validations/portfolio.validation');
const { uploadSingleImage } = require('../../middlewares/multer');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(portfolioController.getAllPortfolios)
  .post(
    auth('admin'),
    uploadSingleImage('portfolio'),
    validate(portfolioValidation.createPortfolio),
    portfolioController.createPortfolio
  );

router
  .route('/:id')
  .get(validate(portfolioValidation.getPortfolio), portfolioController.getPortfolio)
  .patch(
    auth('admin'),
    uploadSingleImage('portfolio'),
    validate(portfolioValidation.updatePortfolio),
    portfolioController.updatePortfolio
  )
  .delete(
    auth('admin'),
    validate(portfolioValidation.deletePortfolio),
    portfolioController.deletePortfolio
  );

module.exports = router;

const { status } = require('http-status');
const testimonialService = require('../../services/testimonial.service');
const { sendSuccess } = require('../../utils/response');

const testimonialController = {
  /**
   * Create new testimonial
   */
  createTestimonial: async (req, res, next) => {
    try {
      const { clientName, description, company } = req.body;
      const testimonial = await testimonialService.createTestimonial({
        clientName,
        description,
        company
      });
      return sendSuccess(res, 'Testimonial created successfully', testimonial, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all testimonials
   */
  getAllTestimonials: async (req, res, next) => {
    try {
      const testimonials = await testimonialService.getAllTestimonials();
      return sendSuccess(res, 'Testimonials fetched successfully', testimonials, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get testimonial by ID
   */
  getTestimonial: async (req, res, next) => {
    try {
      const testimonial = await testimonialService.getTestimonialById(req.params.id);
      return sendSuccess(res, 'Testimonial fetched successfully', testimonial, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update testimonial
   */
  updateTestimonial: async (req, res, next) => {
    try {
      const { clientName, description, company } = req.body;
      const updateData = { clientName, description, company };
      const testimonial = await testimonialService.updateTestimonial(req.params.id, updateData);
      return sendSuccess(res, 'Testimonial updated successfully', testimonial, {}, status.OK);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete testimonial
   */
  deleteTestimonial: async (req, res, next) => {
    try {
      await testimonialService.deleteTestimonial(req.params.id);
      return sendSuccess(res, 'Testimonial deleted successfully', null, {}, status.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = testimonialController;

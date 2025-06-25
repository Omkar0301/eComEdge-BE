const ApiError = require('../utils/ApiError');
const { status } = require('http-status');
const testimonialRepository = require('../repositories/testimonial.repository');

class TestimonialService {
  async createTestimonial(data) {
    return await testimonialRepository.createTestimonial(data);
  }

  async getAllTestimonials() {
    const testimonials = await testimonialRepository.findAllTestimonials();
    if (!testimonials || testimonials.length === 0) {
      throw new ApiError(status.NOT_FOUND, 'No testimonials found');
    }
    return testimonials;
  }

  async getTestimonialById(id) {
    const testimonial = await testimonialRepository.findTestimonialById(id);
    if (!testimonial) {
      throw new ApiError(status.NOT_FOUND, 'Testimonial not found');
    }
    return testimonial;
  }

  async updateTestimonial(id, updateData) {
    const testimonial = await testimonialRepository.findTestimonialById(id);
    if (!testimonial) {
      throw new ApiError(status.NOT_FOUND, 'Testimonial not found');
    }
    return await testimonialRepository.updateTestimonial(id, updateData);
  }

  async deleteTestimonial(id) {
    const testimonial = await testimonialRepository.findTestimonialById(id);
    if (!testimonial) {
      throw new ApiError(status.NOT_FOUND, 'Testimonial not found');
    }
    return await testimonialRepository.deleteTestimonial(id);
  }
}

module.exports = new TestimonialService();

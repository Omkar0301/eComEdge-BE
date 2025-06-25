const Testimonial = require('../models/testimonial.model');

class TestimonialRepository {
  async createTestimonial(data) {
    return await Testimonial.create(data);
  }

  async findAllTestimonials() {
    return await Testimonial.find();
  }

  async findTestimonialById(id) {
    return await Testimonial.findById(id);
  }

  async updateTestimonial(id, data) {
    return await Testimonial.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTestimonial(id) {
    return await Testimonial.findByIdAndDelete(id);
  }
}

module.exports = new TestimonialRepository();

const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    features: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Pricing', PricingSchema);

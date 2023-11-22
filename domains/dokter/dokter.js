const mongoose = require('mongoose');

const dokterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// index definitions
dokterSchema.index({ name: 1 }, { name: 'dokter_name_idx' });

exports.Dokter = mongoose.model('Dokter', dokterSchema);

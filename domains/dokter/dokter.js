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
    // tambahin user.id
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'dokter must belong to a user.'],
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

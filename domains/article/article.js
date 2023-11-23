const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// index definitions
articleSchema.index({ title: 1 }, { name: 'article_title_idx' });

exports.Article = mongoose.model('Article', articleSchema);

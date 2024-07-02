const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  category: { type: String, required: false },
  slug: { type: String, required: false, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', articleSchema);

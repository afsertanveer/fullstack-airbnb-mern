const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String,
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
});

const Review = new mongoose.model('Review', ReviewSchema);
module.exports = Review;

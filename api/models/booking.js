const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    requred: true,
    ref: 'Place',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    requred: true,
    ref: 'User',
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    reqiored: true,
  },
  phone: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

const Booking = new mongoose.model('Booking', bookingSchema);

module.exports = Booking;

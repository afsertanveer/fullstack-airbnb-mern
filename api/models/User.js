const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  role: Number, // 0-admin,1-owner,2-user
  password: String,
});

const User = new mongoose.model('User', UserSchema);
module.exports = User;

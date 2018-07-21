const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    fullName: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    phone: { type: Number, unique: false, required: true },
    email: { type: String, unique: false, required: true },
    // sessionId: { type: String, unique: true, required: false },
    role: { type: String, default: 'normal', required: false },
    createdDate: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false, required: true }
  },
  {
    versionKey: false
  }
);

UserSchema.index({
  username: 1
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
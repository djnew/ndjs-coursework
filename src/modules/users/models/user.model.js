const {Schema, model} = require("mongoose");

const UserScheme = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  contactPhone: {
    type: String,
    trim: true,
    default: ''
  },
});

const UserModel = model("User", UserScheme);

module.exports = {UserModel};

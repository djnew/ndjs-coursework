const {Schema, model, SchemaTypes} = require('mongoose');

const AdvertisementScheme = new Schema({
  shortText: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  images: [String],
  userId: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now()
  },
  tags: [String],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const AdvertisementModel = model('Advertisement', AdvertisementScheme);
module.exports = {AdvertisementModel};

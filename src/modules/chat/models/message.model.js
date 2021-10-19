const {Schema, SchemaTypes, model} = require('mongoose');
const MessageSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  sentAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  text: {
    type: SchemaTypes.String,
    required: true,
  },
  readAt: {
    type: Date,
    required: false,
  },
});
const MessageModel = model('Message', MessageSchema);
module.exports = {MessageModel};

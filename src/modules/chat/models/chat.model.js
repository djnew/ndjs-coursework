const {Schema, SchemaTypes, model} = require('mongoose');
const ChatSchema = new Schema({
  users: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  messages: [SchemaTypes.ObjectId],
});
const ChatModel = model('Chat', ChatSchema);
module.exports = {ChatModel};

const {ChatModel} = require('../models/chat.model');
const {MessageModel} = require('../models/message.model');
const {emitter} = require('../events/chat.events');
const mongoose = require('mongoose');

const ChatService = {
  find: async ([author, receiver]) => {
    try {
      return ChatModel.findOne({
        $or: [{users: [author, receiver]}, {users: [receiver, author]}]
      });
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  getUsersByChatId: async (chatId) => {
    return ChatModel.findOne({_id: chatId}).select('users');
  },
  sendMessage: async ({author, receiver, text}) => {
    console.log('users', [author, receiver]);
    let chat = await ChatService.find([author, receiver]);

    const message = new MessageModel({
      author,
      sentAt: new Date(),
      text,
    });
    await message.save();


    if (chat) {
      console.log([...chat.messages, new mongoose.mongo.ObjectId(message.id)]);
      await ChatModel.findByIdAndUpdate(chat.id.toString(), [...chat.messages, message.id]);
      console.log(`chat exist ${chat.id}`);
      return emitter.emit('sendToSubscribers', {chatId: chat.id.toString(), message});
    } else {
      console.log('chat not exist', {
        users: [author, receiver],
        messages: [message.id]
      });
      chat = await ChatModel.create({
        users: [author, receiver],
        messages: [message.id]
      });
      return emitter.emit('sendToSubscribers', {chatId: chat.id, message});
    }
  },
  subscribe: async (fn) => {
    emitter.removeAllListeners('sendToSubscribers').on('sendToSubscribers', ({chatId, message}) => {
      console.log('sendToSubscribers', {chatId, message});
      fn({chatId, message});
    });
  },
  getHistory: async (id) => {
    const chat = await ChatModel.findOne({_id: id.toString()})
      .populate({
        path: 'messages',
        select: '-__v',
        model: 'Message',
        populate: {path: 'author', select: 'name', model: 'User'}
      })
      .select('-__v -updatedAt -isDeleted')
      .exec();
    return chat.messages;

  }
};

module.exports = {ChatService};

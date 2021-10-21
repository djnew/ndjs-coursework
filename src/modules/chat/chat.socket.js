const {ChatService} = require('./services/chat.service');
module.exports = async (socket, io) => {
  if (!socket.request.session || !socket.request.session.passport.user) {
    console.log('Unauthorized user connected!');
    socket.disconnect();
    return;
  }

  const curUser = socket.request.session.passport.user;
  socket.join(curUser);


  await ChatService.subscribe(async ({chatId, message}) => {
    console.log('newMessage',message);
    const chatUsers = await ChatService.getUsersByChatId(chatId);
    console.log('users:', chatUsers.users);
    chatUsers.users.forEach((user) => {
      console.log(user.toString(), message.text);
      io.in(user.toString()).emit('newMessage', message);
    });
  });


  socket.on('getHistory', async (historyPayload) => {
    console.log([historyPayload.id, curUser]);
    const chat = await ChatService.find([historyPayload.id, curUser]);
    console.log(chat);
    const messages = await ChatService.getHistory(chat._id);
    console.log(messages);
    io.in(curUser).emit('chatHistory', messages);
  });

  socket.on('sendMessage', async (sendMessagePayload) => {
    await ChatService.sendMessage(
      {
        author: curUser,
        receiver: sendMessagePayload.id,
        text: sendMessagePayload.message
      }
    );
  });

  socket.on('disconnect', () => {
    console.log(`Chat user disconnect: ${curUser}`);
  });
};

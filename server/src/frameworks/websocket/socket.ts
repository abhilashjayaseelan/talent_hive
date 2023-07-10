import { Server, Socket } from 'socket.io';

const socketConfig = (io: Server) => {
  let users: Array<any> = [];

  const addUser = (userId: string, socketId: string) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
  };

  const remUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
  };

  io.on('connection', (socket: Socket) => {
    // when connected
    console.log('a user connected...');

    socket.on('addUser', (userId) => {
      try {
        addUser(userId, socket?.id);
        io.emit('getUsers', users);
      } catch (error: any) {
        // Handling the error
        console.error('Error in addUser event:', error);
        // emit an error event to the client if needed
        socket.emit('addError', error.message);
      }
    });

    // send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      try {
        const user = getUser(receiverId);
        if (user) {
          io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
          });
        } else {
          throw new Error(`User with ID ${receiverId} not found`);
        }
      } catch (error: any) {
        // Handling the error
        console.error('Error in sendMessage event:', error);
        // emit an error event to the client if needed
        socket.emit('sendError', error.message);
      }
    });

    // when disconnect
    socket.on('disconnect', () => {
      console.log('a user disconnected');
      remUser(socket.id);
      io.emit('getUsers', users);
    });
  });
};

export default socketConfig;

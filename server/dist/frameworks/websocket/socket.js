"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketConfig = (io) => {
    let users = [];
    const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
    };
    const remUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };
    const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
    };
    io.on('connection', (socket) => {
        // when connected
        console.log('a user connected...');
        socket.on('addUser', (userId) => {
            try {
                addUser(userId, socket === null || socket === void 0 ? void 0 : socket.id);
                io.emit('getUsers', users);
            }
            catch (error) {
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
                }
                else {
                    throw new Error(`User with ID ${receiverId} not found`);
                }
            }
            catch (error) {
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
exports.default = socketConfig;

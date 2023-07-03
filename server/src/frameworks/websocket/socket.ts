import {Server, Socket} from 'socket.io';


const socketConfig = (io: Server) =>{
    let users: Array<any> = []

    const addUser = (userId:string, socketId: string) => {
        !users.some(user => user.userId === userId) &&
        users.push({userId, socketId})
    }

    const remUser = (socketId: string) => {
        users = users.filter(user => user.socketId !== socketId)
    }

    const getUser = (userId:string) => {
        return users.find(user=> user.userId === userId);
    }

    io.on("connection", (socket: Socket) => {
        // when connected
        console.log("a user connected...")
      
        socket.on("addUser", userId => {
            addUser(userId, socket?.id);
            io.emit('getUsers', users);
        });

        // send and get message
        socket.on("sendMessage",({senderId, receiverId, text})=> {
            const user = getUser(receiverId);
            io.to(user?.socketId).emit("getMessage", {
                senderId,
                text 
            })
        });

        // when disconnect 
        socket.on("disconnect", ()=> {
           console.log('a user disconnected') 
           remUser(socket.id);
           io.emit('getUsers', users)
        })
    });

    
}

export default socketConfig;
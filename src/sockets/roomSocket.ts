import { Server, Socket } from "socket.io";
import { addMassage, getRoomByName } from "../services/chatService";

export const chatByRoom = (io: Server, socket: Socket) => {
  socket.on("join-room", async (room) => {
    try {
      const foundRoom = await getRoomByName(room);
      if (foundRoom) {
        socket.join(room);
        socket.emit("laoud-masage", room.massages);
        socket.on("send-massege", async (message, room) => {
          await addMassage(room, message);
          io.to(room).emit("ressive-massege", message);
        });
      } else throw new Error(`room ${room} dos not exsiste`);
    } catch (err) {
      console.log(err);
    }
  });
};

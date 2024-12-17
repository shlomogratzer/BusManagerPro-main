import { Server } from "socket.io";
import { chatByRoom } from "./roomSocket";

export const mainSocketManager = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);
    chatByRoom(io, socket);
    socket.on("disconnected", () => {
      console.log(`user disconnected user-id ==> ${socket.id}`);
    });
  });
};

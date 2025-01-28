import { GET, POST } from "@/constants/api/http-methods";
import {
  SOCKET_CONNECTION_EVENT,
  SOCKET_JOIN_CHAT_ROOM_EVENT,
  SOCKET_JOINED_CHAT_ROOM_EVENT,
  SOCKET_MESSAGE_EVENT,
  SOCKET_SEND_MESSAGE_EVENT,
} from "@/constants/socket/events";
import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = 3001;

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: [GET, POST],
  },
});

io.on(SOCKET_CONNECTION_EVENT, (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on(SOCKET_JOIN_CHAT_ROOM_EVENT, (ChatRoomId) => {
    socket.join(ChatRoomId);
    console.log(`Client ${socket.id} joined room ${ChatRoomId}`);
    socket.emit(SOCKET_JOINED_CHAT_ROOM_EVENT, ChatRoomId);
  });

  socket.on(SOCKET_SEND_MESSAGE_EVENT, (data) => {
    const { roomId, userId, content } = data;

    io.to(roomId).emit(SOCKET_MESSAGE_EVENT, {
      roomId,
      userId,
      content,
    });

    console.log(`Message sent to room ${roomId}:`, content);
  });
});

server.listen(PORT, () => {
  console.log("Server running");
});

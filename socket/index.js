const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

// Событие подключения
io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  // Добавление нового пользователя
  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
      console.log("User connected:", userId);
    }
    console.log("Online users:", onlineUsers);

    // Отправить список онлайн пользователей
    io.emit("getOnlineUsers", onlineUsers);
  });

  // add mesegae

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  // Удаление пользователя при отключении
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected:", socket.id);
    console.log("Online users:", onlineUsers);

    // Обновить список онлайн пользователей
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(7070);
console.log("Socket server listening on port 7070");

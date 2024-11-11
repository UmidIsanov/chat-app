const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:3000" });
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("socked new connection", socket.id);

  // listen to a connection

  socket.on("addNewUser", (userId) => {
    onlineUsers.push({
      userId,
      socketId: socket.id,
    });
  });
});

io.listen(7070);

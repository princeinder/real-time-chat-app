const express = require("express");
const app = express();
const http = require("http");
var server = http.createServer(app);
const io = require("socket.io")(server);
const {
  addUser,
  getUsersInRoom,
  getUser,
  removeUser,
  getCurrentDate,
} = require("./users");
const router = require("./router");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "react-client/build"))
app.use(router);

io.on("connection", function (socket) {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) return callback(error);
    socket.join(user.room);
    socket.emit("message", {
      user: "admin",
      text: `${user.username}, welcome to room ${user.room} .`,
      date: getCurrentDate(),
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.username} has joined!`,
      date: `${getCurrentDate()} `,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.username,
      text: message,
      date: getCurrentDate(),
    });

    callback();
  });
});

const port = process.env.port || 5000;
server.listen(port, function () {
  console.log(`server start working at ${port}`);
});

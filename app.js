const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
//creates an own http server internally
const server = http.createServer(app);
const io = socketio(server);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data }); //Works like app.get and res.send
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000);

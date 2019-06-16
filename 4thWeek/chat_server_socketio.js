var http = require("http");
var express = require("express");
var app = express();
var router = express.Router();
var cors = require("cors");
var static = require("serve-static");
var socketio = require("socket.io");
var path = require("path");

app.use(cors());
app.use("/public", static(path.join(__dirname, "public")));

app.use("/", router);

var server = http.createServer(app);
server.listen(3000, function() {
  console.log("http://localhost:3000 ...");
});

// socketio 객체 생성 및 socket 서버 시작
var io = socketio.listen(server);

// 이벤트 처리
io.sockets.on("connection", function(socket) {
  console.log("socket connetion is succeded.");
  //   console.log("connection info: ", socket.request.connection._peername);
  //   console.log("remote adress: ", socket.request.connection._peername.address);
  //   console.log("remote port: ", socket.request.connection._peername.port);
  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;
});

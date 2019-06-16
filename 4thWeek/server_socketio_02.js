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
  console.log(">>>>>>>>>>>>> socket connetion is succeded.");
  //   console.log("connection info: ", socket.request.connection._peername);
  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;

  socket.on("message", function(message) {
    console.log("message is received.");
    console.dir(message);

    if (message.recepient == "All") {
      console.dir("현재 접속 세션 포함 모든 클라이언트에게 전송");
      io.sockets.emit("message", message);
    }
  });
});

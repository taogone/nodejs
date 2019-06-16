var http = require("http");
var express = require("express");
var app = express();
var router = express.Router();
var cors = require("cors");

app.use(cors());

// 메시지 저장 전역 변수
var messages = [];

router.route("/recieve").get(function(req, res) {
  var size = Number(req.query.size);
  if (size >= messages.length) {
    res.end();
    returen;
  }
  // 새로운 메시지 존재 시 잘라서 전송
  var respData = {
    total: messages.length,
    messagess: messages.slice(size)
  };
  res.end(JSON.stringify(respData));
});

router.route("/send").get(function(req, res) {
  messages.push({
    sender: req.query.sender,
    message: req.query.message
  });
  res.end();
});

app.use("/", router);

var server = http.createServer(app);
server.listen(3000, function() {
  console.log("http://localhost:3000 ...");
});

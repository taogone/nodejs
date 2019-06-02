const express = require("express");
const http = require("http");
const app = express();
const router = express.Router();
var static = require("serve-static");
var path = require("path");

app.set("port", 3000);

// middleware
app.subscribe("/public", static(path.join(__dirname, "/public")));

// user defined middleware
app.get("/image", function(req, res) {
  console.log("/image 요청됨");
  res.writeHead(200, { "Content-Type": "image/jpeg;charset=utf8" });
  res.send('<img src="/public/*.jpg">');
  res.end();
});

router.route("/hello").get(function(req, res) {
  console.log("/hello is requested.");
  res.write("<h1>this is /hello request.</h1>");
  res.end();
});

app.use("/", router);

// server intializing
http.createServer(app).listen(app.get("port"), () => {
  console.log("server is running on ", app.get("port"));
});

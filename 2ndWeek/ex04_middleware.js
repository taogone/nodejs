const express = require("express");
const http = require("http");
const app = express();
const router = express.Router();

app.set("port", 3000);

// middleware
// user defined middleware
app.use(function(req, res, next) {
  console.log("1st middleware...");
  res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
  next();
});

router.route("/").get(function(req, res) {
  console.log("/ is requested.");
  res.write("<h1>안녕하신가. 오늘은 일요일.</h1>");
  res.end();
});

router.route("/hello").get(function(req, res) {
  console.log("/ is requested.");
  res.write("<h1>this is /hello request.</h1>");
  res.end();
});

app.use("/", router);

// server intializing
http.createServer(app).listen(app.get("port"), () => {
  console.log("server is running on ", app.get("port"));
});

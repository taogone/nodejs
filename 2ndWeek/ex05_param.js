const express = require("express");
const http = require("http");
const app = express();
const router = express.Router();

app.set("port", process.env.PORT || 3000);

app.use(function(req, res, next) {
  console.log("1st middleware");
  var userAgent = req.header("User-Agent");
  var paramName = req.query.name;

  console.log(userAgent, paramName);
  res.send(userAgent, paramName);
  res.end();
});

app.use("/", router);

// server intializing
var server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("server is running on %d", app.get("port"));
});

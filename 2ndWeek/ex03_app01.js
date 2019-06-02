const http = require("http");
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();
app.set("port", 3000);

// ejs view engine setting
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// request path setting(router)
router.route("/hello").get(function(req, res) {
  console.log("/hello 요청 들어옴.");
  req.app.render("hello", { hello: "world" }, function(err, html) {
    if (err) throw err;
    res.send(html);
  });
  res.end("<h1>this is router</h1>");
});

// request router middleware setting
app.use("/", router);

const server = http.createServer(app).listen(app.get("port"), function() {
  console.log("http://localhost:", app.get("port"));
});

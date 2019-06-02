const express = require("express");
const http = require("http");
const app = express();
const router = express.Router();
var static = require("serve-static");
var path = require("path");
var bodyParser = require("body-parser");
var expressErrorHandler = require("express-error-handler");
var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html"
  }
});

app.set("port", 3000);

// middleware
app.use("/public", static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// user defined middleware
router.route("/process/login").post(function(req, res) {
  console.log("/image 요청됨");
  var userId = req.body.id;
  var userPasswd = req.body.passwd;
  res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
  res.end(`userId:${userID}, userPasswd: ${userPasswd}`);
});

router.route("/image").post(function(req, res) {
  console.log("/image 요청됨");
  res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
  res.send('<img src="./public/*.jpg">');
  res.end();
});

router.route("/hello").get(function(req, res) {
  console.log("/hello is requested.");
  res.write("<h1>this is /hello request.</h1>");
  res.end();
});

app.use("/", router);

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.all("*", function(req, res) {
  res.status(404).send("<h1>Page is not found</h1>");
});
// server intializing
http.createServer(app).listen(app.get("port"), () => {
  console.log("server is running on ", app.get("port"));
});

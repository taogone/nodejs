const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const router = express.Router();
const static = require("serve-static");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ express: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));
app.use(cors());

app.use(cookieParser());

router.route("/").get((req, res) => {
  console.log("/ 요청");
  res.end("localhost:3000 request......");
});

app.use("/", router);
var server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("server is running on ", app.get("port"));
});

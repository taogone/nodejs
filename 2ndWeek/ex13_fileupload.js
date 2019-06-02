const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const router = express.Router();
const static = require("serve-static");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const multer = require("multer");
const fs = require("fs");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ express: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));
app.use(cors());

// multer middleware 설정
// body-parser ==> multer ==> router 실행
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "upload");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname + Date.now());
  }
});

// 파일 제한: 10개, 1GB
var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});

// 라우팅 패스 설정
router
  .route("/process/photo")
  .post(upload.array("photo", 1), function(req, res) {
    console.log("파일 업로드...");
  });

try {
  console.log("파일 업로드 성공");
  var files = req.file;
  console.dir(files);
  res.send(files);
} catch (err) {
  console.log("파일 업로드 실패");
}

app.use("/", router);

var server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("server is running on ", app.get("port"));
});

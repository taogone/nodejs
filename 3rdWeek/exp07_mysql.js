var http = require("http");
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var router = express.Router();
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var expressSession = require("express-session");
var cookieParser = require("cookie-parser");
var static = require("serve-static");
var mongoose = require("mongoose");

app.set("port, process.env.PORT" || 3000);
// View Tamplate 등록
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Router 등록
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
);

// MongoDB 연결 설정
var database;
var UserSchema;
var UserModel;

function connectDB() {
  var dbUrl = "mongodb://localhost:27017/local";

  // 데이터베이스 연결
  console.log("Trying to connect Database");
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUrl);
  database = mongoose.connection;

  database.on(
    "error",
    console.error.bind(console, "mongoose connection error.")
  );
  database.on("open", function() {
    console.log("Dtabase is connected: %s", dbUrl);

    // Schema 정의
    UserSchema = mongoose.Schema({
      id: String,
      name: String,
      password: String
    });
    console.log("UserSchema is defined.");

    // UserModel 정의
    UserModel = mongoose.model("users", UserSchema);
    console.log("UserModel is defined.");
  });

  database.on("disconnected", function() {
    console.log("DB is disconnected. Try reconnect after 5 sec.");
    setTimeout(connectDB, 5000);
  });
}

function authUser(loginData, callback) {
  console.log("authUser is called.");
  // 사용자 인증 확인 함수

  UserModel.find(loginData, function(err, docs) {
    if (err) {
      callback(err, null);
      return;
    }

    if (docs.length > 0) {
      console.log("User is exist.");
      callback(null, docs);
    } else {
      console.log("User is non-exist.");
      callback(null, null);
    }
  });
}

function addUser(userData, callback) {
  console.log("addUser is called.");

  // UserModel 인스턴스 생성
  var user = new UserModel(userData);

  // UserModel 인스턴스를 통해 저장
  user.save(function(err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("New User is added.");
    callback(null, user);
  });
}

// Routing Configuration
router.route("/process/login").post(function(req, res) {
  //요청 파라미터 확인
  var userId = req.body.id;
  var passwd = req.body.passwd;
  var loginData = {
    id: userId,
    password: passwd
  };
  console.dir(loginData);

  if (database) {
    authUser(loginData, function(err, docs) {
      if (err) {
        throw err;
      }
      if (docs) {
        req.session.user = {
          id: docs[0].id,
          name: docs[0].name
        };
        res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        res.write(`<h3>로그인 성공</h3>`);
        res.write(`<p>아이디:${docs[0].id}</p>`);
        res.write(`<p>이름:${docs[0].name}</p>`);
        res.end();
      } else {
        res.end("no user");
      }
    });
  } else {
    res.end("no db connection");
  }
});

router.route("/process/logout").get(function(req, res) {
  console.log("/process/logout 요청됨.");
});

router.route("/process/adduser").post(function(req, res) {
  console.log("/process/adduser is requested.");

  // 전달받은 요청 파라미터 출력
  var userId = req.body.id;
  var userPasswd = req.body.passwd;
  var userName = req.body.name;

  var userData = {
    id: userId,
    name: userName,
    password: userPasswd
  };
  console.log("POST => ", userData);

  if (database) {
    console.log("사용자 추가 처리 시작");
    addUser(userData, function(err, result) {
      if (err) throw err;
      if (result) {
        console.dir(result);
        res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        res.write("사용자 추가 성공");
        res.write("<br><br>");
        res.write("<a href=/public/login.html>다시 로그인</a>");
        res.end();
      } else {
        res.end("사용자 추가 실패");
      }
    });
  } else {
    res.end("DB Connection Error");
  }
});

app.use("/", router);

// Express Server Execution
var server = http.createServer(app);
server.listen(app.port, function() {
  console.log("http://localhost:3000");
  connectDB();
});

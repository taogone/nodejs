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
    resave: true,
    saveUninitialized: true
  })
);

// 몽고디비 연결 설정
var db;
function connectDB() {
  var dbUrl = "mongodb://localhost:27017";
  mongoClient.connect(dbUrl, { useNewUrlParser: true }, function(
    err,
    database
  ) {
    if (err) throw err;
    console.log("MogoDB is connected: " + dbUrl);
    console.log(path.join(__dirname, "public"));
    db = database.db("local");
  });
}

function authUser(db, loginData, callback) {
  // 사용자 인증 확인 함수
  var users = db.collection("users");
  users.find(loginData).toArray(function(err, docs) {
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

function addUser(db, userData, callback) {
  console.log("addUser function execution");
  var users = db.collection("users");
  users.insertMany([userData], function(err, result) {
    if (err) {
      callback(err, null);
      return;
    } else {
      console.log("New User is added succefully.");
      callback(null, result);
    }
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

  if (db) {
    authUser(db, loginData, function(err, docs) {
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

router.route("/process/test").post(function(req, res) {
  console.log("/process/test 요청 테스트");
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

  if (db) {
    console.log("사용자 추가 처리 시작");
    addUser(db, userData, function(err, result) {
      if (err) throw err;
      if (result && result.insertedCount > 0) {
        console.dir(result);
        res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        res.write("사용자 추가 성공");
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
server.listen(3000, function() {
  console.log("http://localhost:3000");
  connectDB();
});

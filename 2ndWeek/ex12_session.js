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

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ express: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));
app.use(cors());

app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true
  })
);

// router.route("/").get((req, res, next) => {
//   console.log("/ 미들웨어 호출");
//   res.end("localhost:3000 request......");
//   next();
// });

router.route("/user/setCookie").get((req, res) => {
  console.log("/user/setCookie 요청");
  // Cookie setting on res
  res.cookie("user", {
    id: "taogone",
    name: "김영기",
    authorized: true
  });
  res.redirect("/user/showCookie");
});

router.route("/user/showCookie").get((req, res) => {
  console.log("/user/showCookie 요청");
  var userCookie = req.cookies;
  console.dir(userCookie.user.id);
  res.send(userCookie.user);
});

router.route("/public/login").post((req, res) => {
  console.log("/public/login 요청");
  var paramId = req.body.id;
  var paramPasswd = req.body.passwd;
  console.log(`paramId:${paramId}, paramPasswd:${paramPasswd}`);

  if (req.session.user) {
    console.log("이미 로그인 되어 있습니다.");
    res.redirect("/public/product.html");
  } else {
    // session save(later, mongoDB is used for user account management)
    req.session.user = {
      id: "taogone",
      name: "김영기",
      authorized: true
    };
  }
  res.writeHead(200, { "Content-type": "text/html;charset=utf8" });
  res.write("<h1>로그인 성공</h1>");
  res.write(`<div><p>param id: ${paramId}</p></div>`);
  res.write(`<div><p>param Passwd: ${paramPasswd}</p></div>`);
  //   res.redirect("/public/product");
  res.write('<br><br><a href="/public/product">product</a>');
  res.write('<br><br><a href="/public/logout">logout</a>');
});

router.route("/public/logout").get((req, res) => {
  console.log("/public/logout 요청");
  if (req.session.user) {
    // 세션 정보 삭제 -- 로그아웃 처리
    req.session.destroy(function(err) {
      if (err) {
        throw err;
      }
      console.log("세션을 삭제하고 로그아웃 처리함.");
      res.redirect("/public/login.html");
    });
  } else {
    console.log("아직 로그인 전");
    res.redirect("/public/login.html");
  }
  res.end();
});

router.route("/public/product").get((req, res) => {
  console.log("/public/product 요청");
  if (req.session.user === undefined) {
    console.log("로그인 필요");
    res.redirect("/public/login.html");
  } else {
    var pInfo = {
      name: "냉장고",
      price: "2,500,000",
      ㄷㅁ: 100
    };
    req.app.render("product", { p: pinfo }, function(err, html) {
      if (err) {
        throw err;
      }
      res.end(html);
    });
  }
  res.end("/shop/product");
});

app.use("/", router);

var server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("server is running on ", app.get("port"));
});

var http = require("http");
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var router = express.Router();
var app = express();
var path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
    db = database.db("vehicle");
  });
}

function carlist(db, callback) {
  // MongoDB 연결 등 처리
  var car = db.collection("car");
  car.find({}).toArray(function(err, docs) {
    if (err) {
      callback(err, null);
    }
    if (docs.length > 0) {
      callback(null, docs);
    } else {
      callback(null, docs);
    }
  });
}

// Routing Configuration
router.route("/car_list").get(function(req, res) {
  console.log("/car_list 요청됨.");
  if (db) {
    // 콜백 함수를 활용한 처리
    carlist(db, function(err, result) {
      // View Page
      if (err) throw err;
      console.log(result);

      req.app.render("car_list", { carList: result }, function(err, html) {
        res.end(html);
      });
    });
  } else {
    res.end("MongoDB connection error");
  }
});

app.use("/", router);

// Express Server Execution
var server = http.createServer(app);
server.listen(3000, function() {
  console.log("http://localhost:3000");
  connectDB();
});

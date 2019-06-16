const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const express = require("express");
const engines = require("consolidate");
const ejs = require("ejs");
const fs = require("fs");
const router = express.Router();

const app = express();
//const static = require('serve-static');
const path = require("path");
const bodyParser = require("body-parser");

///// 구글 FireStore 데이터 베이스 설정
const admin = firebase;
var serviceAccount = require("./ykkim-eee46-firebase-adminsdk-vq2a1-25e0d028bd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
/////////////////////////////////////

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//app.use('/public', static(path.join(__dirname, 'public')) );
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

router.route("/car_list").get((request, response) => {
  response.set("Cache-Control", "public, max-age=300, s-maxage=600");

  fs.readFile("./views/car_list.ejs", "utf8", function(error, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(
      ejs.render(data, {
        cars: [
          { name: "SM3", price: 2000, year: 1999, company: "SAMSUNG" },
          { name: "SM9", price: 6000, year: 2013, company: "SAMSUNG" }
        ]
      })
    );
  });
});

router.route("/user").get((req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  console.log("GET /user 요청 됨.");

  var usersRef = db.collection("users");
  var allUsers = usersRef
    .get()
    .then(snapshot => {
      var userList = [];
      snapshot.forEach(doc => {
        var docData;
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  res.end();
});

router.route("/user").post((req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  console.log("POST /user 요청 됨.");

  var userData = {
    id: req.body.id,
    name: req.body.name,
    region: req.body.region,
    password: req.body.password
  };
  //console.dir("userData ===> ", userData);

  // Add a new document with a generated id.
  var addDoc = db
    .collection("users")
    .add(userData)
    .then(ref => {
      console.log("Added document with ID: ", ref.id);
      res.end("Added document with ID: " + ref.id);
    })
    .catch(function(err) {
      res.end("/user - add error ...");
    });
});

app.use("/", router);
exports.app = functions.https.onRequest(app);

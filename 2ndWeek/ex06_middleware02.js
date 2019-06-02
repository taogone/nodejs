const express = require("express");
const http = require("http");
const app = express();
const router = express.Router();

app.set("port", 3000);

// middleware
// user defined middleware
router.route("/users/:name/detail").get(function(req, res) {
  console.log("1st middleware...");
  var userName = req.params.name;

  console.log("uerName = " + userName);
  res.end(`userName => ${userName}`);
});

router.route("/hello").get(function(req, res) {
  console.log("/hello is requested.");
  res.write("<h1>this is /hello request.</h1>");
  res.end();
});

app.use("/", router);

// server intializing
http.createServer(app).listen(app.get("port"), () => {
  console.log("server is running on ", app.get("port"));
});

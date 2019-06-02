const http = require("http");
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

app.use(cors());

// router path 설정
// elegance URL
// ex) http://localhost/plus/12/13
router.route("/plus/:a/:b").get(function(req, res) {
  let a = parseInt(req.params.a);
  let b = parseInt(req.params.b);
  //console.log(a + b);
  res.end(a + b + "");
});

app.use(router);

const server = http.createServer(app);
let port = 3000;
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

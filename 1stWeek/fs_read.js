var fs = require("fs");

// readFileSync
var data = fs.readFileSync("../package.json", "utf8");
console.log(data);

// readFile
fs.readFile("../package-lock.json", "utf8", function(err, data) {
  if (err) throw err;
  console.log("비동기 방식 파일 읽기.");
  console.log(data);
});

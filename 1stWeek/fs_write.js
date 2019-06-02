var fs = require("fs");

var msg = "readFile";

fs.writeFile("./out.txt", msg, function() {
  console.log("this is writeFile.");
  return;
});

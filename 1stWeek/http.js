var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req, res) {
  // pipe
  var instream = fs.createReadStream("./output.html");
  instream.pipe(res);
});

server.listen(3000);

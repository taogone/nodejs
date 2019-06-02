var http = require("http");

var server = http.createServer(function(req, res) {});

var port = 3000;
server.listen(port, function() {
  console.log("server is running.");
});

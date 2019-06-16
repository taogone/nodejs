var http = require('http');​
var express = require('express');​
var app = express();​

​app.get("/plus/:a/:b",function(req, resp) {​
   resp.end(String(Number(req.params.a) + parseInt(req.params.b)));​
});​

app.get("/minus/:a/:b",function(req, resp) {​
    resp.end(String(Number(req.params.a) - parseInt(req.params.b)));​
});​

app.get("/mult/:a/:b",function(req, resp) {​
    resp.end(String(Number(req.params.a) * parseInt(req.params.b)));​
});​

app.get("/div/:a/:b",function(req, resp) {​
    resp.end(String(Number(req.params.a) / parseInt(req.params.b)));​
});​

http.createServer(app).listen(8080);​
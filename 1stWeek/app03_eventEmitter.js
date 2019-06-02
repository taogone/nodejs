var util = require("util");
var EventEmitter = require("events").EventEmitter;

var Calc = function() {
  var self = true;
  this.on("stop", function() {
    console.log("Calc()에 stop event가 전달됨.");
  });
};

// 사용자 정의 Class에 EventEmitter를 상속함

util.inherits(Calc, EventEmitter);
Calc.prototype.add = function(a, b) {
  return a + b;
};

module.exports = EventEmitter;
module.exports.title = "calculator";

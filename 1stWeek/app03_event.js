var util = require("util");
var EventEmitter = require("events").EventEmitter;
var Calc = require("./app03_eventEmitter");

var calc = new Calc();
calc.emit("stop");

function MyClass() {
  this.on("send", function() {
    console.log("this is MyClass");
  });
}

util.inherits(MyClass, EventEmitter);
calc.emit("send", new MyClass());
console.log(calc.title);

var util = require("util");

// function Parent() {
//   this.name = "parent";
// }

// Parent.prototype.sayHello = function() {
//   console.log("hello", this.name);
// };

// function Child() {
//   this.name = "Child";
// }

// // 고전적 상속 방법
// console.log("고전적 상속");
// Child.prototype = new Parent();
// var child = new Child();
// child.sayHello();

console.log("상속 by util module");
console.log("---------------------------");

function P() {
  this.name = "Parent";
}

P.prototype.sayHello = function() {
  console.log("Hello from Parent Class.", this.name);
};

function C() {
  this.name = "Child";
}

util.inherits(C, P);
var child = new C();
child.sayHello();

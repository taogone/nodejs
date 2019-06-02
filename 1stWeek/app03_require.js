// var calc = require("./sunday_app03_module");
// console.log("calc.minus(5,3): ", calc.minus(5, 3));

var calc = require("./app03_module2");
console.log("calc.plus(5,3) >>> ", calc.plus(5, 3));
console.log("calc.minus(5,3) >>> ", calc.minus(5, 3));

var path = require("path");

console.log("__dirname: ", __dirname);
console.log("__filename:", __filename);
console.log("path.basename: ", path.basename(__filename));
console.log("path.extname: ", path.extname(__filename));
console.log("path.resolve: ", path.resolve(__filename));
var fullPath = path.join(__dirname, path.basename(__filename));
console.log("fullPath = ", fullPath);

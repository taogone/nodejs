var url = require("url");

var curURL = url.parse("https://search.naver.com?id=12&name=kim");
console.dir(curURL);

var curStr = url.format(curURL);

console.log(curStr);

// querystring parsing
var querystring = require("querystring");
var param = querystring.parse(curURL.query);

console.log("querystring: ", querystring.stringify(param));
console.log("id: ", param.id);
console.log("name: ", param.name);

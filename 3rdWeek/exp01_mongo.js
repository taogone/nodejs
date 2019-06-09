var mongojs = require("mongojs");
var db = mongojs("vehicle", ["family"]);

db.family.find(function(err, data) {
  console.log(data);
});

var MongoClient = require("mongodb").MongoClient;

var db;

MongoClient.connect("mongodb://localhost", { useNewUrlParser: true }, function(
  err,
  client
) {
  if (err) throw err;
  var db = client.db("vehicle");

  db.collection("family").findOne({}, function(findErr, result) {
    if (findErr) throw findErr;
    console.log(result);
    client.close();
  });
});

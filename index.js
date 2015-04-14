var express = require('express');
var app = express();

app.get("*", function(req, res){
  console.log(req.path);
  res.send("hello there");
});

app.post("*", function(req, res){
  console.log(req.path);
  res.status(200).send("POST hello there");
});

app.listen(3000);

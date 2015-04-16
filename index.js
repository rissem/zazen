var express = require('express');
var app = express();
var jade = require('jade');
var fs = require('fs');
var path = require('path');

app.get("*", function(req, res){
  console.log(req.path);
  var editorTemplate = path.join(__dirname, "editor.jade");
  var html = jade.renderFile(editorTemplate, {youAreUsingJade: true, filepath: req.path});

  res.send(html);
});

app.post("*", function(req, res){
  console.log(req.path);
  res.status(200).send("POST hello there");
});

app.listen(3000);

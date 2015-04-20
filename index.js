var express = require('express');
var app = express();
var jade = require('jade');
var fs = require('fs');
var path = require('path');

app.use('/public', express.static('public'));
app.use("/code-mirror", express.static('CodeMirror'));

app.get("*", function(req, res, next){
  var editorTemplate = path.join(__dirname, "editor.jade");
  console.log("LOAD FILE", req.path)
  fs.readFile(path.join(process.cwd(), req.path), function(err, data){
    if (err){
      res.status(500).send(err);
    } else {
      var html = jade.renderFile(editorTemplate, {youAreUsingJade: true, file: data, filepath: req.path});
      res.send(html);
    }
  })
});

app.post("*", function(req, res){
  console.log(req.path);
  res.status(200).send("POST hello there");
});


app.listen(3000);

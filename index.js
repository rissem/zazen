var express = require('express');
var app = express();
var jade = require('jade');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/code-mirror", express.static(path.join(__dirname, 'CodeMirror')));

app.get("*", function(req, res, next){
  var editorTemplate = path.join(__dirname, "editor.jade");
  console.log("LOAD FILE", req.path)
  fs.readFile(path.join(process.cwd(), req.path), function(err, data){
    //test for missing file, in that case just return an empty string
    if (err && err.code === "ENOENT"){
      var html = jade.renderFile(editorTemplate, {youAreUsingJade: true, file: '', filepath: req.path});
      res.status(201).send(html)
    } else if (err){
      res.status(500).send(err);
    } else {
      var html = jade.renderFile(editorTemplate, {youAreUsingJade: true, file: data, filepath: req.path});
      res.send(html);
    }
  })
});

app.post("*", function(req, res){
  fs.writeFile(path.join(process.cwd(), req.path), req.body.fileData, function(err, data){
    if (err){
      res.status(500).send(err);
    } else {
      res.status(200).send("SUCCESS");
    }
  });
});


app.listen(process.env.PORT || 3000);

var express = require("express");
var ncp = require('ncp').ncp;

var ruta = require('path');

var app = express();

var fs = require('fs'); 


// mostrar videos q hay en la carpeta videos
app.get('/', (req, res) =>{
  ncp("//192.168.1.100/project/", ruta.join(__dirname, '../videos/',  'video' ), function (err) {  
    if (err) {    
      return console.error(err);  
    }  
    console.log('done!'); 
  });

  var files = fs.readdirSync(ruta.join(__dirname, '../videos/'));

    console.log(files);
      res.status(200).json({
        files
      });
});

app.get('/:name', (req, res) =>{
  var name = req.params.name;
  var path = 'videos/'+ name;
  var stat = fs.statSync(path)
  var fileSize = stat.size
  var range = req.headers.range

 if (range) {
    var parts = range.replace(/bytes=/, "").split("-")
    var start = parseInt(parts[0], 10)
    var end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    var chunksize = (end-start)+1
    var file = fs.createReadStream(path, {start, end})
    var head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    var head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  } 
});

module.exports  = app;
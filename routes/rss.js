var express = require("express");
var app = express();

var Parser = require('rss-parser');
var parser = new Parser();
var Setting = require('../models/setting');

app.get('/', (req, res, next) =>{
 (async () => {
    const setting = await Setting.find({ }, 'banner_rss');
    let feed = await parser.parseURL(setting[0].banner_rss);
   res.status(200).json({
       feed
    });
  })();
});




module.exports  = app;
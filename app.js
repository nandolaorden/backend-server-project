// Requires (importacion de librerias)
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// Inicializar variables
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Importar rutas
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var settingRoutes = require('./routes/setting');
var loginRoutes = require('./routes/login');
var videoRoutes = require('./routes/video');

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/projectDB', ( err, res )=>{
  if(err) throw err;
   console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});


// Rutas
app.use('/user', userRoutes);
app.use('/setting', settingRoutes);
app.use('/login', loginRoutes);
app.use('/video', videoRoutes);
app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3000, ()=>{
  console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
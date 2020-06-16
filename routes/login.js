var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var SEED = require('../config/config').SEED;

var app = express();

var User = require('../models/user');

app.post('/', (req, res) =>{
  
  var body = req.body;
  User.findOne({ email: body.email }, (err, userDB)=>{
    if(err){
          return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar usuario',
            errors: err
          });
    }

    if(!userDB){
        return res.status(400).json({
            ok: false,
            mensaje: 'Email incorrecto',
            errors: err
          });
    }
  // Metodo para ver si la contraseña coincide
    if(!bcrypt.compareSync(body.password, userDB.password)){
      return res.status(400).json({
            ok: false,
            mensaje: 'Contraseña incorrecta',
            errors: err
      });
    }

    // crear token
    userDB.password = ': )';
    var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 28800 })

    res.status(200).json({
          ok: true,
          mensaje: 'Login post correcto',
          token: token,
          id: userDB._id
    });
  })

})



module.exports  = app;
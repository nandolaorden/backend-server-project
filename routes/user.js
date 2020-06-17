var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var mdAuthentication = require('../middlewares/authentication');

var app = express();

var User = require('../models/user');

// ==================
// Obtener el usuario indicado
// ==================
app.get('/5ee27b56b219af17b045d803', (req, res, next) =>{
  // Busca el usuario indicado y sacame nombre, email y rol
  User.find({ }, 'name email role')
    .exec(
      (err, user)=>{
      if(err){
        return res.status(500).json({
          ok: false,
          mensaje: 'Error cargando usuario',
          errors: err
        });
      }

      res.status(200).json({
        ok: true,
        user: user[0]
      });
    })
});



// ==================
// Cambiar contraseña al usuario
// ==================
app.put('/:id',  (req, res)=>{
  var id = req.params.id;
  var body = req.body;

  User.findById(id, (err, user) =>{

    if(err){
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar usuario',
          errors: err
        });
    }

    if(!user){
      return res.status(400).json({
        ok: false,
        mensaje: 'El usuario con el id ' + id + ' no existe',
        errors: { message: 'No existe un usuario con ese ID' }
      });
    }

    user.password = bcrypt.hashSync(body.password, 10),

    user.save( (err, userSave) =>{
      if(err){
          return res.status(401).json({
            ok: false,
            mensaje: 'Error al editar usuario',
            errors: err
          });
      }

      res.status(200).json({
        ok: true,
        usuario: userSave
      });
    });
  });
});


// ==================
// Crear nuevo usuario
// ==================
app.post('/', mdAuthentication.verifyToken, (req, res) =>{
  var body = req.body;


  var user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save( (err, userSave) =>{
    if(err){
        return res.status(401).json({
          ok: false,
          mensaje: 'Error al crear usuario',
          errors: err
        });
    }

    res.status(201).json({
      ok: true,
      usuario: userSave,
      usuariotoken: req.user
    });
  })
});

// ==================
// Borrar usuario por el id
// ==================
app.delete('/:id', mdAuthentication.verifyToken, (req, res)=>{
  var id = req.params.id;

  User.findByIdAndRemove(id,  (err, userDelete)=>{
    if(err){
      return res.status(401).json({
        ok: false,
        mensaje: 'Error al borrar usuario',
        errors: err
      });
    }

    if(!userDelete){
      return res.status(400).json({
        ok: false,
        mensaje: 'No existe un usuario con ese id',
        errors: { message: 'No existe un usuario con ese ID' }
      });
    }

    res.status(200).json({
      ok: true,
      usuario: userDelete
    });
  })
});





module.exports  = app;
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol permitido'
}


var userSchema = new Schema({

  name: { type: String, required: [true, 'El nombre es necesario'] },
  email: { type: String, unique: true,  required: [true, 'El correo electrónico es necesario'] },
  password: { type: String, required: [true, 'La contraseña es necesario'] },
  role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

userSchema.plugin(uniqueValidator, { message: 'El correo electrónico debe de ser único'  });

module.exports = mongoose.model('User', userSchema);
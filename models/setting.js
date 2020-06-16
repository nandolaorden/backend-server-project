var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var settingSchema = new Schema({

  position_information: { type: String, required: [true, 'Debe de seleccionar alguna posicion de barra informacion'] },
  position_meteorology: { type: String, required: [true, 'Debe de seleccionar alguna posicion de barra meteorologia'] },
  main_block_video: { type: Boolean, required: false, default: false },
  main_block_alert: { type: Boolean, required: false, default: false },
  main_block_news: { type: Boolean, required: false, default: false },
  url_server: { type: String,  required: false },
  banner_rss: { type: String,  required: false },
  banner_text: { type: String,  required: false },
  alertText: { type: String,  required: false },

});

module.exports = mongoose.model('Setting', settingSchema);
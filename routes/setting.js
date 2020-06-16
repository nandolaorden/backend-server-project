var express = require("express");
var jwt = require("jsonwebtoken");

var mdAuthentication = require('../middlewares/authentication');

var app = express();

var Setting = require('../models/setting');

// ==================
// Obtener la configuracion
// ==================
app.get('/:id', (req, res, next) =>{
  Setting.find({ })
    .exec(
      (err, setting)=>{
      if(err){
        return res.status(500).json({
          ok: false,
          mensaje: 'Error cargando configuracion',
          errors: err
        });
      }

      res.status(200).json({
        setting: setting[0]
      });
    })
});

// ==================
// Actualizar configuración
// ==================
app.put('/:id', (req, res)=>{
  var id = req.params.id;
  var body = req.body;

  Setting.findById(id, (err, setting) =>{

    if(err){
        return res.status(500).json({
          ok: false,
          mensaje: 'Error al buscar configuracion',
          errors: err
        });
    }

    if(!setting){
      return res.status(400).json({
        ok: false,
        mensaje: 'La configuracion con el id ' + id + ' no existe',
        errors: { message: 'No existe una configuracion con ese ID' }
      });
    }


    setting.position_information = body.information;
    setting.position_meteorology = body.meteorology;
    setting.main_block_video = body.video;
    setting.main_block_alert = body.alert;
    setting.main_block_news = body.news;
    setting.url_server = body.url_server;
    setting.banner_rss = body.url_font;
    setting.banner_text = body.area_news;
    setting.alertText = body.text_alert;

    setting.save( (err, settingSave) =>{
      if(err){
          return res.status(401).json({
            ok: false,
            mensaje: 'Error al guardar configuración',
            errors: err
          });
      }

      res.status(200).json({
        ok: true,
        configuration: settingSave
      });
    });
  });
});


module.exports  = app;
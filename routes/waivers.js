var express = require('express');
var router = express.Router();
//const { Waiver_Type } = require('../models');

router.get('/', function(req, res, next) {
    res.render('waivers', { 
      title: 'Paris Play | Waivers'
      }
    );
  });
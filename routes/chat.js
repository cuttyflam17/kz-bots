var express = require('express');
var router = express.Router();
var eventControl = require('../eventControl/chat-bot.js')

module.exports = function(app) {
  router.post('/', function(req, res) {
    var config = app.get('config');
    req.server.token = config.tokens.chat;
    var event = req.body.event;
    if(!event || !eventControl[event]) {
      return res.json({
        success: false,
        message: 'event is not found'
      })
    }
    eventControl[event](req, res, function(err) {
      if(err) {
        throw new Error(err);
      }
      res.end();
    })
  })

  app.use('/chat', router);
}
const client = require('../utils/redis').redisCon;
const connURL = require('../utils/rabbitMq');
var amqp = require('amqplib/callback_api');

amqp.connect(connURL, function(error0, conn) {
  if (error0) {
     throw error0;
   }
   conn.createChannel(function(error1, channel) {
         if (error1) {
           throw error1;
         }
         module.exports.ch = channel;
         var queue = 'a';
         channel.assertQueue(queue, {
           durable: true
         });
   });
 });

function publish(message)
{
      var queue = 'a';
      var msg = message;
      var channelCreator = require('./updatingCache.js');
      channelCreator.ch.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      });
      console.log(" [x] Sent '%s'", msg);

}

exports.updateCache = (req, res, next) => {
    var dataObj = {};
    client.keys('*', async function (err, keys) {
        if (err) return console.log(err);
            dataObj.keys = keys;
            data = JSON.stringify(dataObj);
            publish(data);
            res.send(dataObj);
        });
    }

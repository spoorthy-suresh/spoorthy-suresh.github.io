var amqp = require('amqplib/callback_api');
const client = require('../utils/redis').redisCon;
const connURL = require('../utils/rabbitMQ');


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

exports.updateCacheApi = (req, res, next) => {
            var dataObj = {};
            id = req.query.id;
            console.log(typeof id);
            console.log(id);
            client.get(id, async function(err, result) {
              if(result){
                console.log('from cache');
                dataObj.keys = [id];
                data = JSON.stringify(dataObj);                         //fetching data from cache
                publish(data);
                res.send('dataObj exist updation needed');
              }
              else{
                console.log('dataObj doesnt exist in cache no updation needed');
                  res.send('dataObj doesnt exist in cache no updation needed');
              }

            });

        }

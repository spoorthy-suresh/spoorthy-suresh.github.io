var amqp = require('amqplib/callback_api');

var connURL = {
"protocol" : "amqp",
"hostname" : process.env.RABBIT_HOST,
"port" : process.env.RABBIT_PORT,
"username":process.env.RABBIT_USERNAME,
"password": process.env.RABBIT_PASSWORD
}

module.exports = connURL;

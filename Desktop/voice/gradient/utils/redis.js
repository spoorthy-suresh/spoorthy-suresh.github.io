const redis = require("redis");

const object = {
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT,
    password : process.env.REDIS_PASSWORD,
    db : process.env.REDIS_DATABASE
}
const client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports.redisCon = client;
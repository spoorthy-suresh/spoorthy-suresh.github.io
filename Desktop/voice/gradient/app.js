const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
require('dotenv').config();

const cluster = require('cluster');

const numCPUs = require('os').cpus().length;

const db = require('./utils/database');               //establishing db connection
const client = require('./utils/redis').redisCon;     //establishing redis connection

app.use(bodyParser.json());  //used when req is sent in json
//app.use(bodyParser.urlencoded({ extended: false }))   //used when data is sent in form format

const port = process.env.PORT || 8080;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'                                   // allowing api requests from multiple domains
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

const authRoutes = require('./routes/auth');      //account validation
app.use('/v1/gradient/auth', authRoutes);

const basicRoutes = require('./routes/getIvr');      //IVR Configuration
app.use('/v1/gradient/user', basicRoutes);

const uuidRoutes = require('./routes/getUuid');   //fetching UUID
app.use('/v1/gradient/fetch', uuidRoutes);

const queueRoutes = require('./routes/getQueue');      //Queue Configuration
app.use('/v1/gradient/fetch', queueRoutes);

const callRoutes = require('./routes/getLimit');      //Call Rejection
app.use('/v1/gradient/get', callRoutes);

const cacheRoutes = require('./routes/cache');
app.use('/v1/gradient/update', cacheRoutes);                //updating cache as a background process
const cacheApiRoutes = require('./routes/cacheApi');
app.use('/v1/gradient/updating', cacheApiRoutes);

  var server = app.listen(port,function(){
        console.log("Server is up on port " + port);
    });

  console.log(`Worker ${process.pid} started`);
}

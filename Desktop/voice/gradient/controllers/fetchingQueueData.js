const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const { check, validationResult } = require('express-validator');
var empty = require('is-empty');

const client = require('../utils/redis').redisCon;
const msg = require('../utils/lang/messages');

exports.getQueueById = (req, res, next) => {
  id = req.query.id;
  console.log(id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if(empty(id)){
      const dataObj = {
        "status" : msg.response['GRT101'].status,
        "message": msg.response['GRT101'].message         //handling missing Id parameter in request
      };
      res.send(dataObj);
      return;
    }
    const dataObj = {
          "status" : msg.response['GRT102'].status,
          "message": msg.response['GRT102'].message         //handling when string is passed as Id in request
        };
        res.send(dataObj);
  }
  else{

    let dataObj = {
      "status" : msg.response['GRT106'].status,
      "message": msg.response['GRT106'].message
    };
    const redisKey = 'hexa_kapsule_queue_' + id;

    client.get(redisKey, async function(err, result) {
      if(result){
        console.log('from cache');
        console.log(result);
        data = JSON.parse(result);                       //fetching data from cache
        dataObj.data = data;
        res.send(dataObj);
      }
      else {
          var url =process.env.SURFACE_API_QUEUE + "?id={\"is\":" + id + "}";
          console.log(url);
            axios                                               //making api request to fetch data from db
              .get(url)
              .then(response => {
                console.log(response.data.data);
                if(empty(response.data.data)){
                  dataObj.status = msg.response['GRT103'].status;
                  dataObj.message = msg.response['GRT103'].message;
                  res.send(dataObj);
                }
                const redisValue = JSON.stringify(response.data.data);
                data = response.data.data;
                //const redisValue = JSON.stringify(response.data.data);
                dataObj.data = data;
                client.setex(redisKey, 3600, redisValue);                //caching the response obtained from db
                console.log(dataObj);
                res.send(dataObj);
              })
              .catch(error => {
                console.error(error);
              });
      }


    });
}
}

exports.getQueueByName = (req, res, next) => {

  name = req.query.name;
  console.log(name);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if(empty(name)){
      const dataObj = {
        "status" : msg.response['GRT107'].status,
        "message": msg.response['GRT107'].message         //handling missing name parameter in request
      };
      res.send(dataObj);
      return;
    }
    const dataObj = {
          "status" : msg.response['GRT108'].status,
          "message": msg.response['GRT108'].message         //handling when number is passed as name in request
        };
        res.send(dataObj);
  }
  else{
    let dataObj = {
      "status" : msg.response['GRT106'].status,
      "message": msg.response['GRT106'].message
    };
    const redisKey = 'hexa_kapsule_queue_' + name;

    client.get(redisKey, async function(err, result) {
      if(result){
        console.log('from cache');
        data = JSON.parse(result);                       //fetching data from cache
        dataObj.data = data;
        res.send(dataObj);
      }
      else {
          var url =process.env.SURFACE_API_QUEUE + "?name={\"is\":\"" + name + "\"}";
          console.log(url);
            axios                                               //making api request to fetch data from db
              .get(url)
              .then(response => {
                console.log(response.data.data);
                if(empty(response.data.data)){
                  dataObj.status = msg.response['GRT109'].status;
                  dataObj.message = msg.response['GRT109'].message;
                  res.send(dataObj);
                  return;
                }
                const redisValue = JSON.stringify(response.data.data);
                data = response.data.data;
                //const redisValue = JSON.stringify(response.data.data);
                dataObj.data = data;
                client.setex(redisKey, 3600, redisValue);                //caching the response obtained from db
                console.log(dataObj);

                res.send(dataObj);
              })
              .catch(error => {
                console.error(error);
              });
      }
    });
}
};



exports.getDedicatedQueue = (req, res, next) => {

      let dataObj = {
        "status" : msg.response['GRT106'].status,
        "message": msg.response['GRT106'].message
      };
      const redisKey = 'hexa_kapsule_queue_type_' + 1;

      client.get(redisKey, async function(err, result) {
        if(result){
          console.log('from cache');
          data = JSON.parse(result);                       //fetching data from cache
          dataObj.data = data;
          res.send(dataObj);
        }
        else {
            var url =process.env.SURFACE_API_QUEUE + "?type={\"is\":1}";
            console.log(url);
              axios                                               //making api request to fetch data from db
                .get(url)
                .then(response => {
                  console.log(response.data.data);
                  if(!response.data.data){
                    dataObj.status = msg.response['GRT110'].status;
                    dataObj.message = msg.response['GRT110'].message;
                    //res.send(dataObj);
                  }
                  var data =  response.data.data;
                  if(data[0].status == 1){
                    const redisValue = JSON.stringify(response.data.data);
                    //const redisValue = JSON.stringify(response.data.data);
                    dataObj.data = data;
                    client.setex(redisKey, 3600, redisValue);                //caching the response obtained from db
                    console.log(dataObj);
                    res.send(dataObj);
                  }

                })
                .catch(error => {
                  console.error(error);
                });
        }
      });
};

exports.getDeadQueue = (req, res, next) => {

      let dataObj = {
        "status" : msg.response['GRT106'].status,
        "message": msg.response['GRT106'].message
      };
      const redisKey = 'hexa_kapsule_queue_type_' + 3;

      client.get(redisKey, async function(err, result) {
        if(result){
          console.log('from cache');
          data = JSON.parse(result);                       //fetching data from cache
          dataObj.data = data;
          res.send(dataObj);
        }
        else {
            var url =process.env.SURFACE_API_QUEUE + "?type={\"is\":3}";
            console.log(url);
              axios                                               //making api request to fetch data from db
                .get(url)
                .then(response => {
                  console.log(response.data.data);
                  if(!response.data.data){
                    dataObj.status = msg.response['GRT110'].status;
                    dataObj.message = msg.response['GRT110'].message;
                    //res.send(dataObj);
                  }
                  var data =  response.data.data;
                  if(data[0].status == 1){
                    const redisValue = JSON.stringify(response.data.data);
                    //const redisValue = JSON.stringify(response.data.data);
                    dataObj.data = data;
                    client.setex(redisKey, 3600, redisValue);                //caching the response obtained from db
                    console.log(dataObj);
                    res.send(dataObj);
                  }

                })
                .catch(error => {
                  console.error(error);
                });
        }
      });
};


exports.getSplitterQueue = (req, res, next) => {

      let dataObj = {
        "status" : msg.response['GRT106'].status,
        "message": msg.response['GRT106'].message
      };
      const redisKey = 'hexa_kapsule_queue_type_' + 2;

      client.get(redisKey, async function(err, result) {
        if(result){
          console.log('from cache');
          data = JSON.parse(result);                       //fetching data from cache
          dataObj.data = data;
          res.send(dataObj);
        }
        else {
            var url =process.env.SURFACE_API_QUEUE + "?type={\"gt\":1}";
            console.log(url);
              axios                                               //making api request to fetch data from db
                .get(url)
                .then(response => {
                  console.log(response.data.data);
                  if(!response.data.data){
                    dataObj.status = msg.response['GRT110'].status;
                    dataObj.message = msg.response['GRT110'].message;
                    res.send(dataObj);
                  }
                  var data =  response.data.data;
                  if(data[0].status == 1){
                    const redisValue = JSON.stringify(response.data.data);
                    //const redisValue = JSON.stringify(response.data.data);
                    dataObj.data = data;
                    client.setex(redisKey, 3600, redisValue);                //caching the response obtained from db
                    console.log(dataObj);
                    res.send(dataObj);
                  }

                })
                .catch(error => {
                  console.error(error);
                });
        }
      });
};

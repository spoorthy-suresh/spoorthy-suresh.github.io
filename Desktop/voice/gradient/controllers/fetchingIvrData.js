const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const { check, validationResult } = require('express-validator');
var empty = require('is-empty');


const client = require('../utils/redis').redisCon;
const Ivr = require('../model/IVRModel');
const msg = require('../utils/lang/messages');


exports.getIVRDetails = (req, res, next) => {

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
        "status" : msg.response['GRT100'].status,
        "message": msg.response['GRT100'].message
      };
      const redisKey = 'hexa_kapsule_ivr_' + id;

      client.get(redisKey, async function(err, result) {
        if(result){
          console.log('from cache');                              //fetching data from cache
          dataObj.data = result;
          res.send(dataObj);
        }
        else {
              var url =process.env.SURFACE_API_IVR + "?id={\"is\":" + id + "}";
              axios                                               //making api request to fetch data from db
                .get(url, {
                    "id" : "{\"is\"" + id + "}"
                })
                .then(response => {
                  console.log(response.data.data);
                  if(empty(response.data.data)){
                    dataObj.status = msg.response['GRT103'].status;
                    dataObj.message = msg.response['GRT103'].message;
                    res.send(dataObj);
                    return;
                  }
                  const redisValue = JSON.stringify(response.data.data).replace(/\\/g, '');
                  dataObj.data = redisValue;
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

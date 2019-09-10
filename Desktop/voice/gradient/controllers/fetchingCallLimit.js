const express = require('express');
const querystring = require('querystring');
const axios = require('axios');
const { check, validationResult } = require('express-validator');
var empty = require('is-empty');

const client = require('../utils/redis').redisCon;
const msg = require('../utils/lang/messages');

exports.getLimitById = (req,res,next) => {
  var dataObj = {
    "status" : msg.response['GRT111'].status,
    "message": msg.response['GRT111'].message
  };
  const accountId = req.query.customerId;
  const numberId = req.query.numberId;
  const channelId = req.query.channelId;

  if(accountId)
  {
    var account = 'hexa_kapsule_live_call_C:' + accountId;
    console.log(account);
    client.get(account, async function(err, result) {
          console.log(result);
          console.log('channel id from cache');
          var value = Number(result);
          dataObj.service = value;
          res.send(dataObj);
        });
  }
  else if(numberId)
  {
    var number = 'hexa_kapsule_live_call_N:'+numberId;
    console.log(number);
    client.get(number, async function(err, result) {
          console.log(result);
          console.log('channel id from cache');
          var value = Number(result);
          dataObj.service = value;
          res.send(dataObj);
        });
  }
  else if(channelId)
  {
    var channel = 'hexa_kapsule_live_call_CH:'+channelId;
    console.log(channel);
    client.get(channel, async function(err, result) {
          console.log(result);
          console.log('channel id from cache');
          var value = Number(result);
          dataObj.service = value;
          res.send(dataObj);
        });
  }
  else
  {
    dataObj = {
      "status" : msg.response['GRT112'].status,
      "message": msg.response['GRT112'].message         //handling missing Id parameter in request
    };
    res.send(dataObj);
  }
};

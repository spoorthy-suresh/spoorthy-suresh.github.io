const express = require('express');
const uuidv4 = require('uuid/v4');
const msg = require('../utils/lang/messages');

exports.createUUID = (req, res, next) => {
   
        const dataObj = {
          "status" : msg.response['GRT104'].status,
          "message": msg.response['GRT104'].message         
        };

        dataObj.id = uuidv4();                                 //unique id is generated

        if(!dataObj.id) {
            dataObj.status = msg.response['GRT105'].status;
            dataObj.message = msg.response['GRT105'].message;
            res.send(dataObj);
        }
        
        res.send(dataObj);  
};

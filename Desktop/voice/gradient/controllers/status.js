const querystring = require('querystring');
const axios = require('axios');

exports.getStatus = (req, res, next) => {
    axios
      .post(process.env.SURFACE_API, {
          "accountId" : req.body.accountId
      })
      .then(result => {
        console.log("statusCode:" + result.statusCode);
        console.log(result.data);
        res.send(result.data)
      })
      .catch(error => {
        console.error(error);
      });
};

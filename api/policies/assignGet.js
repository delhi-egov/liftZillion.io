/**
 * Created by dinesh3836 on 13-06-2016.
 */

var config = require('../../config');

var jsonwebtoken = require('jsonwebtoken');

module.exports = function (req, res, next) {


  var token = req.headers['access_token'];
  console.log("Assign GET");
  if (token) {
    jsonwebtoken.verify(token, config.superSecretDeputyInspector, function (err, decoded) {
      if (err) {

        jsonwebtoken.verify(token, config.superSecretInspector, function (err, decoded) {
          if (err) {

            jsonwebtoken.verify(token, config.superSecretAdmin, function (err, decoded) {
              if (err) {

                res.status(403).send({status: "failed", message: "Failed to authenticate"});
              } else {
                console.log("Admin");
                /*req.decoded = decoded;
                req.options.values = req.options.values || {};
                req.options.values.owner = decoded.id;*/
                next();
              }
            });
          } else {
            console.log("Inspector");
           /* req.decoded = decoded;
            req.options.values = req.options.values || {};
            req.options.values.owner = decoded.id;*/
            next();
          }
        });

      } else {
        console.log("Deputy inspector");
        /*req.decoded = decoded;
        req.options.values = req.options.values || {};
        req.options.values.owner = decoded.id;*/
        next();
      }
    });

  } else {
    res.status(403).send({status: "failed", message: "No Token Available"});
  }
};

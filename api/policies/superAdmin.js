/**
 * Created by dinesh3836 on 13-06-2016.
 */

var config = require('../../config');

var jsonwebtoken = require('jsonwebtoken');

module.exports = function (req, res, next) {


  var token = req.headers['access_token'];
  console.log("Super Admin");
  if (token == "temp") {
    next();
  } else {
    res.status(403).send({status: "failed", message: "Not Authorized"});
  }
};

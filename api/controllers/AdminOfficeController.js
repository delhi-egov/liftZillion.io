/**
 * AdminOfficeController
 *
 * @description :: Server-side logic for managing Adminoffices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var status = require("http-status-codes");

var jsonwebtoken = require('jsonwebtoken');
var config = require('./../../config');

function createToken(obj) {

  var token = jsonwebtoken.sign({
    id: obj.id,
    email: obj.email
  }, config.superSecretAdmin);
  return token;
}

module.exports = {
  login: function (req, res) {
    console.log("Login Admin");
    AdminOffice.findOne({email: req.body.email}).exec(function (err, obj) {

      if (!obj) {
        res.status(status.NOT_FOUND).json({status: "failed", message: "Unauthorised Access"});
      }
      else {
        /*Check Password*/
        if (obj.verifyPassword(req.body.password)) {
          res.json({
            status: "success",
            admin: obj,
            token: createToken(obj)
          });
        }
        else
          res.status(status.FORBIDDEN).json({status: "failed", message: "Unauthorised Access"});
      }

    });
  }
};


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
          console.log("-- admin_login --");
        }
        else
          res.status(status.FORBIDDEN).json({status: "failed", message: "Unauthorised Access"});
      }
    });
  },
  changePswd: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    if (req.body.oldPswd && req.body.newPswd) {
      var oldpswd = req.body.oldPswd;
      var newpswd = req.body.newPswd;
      AdminOffice.findOne({id: decoded.id}).exec(function change(err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "1"});
        } else {
          if (bcrypt.compareSync(oldpswd, obj.password)) {
            bcrypt.hash(newpswd, SALT_WORK_FACTOR, function (err, hash) {
              obj.password = hash;
              if (err) {
                res.status(403).send({status: "failed", message: "3"});
              } else {
                obj.save();
                res.status(status.ACCEPTED).send({status: "success", message: "password changed successfully"});
                console.log("## admin password changed  ##");
              }
            });
          } else {
            res.status(403).send({status: "failed", message: "2"});
          }
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "Insufficient Details"});
    }
  }
};


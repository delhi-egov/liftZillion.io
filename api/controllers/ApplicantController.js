/**
 * ApplicantController
 *
 * @description :: Server-side logic for managing Applicants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var status = require("http-status-codes");

var jsonwebtoken = require('jsonwebtoken');
var config = require('./../../config');

var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

function createToken(obj) {

  var token = jsonwebtoken.sign({
    id: obj.id,
    email: obj.email
  }, config.superSecretApplicant);
  return token;
}

module.exports = {
  login: function (req, res) {
    Applicant.findOne({email: req.body.email}).exec(function (err, obj) {

      if (!obj) {
        res.status(status.NOT_FOUND).json({status: "failed", message: "1"});
      }
      else {
        /*Check Password*/
        if (obj.verifyPassword(req.body.password)) {
          res.json({
            status: "success",
            applicant: obj,
            token: createToken(obj)
          });
          console.log("-- applicant_login --");
        }
        else
          res.status(status.FORBIDDEN).json({status: "failed", message: "2"});
      }

    });
  },
  changePswd: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    if (req.body.oldPswd && req.body.newPswd) {
      var oldpswd = req.body.oldPswd;
      var newpswd = req.body.newPswd;
      Applicant.findOne({id: decoded.id}).exec(function change(err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "2"});
        } else {
          if (bcrypt.compareSync(oldpswd, obj.password)) {
            bcrypt.hash(newpswd, SALT_WORK_FACTOR, function (err, hash) {
              obj.password = hash;
              if (err) {
                res.status(403).send({status: "failed", message: "4"});
              } else {
                obj.save();
                res.status(status.ACCEPTED).send({status: "success", message: "password changed successfully"});
                console.log("## applicant password changed  ##");
              }
            });
          } else {
            res.status(403).send({status: "failed", message: "3"});
          }
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "1"});
    }
  }
};


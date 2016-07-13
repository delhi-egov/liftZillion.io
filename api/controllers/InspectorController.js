/**
 * InspectorController
 *
 * @description :: Server-side logic for managing Inspectors
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
  }, config.superSecretInspector);
  return token;
}

module.exports = {
  login: function (req, res) {
    console.log("Login Inspector");
    Inspector.findOne({email: req.body.email}).exec(function (err, obj) {

      if (!obj) {
        res.status(status.NOT_FOUND).json({status: "failed", message: "Unauthorised Access"});
      }
      else {
        /*Check Password*/
        if (obj.verifyPassword(req.body.password)) {
          res.json({
            message: "success",
            inspector: obj,
            token: createToken(obj)
          });
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
      Inspector.findOne({id: decoded.id}).exec(function change(err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "No Such Inspector"});
        } else {
          if (bcrypt.compareSync(oldpswd, obj.password)) {
            bcrypt.hash(newpswd, SALT_WORK_FACTOR, function (err, hash) {
              obj.password = hash;
              if (err) {
                res.status(403).send({status: "failed", message: "Error while changing password"});
              } else {
                obj.save();
                res.status(status.ACCEPTED).send({status: "success", message: "password changed successfully"});
              }
            });
          } else {
            res.status(403).send({status: "failed", message: "Incorrect Password"});
          }
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "Insufficient Details"});
    }
  },
  fetchAssignedForms: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    Assign.find({assocInspector: decoded.id}).populate('assocForm').exec(function getAssigned(err, obj) {
      res.status(status.ACCEPTED).send(obj);
    });
  },
  submitReport: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    var assignId = req.body.assignId;
    var completedOn = req.body.completedOn;
    var reportId = '';
    if (assignId && completedOn) {
      req.body.assocInspector = decoded.id;
      InspectorReport.create(req.body).exec(function createReport(err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "Report Submission Failed"});
        } else {
          reportId = obj;
          Assign.findOne({id: assignId}).exec(function (err, assign) {
            if (err) {
              res.status(403).send({status: "failed", message: "Report Submission Failed 2"});
            } else {
              assign.status = 'completed';
              assign.completedOn = completedOn;
              assign.assocReport = reportId;
              assign.save();
              res.status(status.ACCEPTED).send({status: "success", message: "report Submission Success"});
            }
          });
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "Insufficient Details"});
    }
  },
  schedule: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    var assignId = req.body.assignId;
    var scheduledDate = req.body.scheduledDate;
    var reportId = '';
    if (assignId && scheduledDate) {
      Assign.findOne({id: assignId}).exec(function (err, assign) {
        if (err) {
          res.status(403).send({status: "failed", message: "Report Submission Failed 2"});
        } else {
          assign.status = 'scheduled';
          assign.scheduledDate = scheduledDate;
          assign.save();
          res.status(status.ACCEPTED).send({status: "success", message: "Inspection Schedule Success"});
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "Insufficient Details"});
    }
  }
};


/**
 * DeputyInspectorController
 *
 * @description :: Server-side logic for managing Deputyinspectors
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
  }, config.superSecretDeputyInspector);
  return token;
}

module.exports = {
  login: function (req, res) {
    DeputyInspector.findOne({email: req.body.email}).exec(function (err, obj) {

      if (!obj) {
        res.status(status.NOT_FOUND).json({status: "failed", message: "1"});
      }
      else {
        /*Check Password*/
        if (obj.verifyPassword(req.body.password)) {
          console.log("-- deputy_login : " + obj.id + " --");
          res.json({
            message: "success",
            deputyInspector: obj,
            token: createToken(obj)
          });
        }
        else
          res.status(status.FORBIDDEN).json({status: "failed", message: "2"});
      }

    });
  },
  assignForm: function (req, res) {

    //Sample Data
    /* {
     "assocForm":1,
     "assocInspector":1
     }*/

    var decoded = jsonwebtoken.decode(req.headers.access_token);
    req.body.assocDeputyId = decoded.id;
    Assign.create(req.body).exec(function createCB(err, created) {
      if (err) {
        res.status(403).send({status: "failed", message: "1"});
      } else {
        FormA.findOne({id: req.body.assocForm}).exec(function updateForm(err, obj) {
          if (err) {
            res.status(403).send({status: "failed", message: "2"});
          } else {
            obj.status = 'assigned';
            obj.save();
            console.log("-- deputy_assigned_form  --");
            res.status(status.ACCEPTED).send({status: "success", message: "Form Assigned Successfully"});
          }
        });
      }
    });
  },
  confirmForm: function (req, res) {
    //Sample Data
    /*{
     assocForm:1
     }*/
    if (req.body.assocForm) {
      FormA.findOne({id: req.body.assocForm}).exec(function confrmForm(err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "2"});
        } else {
          obj.status = 'confirmed';
          obj.save();
          console.log("-- deputy_confirmed_form : " + obj.id + "  --");
          res.status(status.ACCEPTED).send({status: "success", message: "Form Confirmed Successfully"});
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "1"});

    }
  },
  rejectForm: function (req, res) {
    //Sample Data
    /*{
     assocForm:1
     }*/
    console.log("Deputy Rejecting Form");
    if (req.body.assocForm) {
      FormA.findOne({id: req.body.assocForm}).exec(function confrmForm(err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "Form Rejection Failed"});
        } else {
          obj.status = 'rejected';
          obj.save();
          res.status(status.ACCEPTED).send({status: "success", message: "Form Rejected Successfully"});
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "Form Rejection Failed, no Data"});
    }
  },
  recheckForm: function (req, res) {
    //Sample Data
    /* {
     "assocForm":1,
     "assocInspector":1
     }*/
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    req.body.assocDeputyId = decoded.id;
    Assign.create(req.body).exec(function createCB(err, created) {
      if (err) {
        console.log('Form Recheck failed');
        res.status(403).send({status: "failed", message: "Form Assign Failed"});
      } else {
        console.log('Form Recheck Success');
        FormA.findOne({id: req.body.assocForm}).exec(function updateForm(err, obj) {
          if (err) {
            console.log("Form status update failed");
            res.status(403).send({status: "failed", message: "Form Assign Failed"});
          } else {
            obj.status = 'recheck';
            obj.save();
            console.log("Form status updated");
            res.status(status.ACCEPTED).send({status: "success", message: "Form recheck assigned successfully"});
          }
        });
      }
    });
  },
  changePswd: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    if (req.body.oldPswd && req.body.newPswd) {
      var oldpswd = req.body.oldPswd;
      var newpswd = req.body.newPswd;
      DeputyInspector.findOne({id: decoded.id}).exec(function change(err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "No Such Deputy Inspector"});
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
  fetchCompletedReport: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    var assignId = req.body.assignId;
    if (assignId) {
      Assign.findOne({id: assignId, status: 'completed'}).populate('assocReport').exec(function (err, obj) {
        if (err) {
          res.status(403).send({status: "failed", message: "Form not Available"});
        } else {
          res.status(status.ACCEPTED).send(obj);
        }
      });
    } else {
      res.status(403).send({status: "failed", message: "1"});
    }
  },
  fetchForms: function (req, res) {
    FormA.find().exec(function (err, obj) {
      if (err) {
        res.status(403).send({status: "failed", message: "Form not Available"});
      } else {
        res.status(status.ACCEPTED).send(obj);
      }
    });
  },
  fetchAssigned: function (req, res) {
    var decoded = jsonwebtoken.decode(req.headers.access_token);
    Assign.find({assocDeputyId: decoded.id}).populate('assocInspector', 'assocReport').exec(function (err, obj) {
      if (err) {
        res.status(403).send({status: "failed", message: "No Form Assigned"});
      } else {
        res.status(status.ACCEPTED).send(obj);
      }
    });
  }
};


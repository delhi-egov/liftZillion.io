/**
 * Applicant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: 'String',
      required: true
    },

    assocForm: {
      collection: 'forma',
      via: 'assocApplicant'
    },
    verifyPassword: function (password) {
      if (password === undefined)
        return false;
      var status = bcrypt.compareSync(password, this.password);
      return status;
    }
  },
  beforeCreate: function (attrs, callback) {
    if (attrs.password) {
      bcrypt.hash(attrs.password, SALT_WORK_FACTOR, function (err, hash) {
        attrs.password = hash;

        /* DeputyInspector.create({
         name: 'ZZZZ',
         email: 'ZZZxxZ@zillion.io',
         phone: '999999999',
         password: 'ZZZZ123'
         }).exec(function createCB(err, created) {
         console.log('Created user with name ' + created);
         });*/

        return callback();
      });
    }
    else
      return callback();


  }
};


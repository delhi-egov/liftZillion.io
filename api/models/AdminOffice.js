/**
 * AdminOffice.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
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
        return callback();
      });
    }
    else
      return callback();
  }
};


/**
 * Assign.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    assocDeputyId: {
      model: 'deputyinspector',
      required: true
    },

    assocForm: {
      model: 'forma',
      required: true
    },

    assocInspector: {
      model: 'inspector',
      required: true
    },

    inspectorStatus: {
      type: 'string',
      enum: ['pending', 'accepted', 'completed'],
      defaultsTo: 'pending'
    }
  }
};


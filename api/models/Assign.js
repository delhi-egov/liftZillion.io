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

    status: {
      type: 'string',
      enum: ['pending', 'scheduled', 'completed'],
      defaultsTo: 'pending'
    },

    scheduledDate: {
      type: 'string'
    },

    completedOn: {
      type: 'string'
    },

    assocReport: {
      model: 'inspectorReport'
    }
  }
};


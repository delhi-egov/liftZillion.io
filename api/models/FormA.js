/**
 * FormA.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    applicant_name: {
      type: 'string',
      required: true
    },

    applicant_address: {
      type: 'string',
      required: true
    },

    agent_name: {
      type: 'string'
    },

    agent_address: {
      type: 'string'
    },

    previous_license: {
      type: 'string'
    },

    firm_name: {
      type: 'string',
      required: true
    },

    firm_address: {
      type: 'string',
      required: true
    },

    lift_type: {
      type: 'string',
      required: true
    },

    lift_speed_max: {
      type: 'string',
      required: true
    },

    lift_capacity_weight: {
      type: 'float',
      required: true
    },

    lift_total_weight: {
      type: 'float',
      required: true
    },

    max_passengers: {
      type: 'float',
      required: true
    },

    weight_counter: {
      type: 'float'
    },

    description_weight_num: {
      type: 'integer'
    },

    supporting_cable_description: {
      type: 'string',
      required: true
    },

    supporting_cable_weight: {
      type: 'float',
      required: true
    },

    supporting_cable_size: {
      type: 'float',
      required: true
    },

    depth_pit: {
      type: 'float',
      required: true
    },

    top_clearance: {
      type: 'float',
      required: true
    },

    bottom_clearance: {
      type: 'float',
      required: true
    },

    overhead_arrangement: {
      type: 'string',
      required: true
    },

    number_of_stops: {
      type: 'string',
      required: true
    },

    contact_person_name: {
      type: 'string',
      required: true
    },

    contact_person_number: {
      type: 'string',
      required: true
    },

    drawings_path: {
      type: 'array'
    },

    assocApplicant: {
      model: 'applicant'
    },

    status: {
      type: 'string',
      enum: ['pending', 'assigned', 'rejected', 'recheck', 'confirmed'],
      defaultsTo: 'pending'
    },

    isReportReceived: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  beforeCreate: function (attrs, callback) {
    console.log(attrs);
    return callback();
  }
};

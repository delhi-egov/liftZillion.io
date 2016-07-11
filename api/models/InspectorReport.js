/**
 * InspectorReport.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    file_num: {
      type: 'string'
    },
    date_of_inspection: {
      type: 'string'
    },
    applicant_name: {
      type: 'string'
    },
    applicant_address: {
      type: 'string'
    },
    site_address: {
      type: 'string'
    },
    is_new_lift: {
      type: 'boolean'
    },
    firm_name: {
      type: 'string'
    },
    lift_type: {
      type: 'string'
    },
    max_person: {
      type: 'integer'
    },
    num_of_stop: {
      type: 'integer'
    },
    depth_of_pit: {
      type: 'integer'
    },
    overhead_clearance: {
      type: 'float'
    },
    height_mc_room: {
      type: 'float'
    },
    shaft_width: {
      type: 'float'
    },
    shaft_height: {
      type: 'float'
    },
    door_width: {
      type: 'float'
    },
    door_height: {
      type: 'float'
    },
    other: {
      type: 'string'
    },
    remark: {
      type: 'string'
    },
    assocInspector: {
      model: 'inspector',
      required: true
    }
  }
}
;


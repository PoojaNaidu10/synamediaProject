'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId

var fields = {
  user: {},
  doctor: {},
  status: { type: String, default: "CREATED"},  //CREATED or CANCELED  COMPLETED 
  appointment_time: { type: String },
  
};

var bookingSchema = new Schema(fields, {timestamps: true});

module.exports = mongoose.model('Booking' , bookingSchema);

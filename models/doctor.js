'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId

var fields = {
name: { type: String },
email: { type: String },
time_slot:["10:00 AM - 11:00 AM","12:15 PM - 01:15 PM"]
};

var doctorSchema = new Schema(fields, {timestamps: true});

module.exports = mongoose.model('Doctor', doctorSchema);

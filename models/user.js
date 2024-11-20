'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId

var fields = {
first_name: { type: String },
last_name: { type: String },
email: { type: String }
};

var userSchema = new Schema(fields, {timestamps: true});

module.exports = mongoose.model('User', userSchema);

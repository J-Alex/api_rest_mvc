'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemas = {
	todoSchema: new Schema({
		text: {type: String}
	})
};

module.exports = schemas;
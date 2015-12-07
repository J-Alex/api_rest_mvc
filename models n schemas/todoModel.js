'use strict';

var mongoose = require('mongoose');
var todoSchema = require('./todoSchema').todoSchema;

var models = {
	Todo: mongoose.model('Todo',todoSchema)
};

module.exports = models;
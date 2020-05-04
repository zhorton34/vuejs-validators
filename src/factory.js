'use strict';

const Validator = require('./validator');

const Factory =  function (translator = {}) {
	this.translator = translator;
};

Factory.prototype.make = function (
	data = {},
	rules = {},
	messages = {},
	customAttributes = {}
) {
	this.validator = new Validator(data, rules, messages, customAttributes);
	return this
};

Factory.prototype.validate = function () {
	console.log('factory validates: ', this.validate);
};

module.exports = Factory;

'use strict';

const Validator = require('./validator');

const Factory = function (
	data = {},
	rules = {},
	messages = {},
	translator = {}
) {};

Factory.prototype.make = function (
	data = {},
	rules = {},
	messages = {},
	translator = {}
) {
	return (new Validator()).make(data, rules, messages, translator);
};

Factory.prototype.register = function (
	data = {},
	rules = {},
	messages = {},
	translator = {}
) {
	return (new Validator()).make(data, rules, messages, translator);
};

module.exports = Factory;

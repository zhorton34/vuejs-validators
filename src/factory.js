'use strict';

const Validator = require('./validator');

const Factory = function () {};

Factory.prototype.make = function (
	data = {},
	rules = {},
	messages = {},
	translator = {}
) {
	return (new Validator()).make(data, rules, messages, translator);
};

Factory.prototype.validate = function ()
{
	this.validator.errors = this.validator.checks.reduce(
		(errors, { attribute, rule, message }) => ({
			...errors,
			[attribute]: rule()
				? [...(errors[attribute] || [])]
				: [...(errors[attribute] || []), message()],
		}),
	{});
};

Factory.prototype
module.exports = Factory;

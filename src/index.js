'use strict';

const Factory = require('./factory');

const validator = (
	data = {},
	rules = {},
	messages = {}
) => (new Factory()).make(data, rules, messages);

validator(
	{ name: 'zak', email: 'zak.horton@cleancode.studio' },
	{
		name: ['required', 'max:8', 'within:tim,sarah,jimmy'],
		email: ['email', 'min:7', 'required'],
	},
	{
		'name.required': ':attribute is a required field',
		'name.max': ':attribute may not be more than :max',

		'email.within': ':attribute not found :within',
		'email.required': ':attribute is a required field',
		'email.email': ':attribute must be an email address',
		'email.min': ':attribute can not be less than :min characters',
	}
);

module.exports = validator;
module.exports.Validator = Factory;
module.exports.default = validator;
module.exports.validator = validator;

const isBool = require('./helpers/isBool');
const isNull = require('./helpers/isNull');
const isBooly = require('./helpers/isBooly');
const isFalsy = require('./helpers/isFalsy');
const isEmpty = require('./helpers/isEmpty');
const isString = require('./helpers/isString');
const isNumber = require('./helpers/isNumber');
const isTruthy = require('./helpers/isTruthy');
const isNotNull = require('./helpers/isNotNull');
const isNumeric = require('./helpers/isNumeric');
const isNotEmpty = require('./helpers/isNotEmpty');
const isUndefined = require('./helpers/isUndefined');
const isNotNumeric = require('./helpers/isNotNumeric');
const isNotUndefined = require('./helpers/isNotUndefined');

module.exports = {
	lte: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) <= Number(parameters[0]),
	gte: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) >= Number(parameters[0]),
	less_than: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) < Number(parameters[0]),
	greater_than: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) > Number(parameters[0]),
	date: ({ value }) => new Date(value) != 'Invalid Date',
	date_equals: ({ value, parameters }) => Date.parse(value) === Date.parse(parameters[0]),
	before: ({ value, parameters }) => Date.parse(value) < Date.parse(parameters[0]),
	after: ({ value, parameters }) => Date.parse(value) > Date.parse(parameters[0]),
	before_or_equal: ({ value, parameters }) => Date.parse(value) <= Date.parse(parameters[0]),
	after_or_equal: ({ value, parameters }) => Date.parse(value) >= Date.parse(parameters[0]),
	boolean: ({ value }) => isBooly(value),
	number: ({ value }) => isNumber(value),
	numeric: ({ value }) => isNumeric(value),
	accepted: ({ value }) => isTruthy(value),
	ends_with: ({ value, parameters: [list] }) => isString(value) && list.split(',').some(check => value.endsWith(check)),
	starts_with: ({ value, parameters: [list] }) => isString(value) && list.split(',').some(check => value.startsWith(check)),
	same: ({ value, parameters, validator }) => value === validator.data[parameters[0]],
	min: ({ value, parameters }) => value.length >= parameters[0],
	max: ({ value, parameters }) => value.length <= parameters[0],
	within: ({ value, parameters }) => parameters[0].split(',').includes(value),
	not_within: ({ value, parameters }) => !parameters[0].split(',').includes(value),
	email: ({ value }) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value)),
	phone: ({ value }) => /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value),
	required: ({ value }) => true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value)),
	regex: ({ value, parameters }) => parameters[0].test(value),
	not_regex: ({ value, parameters }) => !parameters[0].test(value),
	url: ({ value }) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(value),
	alpha: ({ value }) => /^[a-zA-Z]*$/.test(value),
	alpha_dash: ({ value }) => /^[a-zA-Z0-9-_]+$/.test(value),
	alpha_num: ({ value }) => /^[a-zA-Z0-9]*$/.test(value),
	array: ({ value }) => Array.isArray(value),
	string: ({ value }) => isString(value),
	distinct: ({ value }) => Array.isArray(value) && (new Set(value)).size === value.length,
	integer: ({ value }) => !isNaN(Number(value)) && isNumeric(value) && Number.isInteger(Number(value)),
	different: ({ value, parameters, validator }) => value !== validator.data[parameters[0]],
	confirmed: ({ attribute, value, validator }) => Object.keys(validator.data).includes(`${attribute}_confirmation`) && value === validator.data[`${attribute}_confirmation`],
	ip: ({ value }) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) ||  /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value),
	ipv4: ({ value }) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value),
	ipv6: ({ value }) => /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value),
	between: ({ value, parameters: [between] }) => {
		const [lower, upper] = between.split(',');

		return Boolean(Number(lower) < Number(value) && Number(upper) > Number(value));
	},
	json: ({ value }) => {
		value = typeof value !== "string" ? JSON.stringify(value) : value;

		try { value = JSON.parse(value); } catch (e) { return false }

		return typeof value === "object" && value !== null;
	},
	digits: ({ value, parameters: [length] }) => isNumeric(value) && String(value).length === Number(length) && !isNaN(Number(value)),
	digits_between: ({ value, parameters: [between] }) => {
		const [lower, upper] = between.split(',');

		if (isNaN(Number(value)) || !isNumeric(value)) return false;

		const check = Number(String(value).length);

		return Boolean(Number(lower) < check && Number(upper) > check);
	},
};

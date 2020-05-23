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







const requires = context => ({
	if: (fn, inject = {}) => {
		const isRequiredField = typeof fn === 'function'
			? fn({
				...inject,
				...context,
				form: context.validator.data,
				rule: {
					on: context.attribute,
					raw: context.validator.parseRules[context.attribute],
					...resolve(context.parameters)
				},
				fields: Object.keys(context.validator.data) })
			: fn;

		if (Boolean(isRequiredField) === false) {
			return true;
		} else {
			const valuePassesRequiredFieldRule = Object.keys
				(context.validator.data).includes(context.attribute)
					&& isNotNull(context.value)
					&& isNotUndefined(context.value)
					&& isNotEmpty(context.value);

			console.log('zak test: ', { valuePassesRequiredFieldRule });

			return valuePassesRequiredFieldRule;
		}
	}
});

/*------------------------------------------------------------------
 |  Resolving Validation Rule Parameters
 *------------------------------------------------------------------
 |
 |  . Goal: Parse Rule's String Value, "Resolving" Its Parameters
 |  . What: The what we're resolving are are rule parameters
 |  . From: String ~ We're resolving params from strings
 |  . Then: Arrays ~ We're returning parameterized []s
 |
 |  @Example "required_with:password,email"
 |  @Output ["password", "email"]
 |
 */
const resolve = parameters => {
	let infinityProtector = 0;

	while((Array.isArray(parameters) || (parameters[0] ? Array.isArray(parameters[0]) : false)) && infinityProtector < 5) {
		if (typeof parameters[0] === 'undefined') {
			infinityProtector = 5;
		} else {
			parameters = parameters[0];
		}

		infinityProtector++;
	}

	if (parameters.includes(':')) {
		parameters = parameters.split(':');
	}

	if (parameters.includes(',')) {
		parameters = parameters.split(',');
	}

	let parameterized = {
		first: () => parameters[0],
		second: () => parameters[1],
		after: start => parameters.slice(start),
		before: last => parameters.slice(0, last),
		between: (start, end) => parameters.slice(start, end),
		last: () => parameters[parameters.length],
		count: () => parameters.length,
		list: () => parameters,
		requireLength: (rule, count) => {
			if (parameters.length < count) {
				throw new Error(`Validation ${rule} $rule requires at least $count parameters.`);
			}

			return parameterized;
		}
	};
};

let ValidatesAttributes = {
	validateRequired(attribute, value)
	{
		if (isNull(value)) {
			return false;
		} else if (isString(value) && value.trim() === '') {
			return false;
		} else if ((Array.isArray(value) || typeof value.length !== 'undefined' && value.length < 1)) {
			return false;
		}
		// @TODO add file type to required
		// else if (value typeof file) { return file path !== '' }
		return true;
	},

	validateBail()
	{
		return true;
	},
};


/** @SEE https://github.com/laravel/framework/blob/7.x/src/Illuminate/Validation/Concerns/ValidatesAttributes.php */
module.exports = {
	/** Context Of Global Validation Is Needed
	// bail
	// sometimes
	 */
	required_unless: context => requires(context).if(({ form, rule: { first, second } }) => form[first()] != form[second()]),
	required_with: context => requires(context).if(({ rule, fields }) => fields.some(field => rule.list().includes(field))),
	required_without: context => requires(context).if(({ rule, fields }) => fields.some(field => !rule.list().includes(field))),
	required_with_all: context => requires(context).if(({ rule, fields }) => fields.every(field => rule.list().includes(field))),
	required_without_all: context => requires(context).if(({ rule, fields }) => fields.every(field => !rule.list().includes(field))),
	required: context => requires(context).if(() => true),
	required_if: context => requires(context).if(({ form, rule }) => {
		console.log({ form, rule, zak: 'test' });

		const condition = form[rule.first()] == form[rule.second()];
		console.log({ condition });
	}),

	/** Another Form Field & Rule Parameters Are Needed **/
	same: ({ value, parameters, validator }) => value === validator.data[parameters[0]],
	different: ({ value, parameters, validator }) => value !== validator.data[parameters[0]],
	confirmed: ({ attribute, value, validator }) => Object.keys(validator.data).includes(`${attribute}_confirmation`) && value === validator.data[`${attribute}_confirmation`],


	/** Parameters Needed **/
	regex: ({ value, parameters }) => parameters[0].test(value),
	not_regex: ({ value, parameters }) => !parameters[0].test(value),
	ends_with: ({ value, parameters: [list] }) => isString(value) && list.split(',').some(check => value.endsWith(check)),
	starts_with: ({ value, parameters: [list] }) => isString(value) && list.split(',').some(check => value.startsWith(check)),
	min: ({ value, parameters }) => value.length >= parameters[0],
	max: ({ value, parameters }) => value.length <= parameters[0],
	within: ({ value, parameters }) => parameters[0].split(',').includes(value),
	not_within: ({ value, parameters }) => !parameters[0].split(',').includes(value),
	lte: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) <= Number(parameters[0]),
	gte: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) >= Number(parameters[0]),
	less_than: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) < Number(parameters[0]),
	greater_than: ({ value, parameters }) => isNumeric(value) && isNumeric(parameters[0]) && Number(value) > Number(parameters[0]),
	date_equals: ({ value, parameters }) => Date.parse(value) === Date.parse(parameters[0]),
	before: ({ value, parameters }) => Date.parse(value) < Date.parse(parameters[0]),
	after: ({ value, parameters }) => Date.parse(value) > Date.parse(parameters[0]),
	before_or_equal: ({ value, parameters }) => Date.parse(value) <= Date.parse(parameters[0]),
	after_or_equal: ({ value, parameters }) => Date.parse(value) >= Date.parse(parameters[0]),
	between: ({ value, parameters: [between] }) => {
		const [lower, upper] = between.split(',');

		return Boolean(Number(lower) < Number(value) && Number(upper) > Number(value));
	},
	digits: ({ value, parameters: [length] }) => isNumeric(value) && String(value).length === Number(length) && !isNaN(Number(value)),
	digits_between: ({ value, parameters: [between] }) => {
		const [lower, upper] = between.split(',');

		if (isNaN(Number(value)) || !isNumeric(value)) return false;

		const check = Number(String(value).length);

		return Boolean(Number(lower) < check && Number(upper) > check);
	},
	json: ({ value }) => {
		value = typeof value !== "string" ? JSON.stringify(value) : value;

		try { value = JSON.parse(value); } catch (e) { return false }

		return typeof value === "object" && value !== null;
	},
	date: ({ value }) => new Date(value) != 'Invalid Date',
	boolean: ({ value }) => isBooly(value),
	number: ({ value }) => isNumber(value),
	numeric: ({ value }) => isNumeric(value),
	accepted: ({ value }) => isTruthy(value),
	email: ({ value }) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value)),
	phone: ({ value }) => /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value),
	url: ({ value }) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(value),
	alpha: ({ value }) => /^[a-zA-Z]*$/.test(value),
	alpha_dash: ({ value }) => /^[a-zA-Z0-9-_]+$/.test(value),
	alpha_num: ({ value }) => /^[a-zA-Z0-9]*$/.test(value),
	array: ({ value }) => Array.isArray(value),
	string: ({ value }) => isString(value),
	distinct: ({ value }) => Array.isArray(value) && (new Set(value)).size === value.length,
	integer: ({ value }) => !isNaN(Number(value)) && isNumeric(value) && Number.isInteger(Number(value)),
	ip: ({ value }) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) ||  /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value),
	ipv4: ({ value }) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value),
	ipv6: ({ value }) => /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value),
};

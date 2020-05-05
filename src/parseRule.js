const isArray = require('./helpers/isArray');
const isObject = require('./helpers/isObject');

module.exports = function ParseRule (validator, field, rules) {

	return pipe(field, validator, rules).into(([
		attribute,
		value,
		parameters,
		rule,
		name,
   ]) => ({
			attribute,
			value,
			parameters,
			rule,
			name,
			message: () => resolveMessage({
				name,
				attribute,
				parameters,
				validator
			}),
			validator,
		})
	);
};

const resolveMessage = ({ attribute, name, validator,  parameters }) => {
	const { customMessages: custom, messages: global } = validator;

	/**
	 * Example: Replacers
	 * ~~~~~~~~~~~~~~~~~~
	 * ":attribute must not be greater than :max characters"
	 * let replacers = ['field_name', '8']
	 * "field_name must not be greater than 8 characters"
	 */
	return [
		attribute,
		...(parameters[0] ? parameters[0].split(',') : [])
	].reduce(
		(message, replace) => message.replace(/:[a-z]{1,}/i, replace),
		custom[`${attribute}.${name}`] ? custom[`${attribute}.${name}`] : global[name]
	);
};

const pipe = (field, validator, rules) => {
	let array = Array.isArray(rules) ? rules : rules.split('|');

	return {
		into: shape => array
			.map(item => item.split(':'))
			.map(([rule, ...args]) => [
				field,
				validator.data[field],
				args,
				validator.rules[rule],
				rule,
			])
			.map(shape)
	};
};

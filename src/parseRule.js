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
			message: () => resolveMessage({ name, attribute, parameters, validator }),
			validator,
		})
	);
};

const resolveMessage = ({ attribute, name, validator,  parameters }) => {
	const { customMessages: custom, messages: global } = validator;

	const message = custom[`${attribute}.${name}`]
		? custom[`${attribute}.${name}`].replace(/:attribute/gi, attribute)
		: global[name].replace(/:attribute/gi, attribute);

	return parameters[0]
		? message.replace(`:${name}`, parameters[0])
		: message;
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

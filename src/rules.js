const isBool = require('./helpers/isBool');
const isNull = require('./helpers/isNull');
const isBooly = require('./helpers/isBooly');
const isFalsy = require('./helpers/isFalsy');
const isEmpty = require('./helpers/isEmpty');
const isNumber = require('./helpers/isNumber');
const isTruthy = require('./helpers/isTruthy');
const isNotNull = require('./helpers/isNotNull');
const isNumeric = require('./helpers/isNumeric');
const isNotEmpty = require('./helpers/isNotEmpty');
const isUndefined = require('./helpers/isUndefined');
const isNotNumeric = require('./helpers/isNotNumeric');
const isNotUndefined = require('./helpers/isNotUndefined');

module.exports = {
	boolean: ({ value }) => isBooly(value),
	number: ({ value }) => isNumber(value),
	numeric: ({ value }) => isNumeric(value),
	accepted: ({ value }) => isTruthy(value),
	same: ({ value, parameters, validator }) => value === validator.data[parameters[0]],
	min: ({ value, parameters }) => value.length >= parameters[0],
	max: ({ value, parameters }) => value.length <= parameters[0],
	within: ({ value, parameters }) => parameters[0].split(',').includes(value),
	email: ({ value }) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value)),
	phone: ({ value }) => /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value),
	required: ({ value }) => true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value)),
};

const isNull = require('./isNull');
const isArray = require('./isArray');

/**
 * Determine if a value is a keyed object
 *
 * @param value
 * @returns boolean
 */
module.exports = function (value) {
	return !isNull(value) && !isArray(value) && typeof value === 'object';
};


'use strict';

const isBool = require('./isBool');
const isFalsy = require('./isFalsy');
const isTruthy = require('./isTruthy');

/**
 * Determine if a value is boolean, truthy, or falsy
 *
 * @param value
 * @returns boolean
 */
module.exports = function (value) {
	return isBool(value) || isFalsy(value) || isTruthy(value);
};

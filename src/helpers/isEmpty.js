
'use strict';

const isBooly = require('./isBooly');
const isNumeric = require('./isNumeric');

/**
 * Determine if a value is empty
 *
 * @param value
 * @returns boolean
 */
module.exports = function (value) {
	if (value === null || value === '') return true;
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === 'object') return Object.keys(value).length === 0;

	if (isNumeric(value) || isBooly(value)) return false;

	return true;
};

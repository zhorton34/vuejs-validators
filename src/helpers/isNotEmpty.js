
'use strict';

const isEmpty = require('./isEmpty');
/**
 * Determine if a value is empty
 *
 * @param value
 * @returns boolean
 */
module.exports = function (value) {
	return isEmpty(value) === false;
};

"use strict";

var isNumber = require('./isNumber');

var isBigInt = require('./isBigInt');
/**
 * Determine if a value is numeric (a number when casted to a number)
 *
 * @param value
 * @returns boolean
 */


module.exports = function (value) {
  return isNumber(value) || typeof Number(value) === 'number' || isBigInt(value);
};
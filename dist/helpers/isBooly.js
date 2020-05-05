'use strict';

var isBool = require('./isBool');

var isFalsy = require('./isFalsy');

var isTruthy = require('./isTruthy');
/**
 * Determine if a value is boolean, truthy, or falsy
 *
 * @param value
 * @returns boolean
 */


module.exports = function (value) {
  return isBool(value) || isFalsy(value) || isTruthy(value);
};
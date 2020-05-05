"use strict";

var isBigInt = require('./isBigInt');
/**
 * Determine if a value is NOT numeric
 *
 * @param value
 * @returns boolean
 */


module.exports = function (value) {
  return Number.isNaN(Number(value)) && !isBigInt(value);
};
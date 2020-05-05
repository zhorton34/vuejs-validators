"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isNull = require('./isNull');

var isArray = require('./isArray');
/**
 * Determine if a value is a keyed object
 *
 * @param value
 * @returns boolean
 */


module.exports = function (value) {
  return !isNull(value) && !isArray(value) && _typeof(value) === 'object';
};
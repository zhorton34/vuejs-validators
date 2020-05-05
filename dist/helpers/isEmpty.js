'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isBooly = require('./isBooly');

var isNumeric = require('./isNumeric');
/**
 * Determine if a value is empty
 *
 * @param value
 * @returns boolean
 */


module.exports = function (value) {
  if (value === null || value === '') return true;
  if (Array.isArray(value)) return value.length === 0;
  if (_typeof(value) === 'object') return Object.keys(value).length === 0;
  if (isNumeric(value) || isBooly(value)) return false;
  return true;
};
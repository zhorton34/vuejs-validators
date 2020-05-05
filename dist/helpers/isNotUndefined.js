'use strict';
/**
 * Determine if a value is undefined, if so return false
 *
 * @param value
 * @returns boolean
 */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (value) {
  return _typeof(value) !== undefined && typeof value !== 'undefined';
};
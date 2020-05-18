'use strict';
/**
 * Set all messages or optionally set single fields array of messages.
 *
 * @param field
 * @param value (optional)
 *
 * @return void
 */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (field) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (_typeof(field) === 'object') {
    this.messages = field;
  } else {
    this.messages[field] = value;
  }
};
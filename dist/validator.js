"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RULES = require('./rules');

var MESSAGES = require('./messages');

var Validator = function Validator() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var customAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  this.data = this.parseData(data);
  this.rules = _objectSpread(_objectSpread({}, RULES), rules);
  this.messages = _objectSpread(_objectSpread({}, MESSAGES), messages);
  this.customAttributes = customAttributes;
};

Validator.prototype.parseData = require('./methods/parseData');
module.exports = Validator;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RULES = require('./rules');

var MESSAGES = require('./messages');

var ParseRule = require('./parseRule');

var makeErrorBag = require('./errors');

var variadic = require('./helpers/variadic');

var Validator = function Validator() {
  this.translator = {};
  this.data = {};
  this.rules = _objectSpread({}, RULES);
  this.errorBag = makeErrorBag(this);
  this.messages = _objectSpread({}, MESSAGES);
  this.afterValidationCallbacks = [];
  this.beforeValidationCallbacks = [];
  this.failedValidationCallbacks = [];
  this.passedValidationCallbacks = [];
};

Validator.prototype.parseData = require('./methods/parseData');

Validator.prototype.errors = function () {
  return this.errorBag;
};
/**
 * Register (Alias of make)
 *
 * @param parameters
 * @returns {Validator}
 */


Validator.prototype.register = Validator.prototype.make;
/**
 * Make Validator
 *
 * @param data
 * @param rules
 * @param messages
 * @param translator
 * @returns {Validator}
 */

Validator.prototype.make = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var translator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  this.parseRules = rules;
  this.translator = translator;
  this.customMessages = messages;
  this.data = this.parseData(data);
  return this;
};

Validator.prototype.addMessage = function (field, value) {
  try {
    this.customMessages[field] = value;
  } catch (_unused) {
    console.error("Was not able to add validation customMessages[".concat(field, "]: ").concat(value));
  }

  return this;
};

Validator.prototype.addRule = function (field, value) {
  try {
    this.parseRules[field] = value;
  } catch (_unused2) {
    console.error("Was not able to add validation parseRules[".concat(field, "]: ").concat(value));
  }

  return this;
};

Validator.prototype.addData = function (field, value) {
  try {
    this.data[field] = value;
  } catch (_unused3) {
    console.error("Was not able to add validation data[".concat(field, "]: ").concat(value));
  }

  return this;
};
/**
 * Set Data Being Validated
 *
 * @param data
 * @returns {Validator}
 */


Validator.prototype.setData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.data = data;
  return this;
};
/**
 * Set Validation Rules
 *
 * @param rules
 * @returns {Validator}
 */


Validator.prototype.setRules = function () {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.rules = rules;
  return this;
};
/**
 * Set Validation Messages
 *
 * @param messages
 * @returns {Validator}
 */


Validator.prototype.setMessages = function () {
  var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.customMessages = messages;
  return this;
};
/**
 * Extend Validator With Custom Rules
 * @param parameters
 * @returns {Validator}
 */


Validator.prototype.extend = function () {
  var _this = this;

  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }

  parameters = variadic.apply(void 0, _toConsumableArray(parameters));

  if (typeof parameters[0] === 'string') {
    var _parameters = parameters,
        _parameters2 = _slicedToArray(_parameters, 3),
        key = _parameters2[0],
        message = _parameters2[1],
        rule = _parameters2[2];

    this.rules = _objectSpread(_objectSpread({}, this.rules), {}, _defineProperty({}, key, rule));
    this.messages = _objectSpread(_objectSpread({}, this.messages), {}, _defineProperty({}, key, message));
  } else if (_typeof(parameters) === 'object') {
    Object.entries(parameters).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          _ref2$ = _slicedToArray(_ref2[1], 2),
          message = _ref2$[0],
          rule = _ref2$[1];

      _this.rules = _objectSpread(_objectSpread({}, _this.rules), {}, _defineProperty({}, key, rule));
      _this.messages = _objectSpread(_objectSpread({}, _this.messages), {}, _defineProperty({}, key, message));
    });
  }

  return this;
};
/**
 * Add before for validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.before = function (callback) {
  this.beforeValidationCallbacks.push(callback);
  return this;
};
/**
 * Add after validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.after = function (callback) {
  this.afterValidationCallbacks.push(callback);
  return this;
};
/**
 * Add failed validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.failed = function (callback) {
  this.failedValidationCallbacks.push(callback);
  return this;
};
/**
 * Add passed validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.passed = function (callback) {
  this.passedValidationCallbacks.push(callback);
  return this;
};
/**
 * Prepare To Validate Hooks
 *
 * @returns {Validator}
 */


Validator.prototype.beforeValidation = function () {
  var _this2 = this;

  this.checks = Object.entries(this.parseRules).reduce(function (completed, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        field = _ref4[0],
        rules = _ref4[1];

    return [].concat(_toConsumableArray(completed), _toConsumableArray(ParseRule(_this2, field, rules)));
  }, []);
  this.beforeValidationCallbacks.forEach(function (callback) {
    return callback(_this2);
  });
  this.beforeValidationCallbacks = [];
};
/**
 * Validate Hook
 * ~~~~~~~~~~~~~~
 * Trigger prepareToValidate Hooks.
 * Trigger Validation Rules
 * Trigger AfterValidation Hooks
 */


Validator.prototype.validate = function () {
  this.beforeValidation();
  this.errors().set(this.checks.reduce(function (errors, check) {
    return _objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, check.attribute, check.rule(check) ? _toConsumableArray(errors[check.attribute] || []) : [].concat(_toConsumableArray(errors[check.attribute] || []), [check.message()])));
  }, {}));
  this.afterValidation();
  return this;
};
/**
 * After validation hook
 *
 * @returns {Validator}
 */


Validator.prototype.afterValidation = function () {
  var _this3 = this;

  this.afterValidationCallbacks.forEach(function (callback) {
    return callback(_this3);
  });

  if (this.errors().any()) {
    this.failedValidationCallbacks.forEach(function (callback) {
      return callback(_this3);
    });
    this.failedValidationCallbacks = [];
  } else {
    this.passedValidationCallbacks.forEach(function (callback) {
      return callback(_this3);
    });
    this.passedValidationCallbacks = [];
  }
};

module.exports = Validator;
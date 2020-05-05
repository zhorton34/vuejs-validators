"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RULES = require('./rules');

var MESSAGES = require('./messages');

var ParseRule = require('./parseRule');

var Validator = function Validator() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var translator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  this.errors = {};
  this.translator = {};
  this.parseRules = rules;
  this.rules = _objectSpread({}, RULES);
  this.customMessages = messages;
  this.messages = _objectSpread({}, MESSAGES);
  this.data = this.parseData(data);
  this.beforeValidationCallbacks = [];
  this.failedValidationCallbacks = [];
  this.passedValidationCallbacks = [];
};

Validator.prototype.parseData = require('./methods/parseData');
/**
 * Add prepare for validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */

Validator.prototype.prepare = function (callback) {
  this.beforeValidationCallbacks.push(callback);
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


Validator.prototype.prepareToValidate = function () {
  var _this = this;

  this.checks = Object.entries(this.parseRules).reduce(function (completed, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        field = _ref2[0],
        rules = _ref2[1];

    return [].concat(_toConsumableArray(completed), _toConsumableArray(ParseRule(_this, field, rules)));
  }, []);
  this.beforeValidationCallbacks.forEach(function (callback) {
    return callback(_this);
  });
};
/**
 * Validate Hook
 * ~~~~~~~~~~~~~~
 * Trigger prepareToValidate Hooks.
 * Trigger Validation Rules
 * Trigger AfterValidation Hooks
 */


Validator.prototype.validate = function () {
  this.prepareToValidate();
  this.errors = this.checks.reduce(function (errors, check) {
    return _objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, check.attribute, check.rule(check) ? _toConsumableArray(errors[check.attribute] || []) : [].concat(_toConsumableArray(errors[check.attribute] || []), [check.message()])));
  }, {});
  this.afterValidation();
  return this;
};
/**
 * After validation hook
 *
 * @returns {Validator}
 */


Validator.prototype.afterValidation = function () {
  var _this2 = this;

  if (this.hasErrors()) {
    this.failedValidationCallbacks.forEach(function (callback) {
      return callback(_this2);
    });
    this.failedValidationCallbacks = [];
  } else {
    this.passedValidationCallbacks.forEach(function (callback) {
      return callback(_this2);
    });
    this.passedValidationCallbacks = [];
  }
};
/**
 * Determine if the validator currently has errors
 *
 * @returns {boolean}
 */


Validator.prototype.hasErrors = function () {
  return Object.keys(this.errors).length > 0;
};
/**
 * Object of error messages
 * {
 * 	   name: ['name must be less than 8 characters', 'name is required'],
 *     email: ['email is a required field', 'email must be of type email'],
 * }
 * @returns {}
 */


Validator.prototype.getErrors = function () {
  return this.errors;
};
/**
 * Flat array of error messages
 *
 * @returns {any[]}
 */


Validator.prototype.getErrorsList = function () {
  return Object.values(this.errors).flat();
};

module.exports = Validator;
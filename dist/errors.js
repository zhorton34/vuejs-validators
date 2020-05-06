"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isEmpty = require('./helpers/isEmpty.js');

var Errors = function Errors(validator) {
  this.messages = {};
  /**
   * Get Validator
   *
   * @returns {*}
   */

  this.getValidator = function () {
    return validator;
  };
  /**
   * Determine if there are any error messages.
   */


  this.any = function () {
    return !isEmpty(this.list());
  };
  /**
   * Determine if there are messages for a given field.
   */


  this.has = function (field) {
    return Object.keys(this.messages).includes(field) && this.messages[field].length > 0;
  };
  /**
   * Get all of the raw messages for the errors.
   */


  this.all = function () {
    return this.messages;
  };
  /**
   * Array of messages for every field
   */


  this.list = function () {
    var _this = this;

    var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return field ? this.messages[field] : Object.keys(this.messages).map(function (field) {
      return _this.messages[field];
    }).reduce(function (list, messages) {
      return [].concat(_toConsumableArray(list), _toConsumableArray(messages));
    }, []);
  };
  /**
   * Get the first message for a given field.
   */


  this.get = function (field) {
    if (this.has(field)) {
      return this.messages[field][0];
    }
  };
  /**
   * Add error messages for a given field
   * @param field
   * @param error
   */


  this.add = function (field, error) {
    this.messages[field] = Array.isArray(this.messages[field]) ? this.messages[field] : [];
    this.messages[field].push(error);
  };
  /**
   * Set the raw errors for the collection.
   */


  this.set = function (errors) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (_typeof(errors) === 'object') {
      this.messages = errors;
    } else {
      this.messages[errors] = value;
    }
  };
  /**
   * Remove messages from all errors or
   * optionally for errors on a specific field.
   */


  this.forget = function (field) {
    if (typeof field === 'undefined') {
      this.messages = {};
    } else {
      this.messages[field] = [];
    }
  };
};

var makeErrorBag = function makeErrorBag() {
  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Errors(validator);
};

module.exports = makeErrorBag;
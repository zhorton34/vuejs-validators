"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isEmpty = require('./helpers/isEmpty.js');

var Hooks = function Hooks() {
  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.life = {};
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
   * Determine if there are hooks for a given life cycle moment.
   */


  this.has = function (moment) {
    return Object.keys(this.life).includes(moment) && this.life[moment].length > 0;
  };
  /**
   * Get all the life cycle moments, with their array of callbacks
   */


  this.all = function () {
    return this.life;
  };
  /**
   * Array of messages for every field
   */


  this.list = function () {
    var _this = this;

    var moment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return moment ? this.life[moment] : Object.keys(this.life).map(function (moment) {
      return _this.life[moment];
    }).reduce(function (interactions, forMoment) {
      return [].concat(_toConsumableArray(interactions), _toConsumableArray(forMoment));
    }, []);
  };
  /**
   * Get the first interaction for a given life cycle moment
   */


  this.get = function (moment) {
    if (this.has(moment)) {
      return this.life[moment][0];
    }
  };
  /**
   * Add moment interaction
   * @param moment
   * @param interaction
   */


  this.add = function (moment, interaction) {
    this.life[moment] = Array.isArray(this.life[moment]) ? this.life[moment] : [];
    this.life[moment] = [].concat(_toConsumableArray(this.life[moment]), [interaction]);
  };
  /**
   * Set the raw life cycle
   */


  this.set = function (cycle) {
    var interactions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (_typeof(cycle) === 'object') {
      this.life = cycle;
    } else {
      this.life[cycle] = interactions;
    }
  };
  /**
   * Remove interactions from all life cycle moments
   * Or empty all interactions for specific life cycle moment
   */


  this.forget = function (moment) {
    if (typeof moment === 'undefined') {
      this.life = {};
    } else {
      this.life[moment] = [];
    }
  };
};

var makeHookBag = function makeHookBag() {
  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Hooks(validator);
};

module.exports = makeHookBag;
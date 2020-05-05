"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isBool = require('./helpers/isBool');

var isNull = require('./helpers/isNull');

var isBooly = require('./helpers/isBooly');

var isFalsy = require('./helpers/isFalsy');

var isEmpty = require('./helpers/isEmpty');

var isString = require('./helpers/isString');

var isNumber = require('./helpers/isNumber');

var isTruthy = require('./helpers/isTruthy');

var isNotNull = require('./helpers/isNotNull');

var isNumeric = require('./helpers/isNumeric');

var isNotEmpty = require('./helpers/isNotEmpty');

var isUndefined = require('./helpers/isUndefined');

var isNotNumeric = require('./helpers/isNotNumeric');

var isNotUndefined = require('./helpers/isNotUndefined');

module.exports = {
  "boolean": function boolean(_ref) {
    var value = _ref.value;
    return isBooly(value);
  },
  number: function number(_ref2) {
    var value = _ref2.value;
    return isNumber(value);
  },
  numeric: function numeric(_ref3) {
    var value = _ref3.value;
    return isNumeric(value);
  },
  accepted: function accepted(_ref4) {
    var value = _ref4.value;
    return isTruthy(value);
  },
  same: function same(_ref5) {
    var value = _ref5.value,
        parameters = _ref5.parameters,
        validator = _ref5.validator;
    return value === validator.data[parameters[0]];
  },
  min: function min(_ref6) {
    var value = _ref6.value,
        parameters = _ref6.parameters;
    return value.length >= parameters[0];
  },
  max: function max(_ref7) {
    var value = _ref7.value,
        parameters = _ref7.parameters;
    return value.length <= parameters[0];
  },
  within: function within(_ref8) {
    var value = _ref8.value,
        parameters = _ref8.parameters;
    return parameters[0].split(',').includes(value);
  },
  not_within: function not_within(_ref9) {
    var value = _ref9.value,
        parameters = _ref9.parameters;
    return !parameters[0].split(',').includes(value);
  },
  email: function email(_ref10) {
    var value = _ref10.value;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
  },
  phone: function phone(_ref11) {
    var value = _ref11.value;
    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value);
  },
  required: function required(_ref12) {
    var value = _ref12.value;
    return true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value));
  },
  regex: function regex(_ref13) {
    var value = _ref13.value,
        parameters = _ref13.parameters;
    return parameters[0].test(value);
  },
  not_regex: function not_regex(_ref14) {
    var value = _ref14.value,
        parameters = _ref14.parameters;
    return !parameters[0].test(value);
  },
  url: function url(_ref15) {
    var value = _ref15.value;
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(value);
  },
  alpha: function alpha(_ref16) {
    var value = _ref16.value;
    return /^[a-zA-Z]*$/.test(value);
  },
  alpha_dash: function alpha_dash(_ref17) {
    var value = _ref17.value;
    return /^[a-zA-Z0-9-_]+$/.test(value);
  },
  alpha_num: function alpha_num(_ref18) {
    var value = _ref18.value;
    return /^[a-zA-Z0-9]*$/.test(value);
  },
  array: function array(_ref19) {
    var value = _ref19.value;
    return Array.isArray(value);
  },
  string: function string(_ref20) {
    var value = _ref20.value;
    return isString(value);
  },
  between: function between(_ref21) {
    var value = _ref21.value,
        _ref21$parameters = _slicedToArray(_ref21.parameters, 1),
        _between = _ref21$parameters[0];

    var _between$split = _between.split(','),
        _between$split2 = _slicedToArray(_between$split, 2),
        lower = _between$split2[0],
        upper = _between$split2[1];

    return Boolean(Number(lower) < Number(value) && Number(upper) > Number(value));
  },
  json: function json(_ref22) {
    var value = _ref22.value;
    value = typeof value !== "string" ? JSON.stringify(value) : value;

    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }

    return _typeof(value) === "object" && value !== null;
  }
};
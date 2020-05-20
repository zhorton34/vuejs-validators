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
  date: function date(_ref) {
    var value = _ref.value;
    return new Date(value) != 'Invalid Date';
  },
  date_equals: function date_equals(_ref2) {
    var value = _ref2.value,
        parameters = _ref2.parameters;
    return Date.parse(value) === Date.parse(parameters[0]);
  },
  before: function before(_ref3) {
    var value = _ref3.value,
        parameters = _ref3.parameters;
    return Date.parse(value) < Date.parse(parameters[0]);
  },
  after: function after(_ref4) {
    var value = _ref4.value,
        parameters = _ref4.parameters;
    return Date.parse(value) > Date.parse(parameters[0]);
  },
  before_or_equal: function before_or_equal(_ref5) {
    var value = _ref5.value,
        parameters = _ref5.parameters;
    return Date.parse(value) <= Date.parse(parameters[0]);
  },
  after_or_equal: function after_or_equal(_ref6) {
    var value = _ref6.value,
        parameters = _ref6.parameters;
    return Date.parse(value) >= Date.parse(parameters[0]);
  },
  "boolean": function boolean(_ref7) {
    var value = _ref7.value;
    return isBooly(value);
  },
  number: function number(_ref8) {
    var value = _ref8.value;
    return isNumber(value);
  },
  numeric: function numeric(_ref9) {
    var value = _ref9.value;
    return isNumeric(value);
  },
  accepted: function accepted(_ref10) {
    var value = _ref10.value;
    return isTruthy(value);
  },
  ends_with: function ends_with(_ref11) {
    var value = _ref11.value,
        _ref11$parameters = _slicedToArray(_ref11.parameters, 1),
        list = _ref11$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.endsWith(check);
    });
  },
  starts_with: function starts_with(_ref12) {
    var value = _ref12.value,
        _ref12$parameters = _slicedToArray(_ref12.parameters, 1),
        list = _ref12$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.startsWith(check);
    });
  },
  same: function same(_ref13) {
    var value = _ref13.value,
        parameters = _ref13.parameters,
        validator = _ref13.validator;
    return value === validator.data[parameters[0]];
  },
  min: function min(_ref14) {
    var value = _ref14.value,
        parameters = _ref14.parameters;
    return value.length >= parameters[0];
  },
  max: function max(_ref15) {
    var value = _ref15.value,
        parameters = _ref15.parameters;
    return value.length <= parameters[0];
  },
  within: function within(_ref16) {
    var value = _ref16.value,
        parameters = _ref16.parameters;
    return parameters[0].split(',').includes(value);
  },
  not_within: function not_within(_ref17) {
    var value = _ref17.value,
        parameters = _ref17.parameters;
    return !parameters[0].split(',').includes(value);
  },
  email: function email(_ref18) {
    var value = _ref18.value;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
  },
  phone: function phone(_ref19) {
    var value = _ref19.value;
    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value);
  },
  required: function required(_ref20) {
    var value = _ref20.value;
    return true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value));
  },
  regex: function regex(_ref21) {
    var value = _ref21.value,
        parameters = _ref21.parameters;
    return parameters[0].test(value);
  },
  not_regex: function not_regex(_ref22) {
    var value = _ref22.value,
        parameters = _ref22.parameters;
    return !parameters[0].test(value);
  },
  url: function url(_ref23) {
    var value = _ref23.value;
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(value);
  },
  alpha: function alpha(_ref24) {
    var value = _ref24.value;
    return /^[a-zA-Z]*$/.test(value);
  },
  alpha_dash: function alpha_dash(_ref25) {
    var value = _ref25.value;
    return /^[a-zA-Z0-9-_]+$/.test(value);
  },
  alpha_num: function alpha_num(_ref26) {
    var value = _ref26.value;
    return /^[a-zA-Z0-9]*$/.test(value);
  },
  array: function array(_ref27) {
    var value = _ref27.value;
    return Array.isArray(value);
  },
  string: function string(_ref28) {
    var value = _ref28.value;
    return isString(value);
  },
  distinct: function distinct(_ref29) {
    var value = _ref29.value;
    return Array.isArray(value) && new Set(value).size === value.length;
  },
  integer: function integer(_ref30) {
    var value = _ref30.value;
    return !isNaN(Number(value)) && isNumeric(value) && Number.isInteger(Number(value));
  },
  different: function different(_ref31) {
    var value = _ref31.value,
        parameters = _ref31.parameters,
        validator = _ref31.validator;
    return value !== validator.data[parameters[0]];
  },
  confirmed: function confirmed(_ref32) {
    var attribute = _ref32.attribute,
        value = _ref32.value,
        validator = _ref32.validator;
    return Object.keys(validator.data).includes("".concat(attribute, "_confirmation")) && value === validator.data["".concat(attribute, "_confirmation")];
  },
  ip: function ip(_ref33) {
    var value = _ref33.value;
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) || /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);
  },
  ipv4: function ipv4(_ref34) {
    var value = _ref34.value;
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
  },
  ipv6: function ipv6(_ref35) {
    var value = _ref35.value;
    return /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);
  },
  between: function between(_ref36) {
    var value = _ref36.value,
        _ref36$parameters = _slicedToArray(_ref36.parameters, 1),
        _between = _ref36$parameters[0];

    var _between$split = _between.split(','),
        _between$split2 = _slicedToArray(_between$split, 2),
        lower = _between$split2[0],
        upper = _between$split2[1];

    return Boolean(Number(lower) < Number(value) && Number(upper) > Number(value));
  },
  json: function json(_ref37) {
    var value = _ref37.value;
    value = typeof value !== "string" ? JSON.stringify(value) : value;

    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }

    return _typeof(value) === "object" && value !== null;
  },
  digits: function digits(_ref38) {
    var value = _ref38.value,
        _ref38$parameters = _slicedToArray(_ref38.parameters, 1),
        length = _ref38$parameters[0];

    return isNumeric(value) && String(value).length === Number(length) && !isNaN(Number(value));
  },
  digits_between: function digits_between(_ref39) {
    var value = _ref39.value,
        _ref39$parameters = _slicedToArray(_ref39.parameters, 1),
        between = _ref39$parameters[0];

    var _between$split3 = between.split(','),
        _between$split4 = _slicedToArray(_between$split3, 2),
        lower = _between$split4[0],
        upper = _between$split4[1];

    if (isNaN(Number(value)) || !isNumeric(value)) return false;
    var check = Number(String(value).length);
    return Boolean(Number(lower) < check && Number(upper) > check);
  }
};
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  lte: function lte(_ref) {
    var value = _ref.value,
        parameters = _ref.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) <= Number(parameters[0]);
  },
  gte: function gte(_ref2) {
    var value = _ref2.value,
        parameters = _ref2.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) >= Number(parameters[0]);
  },
  less_than: function less_than(_ref3) {
    var value = _ref3.value,
        parameters = _ref3.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) < Number(parameters[0]);
  },
  greater_than: function greater_than(_ref4) {
    var value = _ref4.value,
        parameters = _ref4.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) > Number(parameters[0]);
  },
  date: function date(_ref5) {
    var value = _ref5.value;
    return new Date(value) != 'Invalid Date';
  },
  date_equals: function date_equals(_ref6) {
    var value = _ref6.value,
        parameters = _ref6.parameters;
    return Date.parse(value) === Date.parse(parameters[0]);
  },
  before: function before(_ref7) {
    var value = _ref7.value,
        parameters = _ref7.parameters;
    return Date.parse(value) < Date.parse(parameters[0]);
  },
  after: function after(_ref8) {
    var value = _ref8.value,
        parameters = _ref8.parameters;
    return Date.parse(value) > Date.parse(parameters[0]);
  },
  before_or_equal: function before_or_equal(_ref9) {
    var value = _ref9.value,
        parameters = _ref9.parameters;
    return Date.parse(value) <= Date.parse(parameters[0]);
  },
  after_or_equal: function after_or_equal(_ref10) {
    var value = _ref10.value,
        parameters = _ref10.parameters;
    return Date.parse(value) >= Date.parse(parameters[0]);
  },
  "boolean": function boolean(_ref11) {
    var value = _ref11.value;
    return isBooly(value);
  },
  number: function number(_ref12) {
    var value = _ref12.value;
    return isNumber(value);
  },
  numeric: function numeric(_ref13) {
    var value = _ref13.value;
    return isNumeric(value);
  },
  accepted: function accepted(_ref14) {
    var value = _ref14.value;
    return isTruthy(value);
  },
  ends_with: function ends_with(_ref15) {
    var value = _ref15.value,
        _ref15$parameters = _slicedToArray(_ref15.parameters, 1),
        list = _ref15$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.endsWith(check);
    });
  },
  starts_with: function starts_with(_ref16) {
    var value = _ref16.value,
        _ref16$parameters = _slicedToArray(_ref16.parameters, 1),
        list = _ref16$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.startsWith(check);
    });
  },
  same: function same(_ref17) {
    var value = _ref17.value,
        parameters = _ref17.parameters,
        validator = _ref17.validator;
    return value === validator.data[parameters[0]];
  },
  min: function min(_ref18) {
    var value = _ref18.value,
        parameters = _ref18.parameters;
    return value.length >= parameters[0];
  },
  max: function max(_ref19) {
    var value = _ref19.value,
        parameters = _ref19.parameters;
    return value.length <= parameters[0];
  },
  within: function within(_ref20) {
    var value = _ref20.value,
        parameters = _ref20.parameters;
    return parameters[0].split(',').includes(value);
  },
  not_within: function not_within(_ref21) {
    var value = _ref21.value,
        parameters = _ref21.parameters;
    return !parameters[0].split(',').includes(value);
  },
  email: function email(_ref22) {
    var value = _ref22.value;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
  },
  phone: function phone(_ref23) {
    var value = _ref23.value;
    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value);
  },
  required: function required(_ref24) {
    var value = _ref24.value;
    return true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value));
  },
  regex: function regex(_ref25) {
    var value = _ref25.value,
        parameters = _ref25.parameters;
    return new RegExp(parameters[0]).test(value);
  },
  not_regex: function not_regex(_ref26) {
    var value = _ref26.value,
        parameters = _ref26.parameters;
    return !parameters[0].test(value);
  },
  url: function url(_ref27) {
    var value = _ref27.value;
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(value);
  },
  alpha: function alpha(_ref28) {
    var value = _ref28.value;
    return /^[a-zA-Z]*$/.test(value);
  },
  alpha_dash: function alpha_dash(_ref29) {
    var value = _ref29.value;
    return /^[a-zA-Z0-9-_]+$/.test(value);
  },
  alpha_num: function alpha_num(_ref30) {
    var value = _ref30.value;
    return /^[a-zA-Z0-9]*$/.test(value);
  },
  array: function array(_ref31) {
    var value = _ref31.value;
    return Array.isArray(value);
  },
  string: function string(_ref32) {
    var value = _ref32.value;
    return isString(value);
  },
  distinct: function distinct(_ref33) {
    var value = _ref33.value;
    return Array.isArray(value) && new Set(value).size === value.length;
  },
  integer: function integer(_ref34) {
    var value = _ref34.value;
    return !isNaN(Number(value)) && isNumeric(value) && Number.isInteger(Number(value));
  },
  different: function different(_ref35) {
    var value = _ref35.value,
        parameters = _ref35.parameters,
        validator = _ref35.validator;
    return value !== validator.data[parameters[0]];
  },
  confirmed: function confirmed(_ref36) {
    var attribute = _ref36.attribute,
        value = _ref36.value,
        validator = _ref36.validator;
    return Object.keys(validator.data).includes("".concat(attribute, "_confirmation")) && value === validator.data["".concat(attribute, "_confirmation")];
  },
  ip: function ip(_ref37) {
    var value = _ref37.value;
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) || /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);
  },
  ipv4: function ipv4(_ref38) {
    var value = _ref38.value;
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
  },
  ipv6: function ipv6(_ref39) {
    var value = _ref39.value;
    return /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);
  },
  between: function between(_ref40) {
    var value = _ref40.value,
        _ref40$parameters = _slicedToArray(_ref40.parameters, 1),
        _between = _ref40$parameters[0];

    var _between$split = _between.split(','),
        _between$split2 = _slicedToArray(_between$split, 2),
        lower = _between$split2[0],
        upper = _between$split2[1];

    return Boolean(Number(lower) < Number(value) && Number(upper) > Number(value));
  },
  json: function json(_ref41) {
    var value = _ref41.value;
    value = typeof value !== "string" ? JSON.stringify(value) : value;

    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }

    return _typeof(value) === "object" && value !== null;
  },
  digits: function digits(_ref42) {
    var value = _ref42.value,
        _ref42$parameters = _slicedToArray(_ref42.parameters, 1),
        length = _ref42$parameters[0];

    return isNumeric(value) && String(value).length === Number(length) && !isNaN(Number(value));
  },
  digits_between: function digits_between(_ref43) {
    var value = _ref43.value,
        _ref43$parameters = _slicedToArray(_ref43.parameters, 1),
        between = _ref43$parameters[0];

    var _between$split3 = between.split(','),
        _between$split4 = _slicedToArray(_between$split3, 2),
        lower = _between$split4[0],
        upper = _between$split4[1];

    if (isNaN(Number(value)) || !isNumeric(value)) return false;
    var check = Number(String(value).length);
    return Boolean(Number(lower) < check && Number(upper) > check);
  }
};
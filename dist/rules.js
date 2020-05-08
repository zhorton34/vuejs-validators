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
  ends_with: function ends_with(_ref5) {
    var value = _ref5.value,
        _ref5$parameters = _slicedToArray(_ref5.parameters, 1),
        list = _ref5$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.endsWith(check);
    });
  },
  starts_with: function starts_with(_ref6) {
    var value = _ref6.value,
        _ref6$parameters = _slicedToArray(_ref6.parameters, 1),
        list = _ref6$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.startsWith(check);
    });
  },
  same: function same(_ref7) {
    var value = _ref7.value,
        parameters = _ref7.parameters,
        validator = _ref7.validator;
    return value === validator.data[parameters[0]];
  },
  min: function min(_ref8) {
    var value = _ref8.value,
        parameters = _ref8.parameters;
    return value.length >= parameters[0];
  },
  max: function max(_ref9) {
    var value = _ref9.value,
        parameters = _ref9.parameters;
    return value.length <= parameters[0];
  },
  within: function within(_ref10) {
    var value = _ref10.value,
        parameters = _ref10.parameters;
    return parameters[0].split(',').includes(value);
  },
  not_within: function not_within(_ref11) {
    var value = _ref11.value,
        parameters = _ref11.parameters;
    return !parameters[0].split(',').includes(value);
  },
  email: function email(_ref12) {
    var value = _ref12.value;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
  },
  phone: function phone(_ref13) {
    var value = _ref13.value;
    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value);
  },
  required: function required(_ref14) {
    var value = _ref14.value;
    return true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value));
  },
  regex: function regex(_ref15) {
    var value = _ref15.value,
        parameters = _ref15.parameters;
    return parameters[0].test(value);
  },
  not_regex: function not_regex(_ref16) {
    var value = _ref16.value,
        parameters = _ref16.parameters;
    return !parameters[0].test(value);
  },
  url: function url(_ref17) {
    var value = _ref17.value;
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(value);
  },
  alpha: function alpha(_ref18) {
    var value = _ref18.value;
    return /^[a-zA-Z]*$/.test(value);
  },
  alpha_dash: function alpha_dash(_ref19) {
    var value = _ref19.value;
    return /^[a-zA-Z0-9-_]+$/.test(value);
  },
  alpha_num: function alpha_num(_ref20) {
    var value = _ref20.value;
    return /^[a-zA-Z0-9]*$/.test(value);
  },
  array: function array(_ref21) {
    var value = _ref21.value;
    return Array.isArray(value);
  },
  string: function string(_ref22) {
    var value = _ref22.value;
    return isString(value);
  },
  distinct: function distinct(_ref23) {
    var value = _ref23.value;
    return Array.isArray(value) && new Set(value).size === value.length;
  },
  integer: function integer(_ref24) {
    var value = _ref24.value;
    return !isNaN(Number(value)) && isNumeric(value) && Number.isInteger(Number(value));
  },
  different: function different(_ref25) {
    var value = _ref25.value,
        parameters = _ref25.parameters,
        validator = _ref25.validator;
    return value !== validator.data[parameters[0]];
  },
  confirmed: function confirmed(_ref26) {
    var attribute = _ref26.attribute,
        value = _ref26.value,
        validator = _ref26.validator;
    return Object.keys(validator.data).includes("".concat(attribute, "_confirmation")) && value === validator.data["".concat(attribute, "_confirmation")];
  },
  between: function between(_ref27) {
    var value = _ref27.value,
        _ref27$parameters = _slicedToArray(_ref27.parameters, 1),
        _between = _ref27$parameters[0];

    var _between$split = _between.split(','),
        _between$split2 = _slicedToArray(_between$split, 2),
        lower = _between$split2[0],
        upper = _between$split2[1];

    return Boolean(Number(lower) < Number(value) && Number(upper) > Number(value));
  },
  json: function json(_ref28) {
    var value = _ref28.value;
    value = typeof value !== "string" ? JSON.stringify(value) : value;

    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }

    return _typeof(value) === "object" && value !== null;
  },
  digits: function digits(_ref29) {
    var value = _ref29.value,
        _ref29$parameters = _slicedToArray(_ref29.parameters, 1),
        length = _ref29$parameters[0];

    return isNumeric(value) && String(value).length === Number(length) && !isNaN(Number(value));
  },
  digits_between: function digits_between(_ref30) {
    var value = _ref30.value,
        _ref30$parameters = _slicedToArray(_ref30.parameters, 1),
        between = _ref30$parameters[0];

    var _between$split3 = between.split(','),
        _between$split4 = _slicedToArray(_between$split3, 2),
        lower = _between$split4[0],
        upper = _between$split4[1];

    if (isNaN(Number(value)) || !isNumeric(value)) return false;
    var check = Number(String(value).length);
    return Boolean(Number(lower) < check && Number(upper) > check);
  }
};
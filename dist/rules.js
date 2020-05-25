"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var requires = function requires(context) {
  return {
    "if": function _if(fn) {
      var inject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var isRequiredField = typeof fn === 'function' ? fn(_objectSpread(_objectSpread(_objectSpread({}, inject), context), {}, {
        form: context.validator.data,
        rule: _objectSpread({
          on: context.attribute,
          raw: context.validator.parseRules[context.attribute]
        }, resolve(context.parameters)),
        fields: Object.keys(context.validator.data)
      })) : fn;

      if (Boolean(isRequiredField) === false) {
        return true;
      } else {
        var valuePassesRequiredFieldRule = Object.keys(context.validator.data).includes(context.attribute) && isNotNull(context.value) && isNotUndefined(context.value) && isNotEmpty(context.value);
        console.log('zak test: ', {
          valuePassesRequiredFieldRule: valuePassesRequiredFieldRule
        });
        return valuePassesRequiredFieldRule;
      }
    }
  };
};
/*------------------------------------------------------------------
 |  Resolving Validation Rule Parameters
 *------------------------------------------------------------------
 |
 |  . Goal: Parse Rule's String Value, "Resolving" Its Parameters
 |  . What: The what we're resolving are are rule parameters
 |  . From: String ~ We're resolving params from strings
 |  . Then: Arrays ~ We're returning parameterized []s
 |
 |  @Example "required_with:password,email"
 |  @Output ["password", "email"]
 |
 */


var resolve = function resolve(parameters) {
  var infinityProtector = 0;

  while ((Array.isArray(parameters) || (parameters[0] ? Array.isArray(parameters[0]) : false)) && infinityProtector < 5) {
    if (typeof parameters[0] === 'undefined') {
      infinityProtector = 5;
    } else {
      parameters = parameters[0];
    }

    infinityProtector++;
  }

  if (parameters.includes(':')) {
    parameters = parameters.split(':');
  }

  if (parameters.includes(',')) {
    parameters = parameters.split(',');
  }

  var parameterized = {
    first: function first() {
      return parameters[0];
    },
    second: function second() {
      return parameters[1];
    },
    after: function after(start) {
      return parameters.slice(start);
    },
    before: function before(last) {
      return parameters.slice(0, last);
    },
    between: function between(start, end) {
      return parameters.slice(start, end);
    },
    last: function last() {
      return parameters[parameters.length];
    },
    count: function count() {
      return parameters.length;
    },
    list: function list() {
      return parameters;
    },
    requireLength: function requireLength(rule, count) {
      if (parameters.length < count) {
        throw new Error("Validation ".concat(rule, " $rule requires at least $count parameters."));
      }

      return parameterized;
    }
  };
};

var ValidatesAttributes = {
  validateRequired: function validateRequired(attribute, value) {
    if (isNull(value)) {
      return false;
    } else if (isString(value) && value.trim() === '') {
      return false;
    } else if (Array.isArray(value) || typeof value.length !== 'undefined' && value.length < 1) {
      return false;
    } // @TODO add file type to required
    // else if (value typeof file) { return file path !== '' }


    return true;
  },
  validateBail: function validateBail() {
    return true;
  }
};
/** @SEE https://github.com/laravel/framework/blob/7.x/src/Illuminate/Validation/Concerns/ValidatesAttributes.php */

module.exports = {
  /** Context Of Global Validation Is Needed
  // bail
  // sometimes
   */
  required_unless: function required_unless(context) {
    return requires(context)["if"](function (_ref) {
      var form = _ref.form,
          _ref$rule = _ref.rule,
          first = _ref$rule.first,
          second = _ref$rule.second;
      return form[first()] != form[second()];
    });
  },
  required_with: function required_with(context) {
    return requires(context)["if"](function (_ref2) {
      var rule = _ref2.rule,
          fields = _ref2.fields;
      return fields.some(function (field) {
        return rule.list().includes(field);
      });
    });
  },
  required_without: function required_without(context) {
    return requires(context)["if"](function (_ref3) {
      var rule = _ref3.rule,
          fields = _ref3.fields;
      return fields.some(function (field) {
        return !rule.list().includes(field);
      });
    });
  },
  required_with_all: function required_with_all(context) {
    return requires(context)["if"](function (_ref4) {
      var rule = _ref4.rule,
          fields = _ref4.fields;
      return fields.every(function (field) {
        return rule.list().includes(field);
      });
    });
  },
  required_without_all: function required_without_all(context) {
    return requires(context)["if"](function (_ref5) {
      var rule = _ref5.rule,
          fields = _ref5.fields;
      return fields.every(function (field) {
        return !rule.list().includes(field);
      });
    });
  },
  required: function required(context) {
    return requires(context)["if"](function () {
      return true;
    });
  },
  required_if: function required_if(context) {
    return requires(context)["if"](function (_ref6) {
      var form = _ref6.form,
          rule = _ref6.rule;
      console.log({
        form: form,
        rule: rule,
        zak: 'test'
      });
      var condition = form[rule.first()] == form[rule.second()];
      console.log({
        condition: condition
      });
    });
  },

  /** Another Form Field & Rule Parameters Are Needed **/
  same: function same(_ref7) {
    var value = _ref7.value,
        parameters = _ref7.parameters,
        validator = _ref7.validator;
    return value === validator.data[parameters[0]];
  },
  different: function different(_ref8) {
    var value = _ref8.value,
        parameters = _ref8.parameters,
        validator = _ref8.validator;
    return value !== validator.data[parameters[0]];
  },
  confirmed: function confirmed(_ref9) {
    var attribute = _ref9.attribute,
        value = _ref9.value,
        validator = _ref9.validator;
    return Object.keys(validator.data).includes("".concat(attribute, "_confirmation")) && value === validator.data["".concat(attribute, "_confirmation")];
  },

  /** Parameters Needed **/
  regex: function regex(_ref10) {
    var value = _ref10.value,
        parameters = _ref10.parameters;
    return parameters[0].test(value);
  },
  not_regex: function not_regex(_ref11) {
    var value = _ref11.value,
        parameters = _ref11.parameters;
    return !parameters[0].test(value);
  },
  ends_with: function ends_with(_ref12) {
    var value = _ref12.value,
        _ref12$parameters = _slicedToArray(_ref12.parameters, 1),
        list = _ref12$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.endsWith(check);
    });
  },
  starts_with: function starts_with(_ref13) {
    var value = _ref13.value,
        _ref13$parameters = _slicedToArray(_ref13.parameters, 1),
        list = _ref13$parameters[0];

    return isString(value) && list.split(',').some(function (check) {
      return value.startsWith(check);
    });
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
  lte: function lte(_ref18) {
    var value = _ref18.value,
        parameters = _ref18.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) <= Number(parameters[0]);
  },
  gte: function gte(_ref19) {
    var value = _ref19.value,
        parameters = _ref19.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) >= Number(parameters[0]);
  },
  less_than: function less_than(_ref20) {
    var value = _ref20.value,
        parameters = _ref20.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) < Number(parameters[0]);
  },
  greater_than: function greater_than(_ref21) {
    var value = _ref21.value,
        parameters = _ref21.parameters;
    return isNumeric(value) && isNumeric(parameters[0]) && Number(value) > Number(parameters[0]);
  },
  date_equals: function date_equals(_ref22) {
    var value = _ref22.value,
        parameters = _ref22.parameters;
    return Date.parse(value) === Date.parse(parameters[0]);
  },
  before: function before(_ref23) {
    var value = _ref23.value,
        parameters = _ref23.parameters;
    return Date.parse(value) < Date.parse(parameters[0]);
  },
  after: function after(_ref24) {
    var value = _ref24.value,
        parameters = _ref24.parameters;
    return Date.parse(value) > Date.parse(parameters[0]);
  },
  before_or_equal: function before_or_equal(_ref25) {
    var value = _ref25.value,
        parameters = _ref25.parameters;
    return Date.parse(value) <= Date.parse(parameters[0]);
  },
  after_or_equal: function after_or_equal(_ref26) {
    var value = _ref26.value,
        parameters = _ref26.parameters;
    return Date.parse(value) >= Date.parse(parameters[0]);
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
  digits: function digits(_ref28) {
    var value = _ref28.value,
        _ref28$parameters = _slicedToArray(_ref28.parameters, 1),
        length = _ref28$parameters[0];

    return isNumeric(value) && String(value).length === Number(length) && !isNaN(Number(value));
  },
  digits_between: function digits_between(_ref29) {
    var value = _ref29.value,
        _ref29$parameters = _slicedToArray(_ref29.parameters, 1),
        between = _ref29$parameters[0];

    var _between$split3 = between.split(','),
        _between$split4 = _slicedToArray(_between$split3, 2),
        lower = _between$split4[0],
        upper = _between$split4[1];

    if (isNaN(Number(value)) || !isNumeric(value)) return false;
    var check = Number(String(value).length);
    return Boolean(Number(lower) < check && Number(upper) > check);
  },
  json: function json(_ref30) {
    var value = _ref30.value;
    value = typeof value !== "string" ? JSON.stringify(value) : value;

    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }

    return _typeof(value) === "object" && value !== null;
  },
  date: function date(_ref31) {
    var value = _ref31.value;
    return new Date(value) != 'Invalid Date';
  },
  "boolean": function boolean(_ref32) {
    var value = _ref32.value;
    return isBooly(value);
  },
  number: function number(_ref33) {
    var value = _ref33.value;
    return isNumber(value);
  },
  numeric: function numeric(_ref34) {
    var value = _ref34.value;
    return isNumeric(value);
  },
  accepted: function accepted(_ref35) {
    var value = _ref35.value;
    return isTruthy(value);
  },
  email: function email(_ref36) {
    var value = _ref36.value;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
  },
  phone: function phone(_ref37) {
    var value = _ref37.value;
    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value);
  },
  url: function url(_ref38) {
    var value = _ref38.value;
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/.test(value);
  },
  alpha: function alpha(_ref39) {
    var value = _ref39.value;
    return /^[a-zA-Z]*$/.test(value);
  },
  alpha_dash: function alpha_dash(_ref40) {
    var value = _ref40.value;
    return /^[a-zA-Z0-9-_]+$/.test(value);
  },
  alpha_num: function alpha_num(_ref41) {
    var value = _ref41.value;
    return /^[a-zA-Z0-9]*$/.test(value);
  },
  array: function array(_ref42) {
    var value = _ref42.value;
    return Array.isArray(value);
  },
  string: function string(_ref43) {
    var value = _ref43.value;
    return isString(value);
  },
  distinct: function distinct(_ref44) {
    var value = _ref44.value;
    return Array.isArray(value) && new Set(value).size === value.length;
  },
  integer: function integer(_ref45) {
    var value = _ref45.value;
    return !isNaN(Number(value)) && isNumeric(value) && Number.isInteger(Number(value));
  },
  ip: function ip(_ref46) {
    var value = _ref46.value;
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) || /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);
  },
  ipv4: function ipv4(_ref47) {
    var value = _ref47.value;
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
  },
  ipv6: function ipv6(_ref48) {
    var value = _ref48.value;
    return /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);
  }
};
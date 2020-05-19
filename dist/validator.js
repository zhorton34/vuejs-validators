"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var variadic = require('./helpers/variadic');

var _require = require('./messageBag.js'),
    MessageBagFactory = _require.MessageBagFactory;
/*-----------------------------------
 | Message Bag/Relationship Methods
 |-----------------------------------
 |
 |  hooks
 |  errors
 |  passing
 |
 */


var Validator = function Validator() {
  this.data = {};
  this.translator = {};
  this.rules = _objectSpread({}, RULES);
  this.messages = _objectSpread({}, MESSAGES);
  this.eventHooksBag = MessageBagFactory(this);

  this.hooks = function () {
    return this.eventHooksBag;
  };

  this.errorMessageBag = MessageBagFactory(this);

  this.errors = function () {
    return this.errorMessageBag;
  };

  this.passingMessageBag = MessageBagFactory(this);

  this.passing = function () {
    return this.passingMessageBag;
  };
};

Validator.prototype.macro = require('./validator/macro.js');
Validator.prototype.localMacro = require('./validator/localMacro.js');
Validator.prototype.forceMacro = require('./validator/forceMacro.js');
Validator.prototype.forceLocalMacro = require('./validator/forceLocalMacro.js');
/*----------------------------------------------------------------------------
 | Run Validation (Parse Rules, Fill Message Bags, Trigger Life Cycle Hooks)
 |----------------------------------------------------------------------------
 |
 |  validate
 |  validateWithoutHooks
 |  resolveFieldRules
 |  resolveErrorMessages
 |
 */

/**
 * Trigger validation on current data, rules, & messages (Calling registered life cycle hooks)
 *
 * @returns {Validator}
 */

Validator.prototype.validate = function () {
  this.resolveFieldRules().hookInto('before');
  this.resolveErrorMessages().hookInto('after').hookInto(this.errors().any() ? 'failed' : 'passed');
  this.hooks().forget();
  return this;
};
/**
 * Trigger validation on current data, rules, & messages (Not calling registered life cycle hooks)
 *
 * @returns {Validator}
 */


Validator.prototype.validateWithoutHooks = function () {
  this.resolveFieldRules();
  this.resolveErrorMessages();
  return this;
};
/**
 * Setup Checks To Validate Field Data Against Associated Rules
 * Using Data, Field Attribute, Associated Rule, & The Failed Rule Message Name
 *
 * @returns {Validator}
 */


Validator.prototype.resolveFieldRules = function () {
  var _this = this;

  this.checks = Object.entries(this.parseRules).reduce(function (completed, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        field = _ref2[0],
        rules = _ref2[1];

    return [].concat(_toConsumableArray(completed), _toConsumableArray(ParseRule(_this, field, rules)));
  }, []);
  return this;
};
/**
 * Resolve Error Messages resolved field rules,
 * then populate error messages bag
 *
 * @returns {Validator}
 */


Validator.prototype.resolveErrorMessages = function () {
  this.errors().set(this.checks.reduce(function (errors, check) {
    return _objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, check.attribute, check.rule(check) ? _toConsumableArray(errors[check.attribute] || []) : [].concat(_toConsumableArray(errors[check.attribute] || []), [check.message()])));
  }, {}));
  return this;
};
/*---------------------------
 | Life Cycle Hooks
 |---------------------------
 |
 |  hookInto
 |  before
 |  after
 |  failed
 |  passed
 |
 */

/**
 * Trigger Life Cycle Moment's (AKA Life Cycle Event's) Registered Functions
 *
 * @param moment
 * @returns {Validator}
 */


Validator.prototype.hookInto = function (moment) {
  var _this2 = this;

  if (this.hooks().has(moment)) {
    this.hooks().list(moment).forEach(function (event) {
      return event(_this2);
    });
  }

  return this;
};
/**
 * Register callback triggered during the "before" event of our validation life cycle
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.before = function (callback) {
  this.hooks().add('before', callback);
  return this;
};
/**
 * Register callback triggered during the "after" event of our validation life cycle
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.after = function (callback) {
  this.hooks().add('after', callback);
  return this;
};
/**
 * Register callback triggered during the "failed" event of our validation life cycle
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.failed = function (callback) {
  this.hooks().add('failed', callback);
  return this;
};
/**
 * Register callback triggered during the "passed" event of our validation life cycle
 *
 * @param callback
 * @returns {Validator}
 */


Validator.prototype.passed = function (callback) {
  this.hooks().add('passed', callback);
  return this;
};
/*-------------------------------------------
 | Add/Set/Update Configured "State" Data
 |-------------------------------------------
 |
 |  addData
 |  addRule
 |  addMessage
 |  setData
 |  setRules
 |  setMessages
 |  setRules
 |  setMessages
 |
 */

/**
 * Add message to validator customized messages
 *
 * @param field
 * @param value
 * @returns {Validator}
 */


Validator.prototype.addMessage = function (field, value) {
  try {
    this.customMessages[field] = value;
  } catch (_unused) {
    console.error("Was not able to add validation customMessages[".concat(field, "]: ").concat(value));
  }

  return this;
};
/**
 * Add validation rule to field
 *
 * @param field
 * @param value
 * @returns {Validator}
 */


Validator.prototype.addRule = function (field, value) {
  try {
    this.parseRules[field] = value;
  } catch (_unused2) {
    console.error("Was not able to add validation parseRules[".concat(field, "]: ").concat(value));
  }

  return this;
};
/**
 * Add data to be validated
 *
 * @param field
 * @param value
 * @returns {Validator}
 */


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
 * Set Rules To Be Validated
 *
 * @param rules
 * @returns {Validator}
 */


Validator.prototype.setRules = function () {
  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.parseRules = rules;
  return this;
};
/**
 * Set customized error messages
 *
 * @param messages
 * @returns {Validator}
 */


Validator.prototype.setMessages = function () {
  var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.customMessages = messages;
  return this;
};
/*---------------------------------
 | Create Related Entity Method
 |---------------------------------
 |
 |  make (Creates validator)
 |  extend (Creates rules)
 |  parseData (To handle wild cards and nested data)
 |
 */

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
  this.data = data;
  this.parseRules = rules;
  this.translator = translator;
  this.customMessages = messages;
  return this;
};
/**
 * Extend Validator With Custom Rules
 *
 * @param parameters
 * @returns {Validator}
 */


Validator.prototype.extend = function () {
  var _this3 = this;

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
    Object.entries(parameters).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          _ref4$ = _slicedToArray(_ref4[1], 2),
          message = _ref4$[0],
          rule = _ref4$[1];

      _this3.rules = _objectSpread(_objectSpread({}, _this3.rules), {}, _defineProperty({}, key, rule));
      _this3.messages = _objectSpread(_objectSpread({}, _this3.messages), {}, _defineProperty({}, key, message));
    });
  }

  return this;
};
/**
 * Parse data configuring it for proper nesting and wild card implementations
 *
 * @param data
 */


Validator.prototype.parseData = function () {
  var _this4 = this;

  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var newData = {};
  Object.entries(data).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];

    if (_typeof(value) === 'object') {
      value = _this4.parseData(value);
    }

    key = key.replace(/\*/g, '__asterisk__');
    newData[key] = value;
  });
  return newData;
};

module.exports = Validator;
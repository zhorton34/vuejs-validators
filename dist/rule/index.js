'use strict';

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

var pipe = require('./pipeline/index.js');
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
  console.log(parameters);

  while ((Array.isArray(parameters) || (((_parameters = parameters) === null || _parameters === void 0 ? void 0 : _parameters[0]) ? Array.isArray((_parameters2 = parameters) === null || _parameters2 === void 0 ? void 0 : _parameters2[0]) : false)) && infinityProtector < 5) {
    var _parameters, _parameters2;

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

  return {
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
    }
  };
};

var bailOnFirstFailedRule = require('./pipeline/bailOnFirstFailedRule');

var sometimesRuleIsSkipped = require('./pipeline/sometimesRuleIsSkipped');

var resolveViaCallback = require('./pipeline/resolveViaCallback');

var resolveViaString = require('./pipeline/resolveViaString');

var resolveViaObject = require('./pipeline/resolveViaObject'); // Form
//   State
//       data
//       messages
//
//   Relationships
//       Fields (hasMany)
//       MessageBag (HasOne)
//
// Field
//   State
//      value
//      messages
//      attribute
//
//   Relationships
//        Form (belongsTo)
//        Rules (hasMany)
//
// Rule
//   State
//     value
//     message
//     attribute
//
//   Relationships
//      Field (belongsTo)
//      Form (belongsToDeep)
//      ImplicitRules (hasMany)
//
//      siblings (hasMany)

/**
 * Form
 * ----------
 *
 */

/**
 * RuleSubscribe(form[field])
 *
 * value, attribute, valid
 */

/**------------------------------------------------------------------
 | FieldJudge Class
 |-------------------------------------------------------------------
 |
 | 1. Responsibilities
 |    -> Collect Field Level Context
 |    -> Reduce Rule Level Context From Field Level Context
 |    -> Provide A Simplified Reference Api Between Our Three Context Scopes
 |    	# Validator (Team)
 |      # FieldCoach (
 |      # RuleMember
 |    ->
 |    -> Simplify Access To Form Level Context
 |   . Validator
 |   . Attribute: Field key AKA field name
 |   . Raw_field_rules: Object keyed by field name AKA the "attributes" parameter
 |   . Two Rule Syntax Are Available, "RuleCollection" Is Responsible For Parsing Both
 |    	 (A) Pipes: { email: 'required|email|min:3' }
 |	     (B) Array: { email: ['required', 'email', 'min:3'] }
 * @param attribute
 * @param validator
 * @param raw_field_rules
 * @constructor
 */


var FieldJudge = function FieldJudge(_ref) {
  var _this = this;

  var attribute = _ref.attribute,
      validator = _ref.validator,
      raw_field_rules = _ref.raw_field_rules;

  this.attribute = function () {
    return attribute;
  };

  this.validator = function () {
    return validator;
  };

  this.raw_field_rules = function () {
    return raw_field_rules;
  };

  this.value = function () {
    return _this.validator().data[_this.attribute];
  };
  /**
   * Supporters
   *
   * @returns {*}
   */


  this.form = function () {
    return _this.validator().data;
  };

  this.fields = function () {
    return Object.keys(_this.validator()).data;
  };
  /**
   * RuleCollection.toPipes()
   *
   * Example: 'required|email|string'
   *
   * @returns {*}
   */


  this.toPipes = function () {
    return raw_field_rules.includes('|') ? raw_field_rules : raw_field_rules.join('|');
  };
  /**
   * RuleCollection.toArray()
   *
   * Example: ['required', 'email', 'string']
   *
   * @returns {*}
   */


  this.toArray = function () {
    return Array.isArray(raw_field_rules) ? raw_field_rules : raw_field_rules.split('|');
  };
  /**
   * Total number of rules for a given field
   *
   * @returns {*}
   */


  this.count = function () {
    return _this.toArray().length;
  };
};

var RuleApi = function RuleApi(context) {
  var _this2 = this;

  /**
   * Rule Level Data
   * ----------------
   * Rule Parameters
   *
   */
  this.value = context.value;
  this.attribute = context.attribute;
  this.parameters = resolve(context.parameters);
  this.fails = context.validator.customMessages[this.attribute];

  this.form = function () {
    return context.validator.data;
  };

  this.errors = function () {
    return context.validator.errors();
  };

  this.options = function () {
    return resolve(context.parameters);
  };

  this.fields = function () {
    return Object.keys(context.validator.data);
  };

  this.message = function () {
    return context.validator.messages[_this2.attribute];
  };

  this.settings = {
    pipeline: [bailOnFirstFailedRule, sometimesRuleIsSkipped, resolveViaCallback, resolveViaString, resolveViaObject],
    message: {
      filters: [function (str) {
        return str[0].toUpperCase() + str.slice(1);
      }],
      replace: [['/_/g', ' '], ['/:attribute/g', this.attribute]]
    }
  };
};

RuleApi.prototype.messageReplacer = function (find, replace) {
  if (typeof find !== 'string' || typeof replace !== 'string') {
    return console.error("rule.addMessageReplacer(String find, String replace) wasnt passed two string arguments properly");
  }

  this.settings.message.replace = [].concat(_toConsumableArray(this.settings.message.replace), [[find, replace]]);
};

RuleApi.prototype.messageFilter = function (filter) {
  if (typeof filter !== 'function') {
    return console.error("rule.addMessageFilter(Fn filter) was not passed a filter function as its argument type ");
  }

  this.settings.message.filters = [].concat(_toConsumableArray(this.settings.message.filters), [filter]);
};

RuleApi.prototype.prettify = function () {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.message();

  var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      _ref2$replace = _ref2.replace,
      replace = _ref2$replace === void 0 ? [] : _ref2$replace,
      _ref2$filters = _ref2.filters,
      filters = _ref2$filters === void 0 ? [] : _ref2$filters;

  filters = [].concat(_toConsumableArray(this.settings.message.filters), _toConsumableArray(filters));
  replace = [].concat(_toConsumableArray(this.settings.message.replace), _toConsumableArray(replace));
  /**
   * Apply Replacers
   */

  message = replace.reduce(function (string, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        find = _ref4[0],
        replace = _ref4[1];

    return string.replace(find, replace);
  }, message);
  /**
   * Apply Filters
   */

  message = filters.reduce(function (string, filter) {
    return filter(string);
  }, message);
  /**
   * Return The Prettified message
   */

  return message;
};

RuleApi.prototype.push = function (attribute, message) {
  var replacers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  this.prettify(message);
};

RuleApi.prototype.fail = function (message) {
  if (typeof message === 'undefined') {
    message = this.message ? this.message : "".concat(this.attribute, " is invalid");
  } // @TODO message replaces (Ex: ':attribute', replaced with this.attribute


  this.errors().add(this.attribute, message);
};

RuleApi.prototype.resolve = function (via) {
  pipe(this, [bailOnFirstFailedRule, sometimesRuleIsSkipped, resolveViaCallback, resolveViaString, resolveViaObject], {
    via: via
  }).go();
};

var RuleCollector = function RuleCollector(context) {
  return new RuleApi(context);
};

module.exports = RuleCollector;
module.exports["default"] = RuleCollector;
module.exports.RuleCollector = RuleCollector;
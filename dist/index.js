'use strict';

var Factory = require('./factory');

var makeErrorBag = require('./errors');

var validator = function validator() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var translator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return new Factory(data, rules, messages, translator);
};

module.exports = validator;
module.exports.Validator = Factory;
module.exports["default"] = validator;
module.exports.validator = validator;
module.exports.makeErrorBag = makeErrorBag;
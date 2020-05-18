'use strict';

var Factory = require('./factory');

var _require = require('./messageBag.js'),
    MessageBag = _require.MessageBag,
    MessageBagFactory = _require.MessageBagFactory;

var validator = function validator() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var translator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return new Factory(data, rules, messages, translator);
};

module.exports = validator;
module.exports["default"] = validator;
module.exports.Validator = Factory;
module.exports.validator = validator;
module.exports.MessageBag = MessageBag;
module.exports.MessageBagFactory = MessageBagFactory;
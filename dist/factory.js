'use strict';

var Validator = require('./validator');

var Factory = function Factory() {
  var translator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.translator = translator;
};

Factory.prototype.make = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var customAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  this.validator = new Validator(data, rules, messages, customAttributes);
  return this;
};

Factory.prototype.validate = function () {
  console.log('factory validates: ', this.validate);
};

module.exports = Factory;
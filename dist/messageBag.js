'use strict';

var MessageBag = function MessageBag() {
  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.messages = {};

  this.getValidator = function () {
    return validator;
  };
};

MessageBag.prototype.add = require('./messages/add.js');
MessageBag.prototype.all = require('./messages/all.js');
MessageBag.prototype.any = require('./messages/any.js');
MessageBag.prototype.get = require('./messages/get.js');
MessageBag.prototype.has = require('./messages/has.js');
MessageBag.prototype.set = require('./messages/set.js');
MessageBag.prototype.list = require('./messages/list.js');
MessageBag.prototype.macro = require('./messages/macro.js');
MessageBag.prototype.forget = require('./messages/forget.js');
MessageBag.prototype.forceMacro = require('./messages/forceMacro.js');
MessageBag.prototype.localMacro = require('./messages/localMacro.js');
MessageBag.prototype.forceLocalMacro = require('./messages/forceLocalMacro.js');

var MessageBagFactory = function MessageBagFactory() {
  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new MessageBag(validator);
};

module.exports = MessageBagFactory;
module.exports.MessageBag = MessageBag;
module.exports["default"] = MessageBagFactory;
module.exports.MessageBagFactory = MessageBagFactory;
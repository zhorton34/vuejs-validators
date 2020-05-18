
'use strict';

const Factory = require('./factory');
const { MessageBag, MessageBagFactory } = require('./messageBag.js');

const validator = (	data = {}, rules = {}, messages = {}, translator = {}) => (new Factory(data, rules, messages, translator));

module.exports = validator;
module.exports.default = validator;
module.exports.Validator = Factory;
module.exports.validator = validator;

module.exports.MessageBag = MessageBag;
module.exports.MessageBagFactory = MessageBagFactory;


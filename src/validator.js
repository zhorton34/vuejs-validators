const RULES = require('./rules');
const MESSAGES = require('./messages');

const Validator = function (data = {}, rules = {}, messages = {}, customAttributes = {}) {
	this.data = this.parseData(data);
	this.rules = { ...RULES, ...rules };
	this.messages = { ...MESSAGES, ...messages };
	this.customAttributes = customAttributes;
};

Validator.prototype.parseData = require('./methods/parseData');

module.exports = Validator;

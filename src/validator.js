const RULES = require('./rules');
const Errors = require('./errors');
const MESSAGES = require('./messages');
const ParseRule = require('./parseRule');
const variadic = require('./helpers/variadic');

const Validator = function () {
	this.translator = {};

	this.data = {};
	this.rules = { ...RULES };
	this.errors = new Errors();
	this.messages = { ...MESSAGES };

	this.afterValidationCallbacks = [];
	this.beforeValidationCallbacks = [];
	this.failedValidationCallbacks = [];
	this.passedValidationCallbacks = [];
};

Validator.prototype.parseData = require('./methods/parseData');

/**
 * Make Validator
 *
 * @param data
 * @param rules
 * @param messages
 * @param translator
 * @returns {Validator}
 */
Validator.prototype.make = function (data = {}, rules = {}, messages = {}, translator = {}) {
	this.parseRules = rules;
	this.customMessages = messages;
	this.data = this.parseData(data);

	return this;
};

/**
 * Set Data Being Validated
 *
 * @param data
 * @returns {Validator}
 */
Validator.prototype.setData = function (data = {}) {
	this.data = data;

	return this;
};

/**
 * Set Validation Rules
 *
 * @param rules
 * @returns {Validator}
 */
Validator.prototype.setRules = function (rules = {}) {
	this.rules = rules;

	return this;
};

/**
 * Set Validation Messages
 *
 * @param messages
 * @returns {Validator}
 */
Validator.prototype.setMessages = function (messages = {}) {
	this.messages = messages;

	return this;
};

/**
 * Extend Validator With Custom Rules
 * @param parameters
 * @returns {Validator}
 */
Validator.prototype.extend = function (...parameters) {
	parameters = variadic(...parameters);

	if (typeof parameters[0] === 'string') {
		let [key, message, rule] = parameters;

		this.rules = { ...this.rules, [key]: rule };
		this.messages = { ...this.messages, [key]: message };
	} else if (typeof parameters === 'object') {
		Object.entries(parameters).forEach(([key, [message, rule]]) => {
			this.rules = { ...this.rules, [key]: rule };
			this.messages = { ...this.messages, [key]: message };
		})
	}

	return this;
};

/**
 * Add before for validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */
Validator.prototype.before = function (callback) {
	this.beforeValidationCallbacks.push(callback);

	return this;
};

/**
 * Add after validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */
Validator.prototype.after = function (callback) {
	this.afterValidationCallbacks.push(callback);

	return this;
};

/**
 * Add failed validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */
Validator.prototype.failed = function (callback) {
	this.failedValidationCallbacks.push(callback);

	return this;
};

/**
 * Add passed validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */
Validator.prototype.passed = function (callback) {
	this.passedValidationCallbacks.push(callback);

	return this;
};

/**
 * Prepare To Validate Hooks
 *
 * @returns {Validator}
 */
Validator.prototype.beforeValidation = function () {
	this.checks = Object.entries(this.parseRules).reduce(
		(completed, [field, rules]) => [
			...completed,
			...ParseRule(this, field, rules)
		],
	[]);

	this.beforeValidationCallbacks.forEach(callback => callback(this));
	this.beforeValidationCallbacks = [];
};

/**
 * Validate Hook
 * ~~~~~~~~~~~~~~
 * Trigger prepareToValidate Hooks.
 * Trigger Validation Rules
 * Trigger AfterValidation Hooks
 */
Validator.prototype.validate = function () {
	this.beforeValidation();

	this.errors.set(
		this.checks.reduce(
			(errors, check) => ({
				...errors,
				[check.attribute]: check.rule(check)
					? [...(errors[check.attribute] || [])]
					: [...(errors[check.attribute] || []), check.message()],
			}),
		{})
	);

	this.afterValidation();

	return this;
};

/**
 * After validation hook
 *
 * @returns {Validator}
 */
Validator.prototype.afterValidation = function () {
	this.afterValidationCallbacks.forEach(callback => callback(this));

	if (this.errors.exist()) {
		this.failedValidationCallbacks.forEach(callback => callback(this));

		this.failedValidationCallbacks = [];
	} else {
		this.passedValidationCallbacks.forEach(callback => callback(this));

		this.passedValidationCallbacks = [];
	}
};

module.exports = Validator;

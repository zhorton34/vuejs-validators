const RULES = require('./rules');
const makeHookBag = require('./hooks');
const MESSAGES = require('./messages');
const ParseRule = require('./parseRule');
const makeErrorBag = require('./errors');
const variadic = require('./helpers/variadic');

const Validator = function () {
	this.data = {};
	this.translator = {};
	this.rules = { ...RULES };
	this.messages = { ...MESSAGES };
	this.hookBag = makeHookBag(this);
	this.errorBag = makeErrorBag(this);
};


Validator.prototype.parseData = require('./methods/parseData');

Validator.prototype.hooks = function () {
	return this.hookBag;
};

Validator.prototype.hookInto = function (moment) {
	if (this.hooks().has(moment)) {
		this.hooks().list(moment).forEach(event => event(this));
	}

	return this;
};

Validator.prototype.errors = function() {
	return this.errorBag;
};

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
	this.translator = translator;
	this.customMessages = messages;
	this.data = this.parseData(data);

	return this;
};

Validator.prototype.addMessage = function(field, value) {
	try {
		this.customMessages[field] = value;
	} catch {
		console.error(`Was not able to add validation customMessages[${field}]: ${value}`);
	}

	return this;
};

Validator.prototype.addRule = function(field, value) {
	try {
		this.parseRules[field] = value;
	} catch {
		console.error(`Was not able to add validation parseRules[${field}]: ${value}`);
	}

	return this;
};

Validator.prototype.addData = function(field, value) {
	try {
		this.data[field] = value;
	} catch {
		console.error(`Was not able to add validation data[${field}]: ${value}`);
	}

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
	this.parseRules = rules;

	return this;
};

/**
 * Set Validation Messages
 *
 * @param messages
 * @returns {Validator}
 */
Validator.prototype.setMessages = function (messages = {}) {
	this.customMessages = messages;

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
	this.hooks().add('before', callback);

	return this;
};

/**
 * Add after validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */
Validator.prototype.after = function (callback) {
	this.hooks().add('after', callback);

	return this;
};

/**
 * Add failed validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */
Validator.prototype.failed = function (callback) {
	this.hooks().add('failed', callback);

	return this;
};

/**
 * Add passed validation hook/callback
 *
 * @param callback
 * @returns {Validator}
 */
Validator.prototype.passed = function (callback) {
	this.hooks().add('passed', callback);

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

	return this;
};

/**
 * Validate Hook
 * ~~~~~~~~~~~~~~
 * Trigger prepareToValidate Hooks.
 * Trigger Validation Rules
 * Trigger AfterValidation Hooks
 */
Validator.prototype.validate = function () {
	return this
		.beforeValidation()
		.hookInto('before')
		.checkRulesAndFillErrorBag()
		.hookInto('after')
		.hookInto(this.errors().any() ? 'failed' : 'passed')
		.forgetHooks();
};

/**
 * Validate, but don't execute life cycle hooks
 */
Validator.prototype.validateWithoutHooks = function () {
	return this.beforeValidation().checkRulesAndFillErrorBag();
};

/**
 * Execute validation rules and fill error bag
 * @returns {Validator}
 */
Validator.prototype.checkRulesAndFillErrorBag = function () {
	this.errors().set(
		this.checks.reduce(
			(errors, check) => ({
				...errors,
				[check.attribute]: check.rule(check)
					? [...(errors[check.attribute] || [])]
					: [...(errors[check.attribute] || []), check.message()],
			}),
		{})
	);

	return this;
};

Validator.prototype.forgetHooks = function () {
	this.hooks().forget('before');
	this.hooks().forget('after');
	this.hooks().forget('passed');
	this.hooks().forget('failed');

	return this;
};

module.exports = Validator;

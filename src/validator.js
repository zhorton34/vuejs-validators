const RULES = require('./rules');
const MESSAGES = require('./messages');
const ParseRule = require('./parseRule');
const variadic = require('./helpers/variadic');
const { MessageBagFactory } = require('./messageBag.js');

/*-----------------------------------
 | Message Bag/Relationship Methods
 |-----------------------------------
 |
 |  hooks
 |  errors
 |  passing
 |
 */

const Validator = function () {
	this.data = {};
	this.translator = {};
	this.rules = { ...RULES };
	this.messages = { ...MESSAGES };

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
	this.checks = Object.entries(this.parseRules).reduce(
		(completed, [field, rules]) => [
			...completed,
			...ParseRule(this, field, rules)
		],
	[]);

	return this;
};

/**
 * Resolve Error Messages resolved field rules,
 * then populate error messages bag
 *
 * @returns {Validator}
 */
Validator.prototype.resolveErrorMessages = function () {
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
	if (this.hooks().has(moment)) {
		this.hooks().list(moment).forEach(event => event(this));
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
Validator.prototype.addMessage = function(field, value) {
	try {
		this.customMessages[field] = value;
	} catch {
		console.error(`Was not able to add validation customMessages[${field}]: ${value}`);
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
Validator.prototype.addRule = function(field, value) {
	try {
		this.parseRules[field] = value;
	} catch {
		console.error(`Was not able to add validation parseRules[${field}]: ${value}`);
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
 * Set Rules To Be Validated
 *
 * @param rules
 * @returns {Validator}
 */
Validator.prototype.setRules = function (rules = {}) {
	this.parseRules = rules;

	return this;
};

/**
 * Set customized error messages
 *
 * @param messages
 * @returns {Validator}
 */
Validator.prototype.setMessages = function (messages = {}) {
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
Validator.prototype.make = function (data = {}, rules = {}, messages = {}, translator = {}) {
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
 * Parse data configuring it for proper nesting and wild card implementations
 *
 * @param data
 */
Validator.prototype.parseData = function (data = {}) {
	let newData = {};

	Object.entries(data).forEach(([key, value]) => {
		if (typeof value === 'object') {
			value = this.parseData(value);
		}

		key = key.replace(/\*/g, '__asterisk__');

		newData[key] = value;
	});

	return newData;
};

module.exports = Validator;


'use strict';

const pipe = require('./pipeline/index.js');

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
const resolve = parameters => {
	let infinityProtector = 0;

	while((Array.isArray(parameters) || (parameters[0] ? Array.isArray(parameters[0]) : false)) && infinityProtector < 5) {
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
		first: () => parameters[0],
		second: () => parameters[1],
		after: start => parameters.slice(start),
		before: last => parameters.slice(0, last),
		between: (start, end) => parameters.slice(start, end),
		last: () => parameters[parameters.length],
		count: () => parameters.length,
		list: () => parameters,
		requireLength: (rule, count) => {
			if (parameters.length < count) {
				throw new Error(`Validation ${rule} $rule requires at least $count parameters.`);
			}
		}
	};
};

const bailOnFirstFailedRule = require('./pipeline/bailOnFirstFailedRule');
const sometimesRuleIsSkipped = require('./pipeline/sometimesRuleIsSkipped');
const resolveViaCallback = require('./pipeline/resolveViaCallback');
const resolveViaString = require('./pipeline/resolveViaString');
const resolveViaObject = require('./pipeline/resolveViaObject');

// Form
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

const FieldJudge  = function ({ attribute, validator, raw_field_rules}) {
	this.attribute = () => attribute;
	this.validator = () => validator;
	this.raw_field_rules = () => raw_field_rules;


	this.value = () => this.validator().data[this.attribute];

	/**
	 * Supporters
	 *
	 * @returns {*}
	 */
	this.form = () => this.validator().data;
	this.fields = () => Object.keys(this.validator()).data;

	/**
	 * RuleCollection.toPipes()
	 *
	 * Example: 'required|email|string'
	 *
	 * @returns {*}
	 */
	this.toPipes = () => raw_field_rules.includes('|') ? raw_field_rules : raw_field_rules.join('|');

	/**
	 * RuleCollection.toArray()
	 *
	 * Example: ['required', 'email', 'string']
	 *
	 * @returns {*}
	 */
	this.toArray = () => Array.isArray(raw_field_rules) ? raw_field_rules : raw_field_rules.split('|');

	/**
	 * Total number of rules for a given field
	 *
	 * @returns {*}
	 */
	this.count = () => this.toArray().length;
};

const RuleResolver = function (context) {
	/**
	 * Rule Level Data
	 * ----------------
	 * Rule Parameters
	 *
	 */
	this.value = context.value;
	this.attribute = context.attribute;
	this.parameters = resolve(context.parameters);
	this.fails = context.validator.customMessages[this.attribute] ;

	this.form = () => context.validator.data;
	this.errors = () => context.validator.errors();
	this.options = () => resolve(context.parameters);
	this.fields = () => Object.keys(context.validator.data);
	this.message = () => context.validator.messages[this.attribute];

	this.settings = {
		pipeline: [
			bailOnFirstFailedRule,
			sometimesRuleIsSkipped,
			resolveViaCallback,
			resolveViaString,
			resolveViaObject,
		],
		message: {
			filters: [
				str => str[0].toUpperCase() + str.slice(1)
			],
			replace: [
				['/_/g', ' '],
				['/:attribute/g', this.attribute]
			],
		}
	};
};

RuleApi.prototype.messageReplacer = function (find, replace) {
	if (typeof find !== 'string' || typeof replace !== 'string') {
		return console.error(`rule.addMessageReplacer(String find, String replace) wasnt passed two string arguments properly`);
	}

	this.settings.message.replace = [
		...this.settings.message.replace,
		[find, replace],
	];
};

RuleApi.prototype.messageFilter = function (filter) {
	if (typeof filter !== 'function') {
		return console.error(`rule.addMessageFilter(Fn filter) was not passed a filter function as its argument type `);
	}

	this.settings.message.filters = [...this.settings.message.filters, filter];
};

RuleApi.prototype.prettify = function (message = this.message(), { replace = [], filters = [] }) {
	filters = [...this.settings.message.filters, ...filters ];
	replace = [...this.settings.message.replace, ...replace ];

	/**
	 * Apply Replacers
	 */
	message = replace.reduce((string, [find, replace]) => string.replace(find, replace), message);

	/**
	 * Apply Filters
	 */
	message = filters.reduce((string, filter) => filter(string), message);

	/**
	 * Return The Prettified message
	 */
	return message;
};

RuleApi.prototype.push = function (attribute, message, replacers = []) {
	this.prettify(message)
};
RuleApi.prototype.fail = function (message) {
	if (typeof message === 'undefined') {
		message = this.message ? this.message : `${this.attribute} is invalid`;
	}

	// @TODO message replaces (Ex: ':attribute', replaced with this.attribute

	this.errors().add(this.attribute, message);
};

RuleApi.prototype.resolve = function (via) {
	pipe(this, [
		bailOnFirstFailedRule,
		sometimesRuleIsSkipped,
		resolveViaCallback,
		resolveViaString,
		resolveViaObject,
	], { via }).go();
};


const RuleCollector = context => new RuleApi(context);

module.exports = RuleCollector;
module.exports.default = RuleCollector;
module.exports.RuleCollector = RuleCollector;

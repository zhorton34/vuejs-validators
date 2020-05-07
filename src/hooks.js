const isEmpty = require('./helpers/isEmpty.js');

const Hooks = function (validator = {}) {
	this.life = {};

	/**
	 * Get Validator
	 *
	 * @returns {*}
	 */
	this.getValidator = function () {
		return validator;
	};

	/**
	 * Determine if there are any error messages.
	 */
	this.any = function () {
		return !isEmpty(this.list());
	};

	/**
	 * Determine if there are hooks for a given life cycle moment.
	 */
	this.has = function (moment) {
		return Object.keys(this.life).includes(moment)
			&& this.life[moment].length > 0
	};


	/**
	 * Get all the life cycle moments, with their array of callbacks
	 */
	this.all = function () {
		return this.life;
	};


	/**
	 * Array of messages for every field
	 */
	this.list = function (moment = false) {
		return moment
			? this.life[moment]
			: Object.keys(this.life)
				.map(moment => this.life[moment])
				.reduce((interactions, forMoment) => [ ...interactions,  ...forMoment ], []);
	};

	/**
	 * Get the first interaction for a given life cycle moment
	 */
	this.get = function (moment) {
		if (this.has(moment)) {
			return this.life[moment][0];
		}
	};

	/**
	 * Add moment interaction
	 * @param moment
	 * @param interaction
	 */
	this.add = function(moment, interaction) {
		this.life[moment] = Array.isArray(this.life[moment])
			? this.life[moment]
			: [];

		this.life[moment] = [...this.life[moment], interaction];
	};

	/**
	 * Set the raw life cycle
	 */
	this.set = function (cycle, interactions = []) {
		if (typeof cycle === 'object') {
			this.life = cycle;
		} else {
			this.life[cycle] = interactions;
		}
	};


	/**
	 * Remove interactions from all life cycle moments
	 * Or empty all interactions for specific life cycle moment
	 */
	this.forget = function (moment) {
		if (typeof moment === 'undefined') {
			this.life = {};
		} else {
			this.life[moment] = [];
		}
	};
};

const makeHookBag = (validator = {}) => new Hooks(validator);

module.exports = makeHookBag;

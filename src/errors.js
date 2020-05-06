const isEmpty = require('./helpers/isEmpty.js');

module.exports = function (validator) {
	this.messages = {};

	this.getValidator = function () {
		return validator;
	};

	/**
	 * Determine if there are any error messages.
	 */
	this.any = function () {
		return !isEmpty(this.messages);
	};

	/**
	 * Determine if there are messages for a given field.
	 */
	this.has = function (field) {
		return Object.keys(this.messages).includes(field)
			&& this.messages[field].length > 0
	};


	/**
	 * Get all of the raw messages for the errors.
	 */
	this.all = function () {
		return this.messages;
	};


	/**
	 * Array of messages for every field
	 */
	this.list = function (field) {
		if (typeof field === 'undefined') {
			return Array.isArray(this.messages)
				? this.messages.flat()
				: [];
		} else {
			return this.messages[field] ? this.messages[field] : [];
		}
	};

	/**
	 * Get the first message for a given field.
	 */
	this.get = function (field) {
		if (this.has(field)) {
			return this.messages[field][0];
		}
	};

	/**
	 * Add error messages for a given field
	 * @param field
	 * @param error
	 */
	this.add = function(field, error) {
		this.messages[field] = Array.isArray(this.messages[field])
			? this.messages[field]
			: [];

		this.messages[field].push(error);
	};

	/**
	 * Set the raw errors for the collection.
	 */
	this.set = function (errors, value = []) {
		if (typeof errors === 'object') {
			this.messages = errors;
		} else {
			this.messages[errors] = value;
		}
	};


	/**
	 * Remove messages from all errors or
	 * optionally for errors on a specific field.
	 */
	this.forget = function (field) {
		if (typeof field === 'undefined') {
			this.messages = {};
		} else {
			this.messages[field] = [];
		}
	};
};

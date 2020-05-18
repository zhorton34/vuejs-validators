
'use strict';

/**
 * Add message fields array of message
 *
 * @param field
 * @param message
 */
module.exports = function (field, message) {
	this.messages[field] = Array.isArray(this.messages[field]) ? this.messages[field] : [];

	this.messages[field].push(message);
};


'use strict';

/**
 * Array of messages for every field
 *
 * @param field
 *
 * @returns array
 */
module.exports = function (field) {
	return typeof field !== 'undefined'
		? this.messages[field]
		: Object.keys(this.messages)
			.map(field => this.messages[field])
			.reduce((list, messages) => [ ...list,  ...messages ], []);
};


'use strict';

/**
 * Get all messages as object
 * {
 *    field_name: ['message one', 'message two'],
 *    field_two: ['message_one', 'message_two']
 * }
 *
 * @returns mixed
 */
module.exports = function () {
	return this.messages;
};

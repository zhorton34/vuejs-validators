
'use strict';

/**
 * Set all messages or optionally set single fields array of messages.
 *
 * @param field
 * @param value (optional)
 *
 * @return void
 */
module.exports = function (field, value = []) {
	if (typeof field === 'object') {
		this.messages = field;
	} else {
		this.messages[field] = value;
	}
};

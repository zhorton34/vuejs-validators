
'use strict';

/**
 * Forget entire error messages object or specific fields list of messages
 *
 * @param field (optional)
 *
 * @return void
 */

module.exports = function (field) {
	if (typeof field === 'undefined') {
		this.messages = {};
	} else {
		this.messages[field] = [];
	}
};

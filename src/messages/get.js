
'use strict';

/**
 * Get the first message for a given field.
 *
 * @param field
 *
 * @return string
 */
module.exports = function (field) {
	if (this.has(field)) {
		return this.messages[field][0];
	}
};

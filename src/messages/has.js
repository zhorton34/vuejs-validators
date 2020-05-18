
'use strict';

/**
 * Determine if specific field has messages
 *
 * @returns boolean
 */
module.exports = function (field) {
	return Object.keys(this.messages).includes(field) && this.messages[field].length > 0;
};

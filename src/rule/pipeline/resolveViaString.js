
'use strict';

/**
 * form(data).rules({
 * 		email: ['email', 'required']
 * })
 */

module.exports = function resolveViaString(next) {
	const { via } = this.middleware;

	if (typeof via !== 'string') {
		next();
	}


	/** Most common validation type "required_if:one,two,thee" **/

	next();
};

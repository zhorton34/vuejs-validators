
'use strict';

/**
 * form(data).rules(
 * 		email: [
 * 			'email',
 * 			'required',
 * 		    (attribute, value, fail) => {
 * 		     	if (value !== value.toUpperCase()) {
 * 		     	  	fail(`${attribute} must be uppercase`);
 * 		     	}
 * 		    }
 *      ]
 * )
 */
module.exports = function resolveViaCallback(next) {
	const { via } = this.middleware;

	if (typeof via !== 'object') {
		next();
	}

	via(this.middleware.rule.attribute, this.middleware.rule.value, this.middleware.rule.fail);

	next();
};

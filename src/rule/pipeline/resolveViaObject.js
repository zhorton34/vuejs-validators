
'use strict';

/**
 * form(data).rules({
 * 		email: [
 * 			'email',
 * 			'required',
 * 			{
 * 		     	rule: RuleApiInstance => (true || false),
 * 		     	message: ':attribute is invalid`
 * 		    }
 *      ]
 * })
 */

module.exports = function resolveViaObject(next) {
	const { via } = this.middleware;

	if (typeof via !== 'object') {
		next();
	}

	const { rule } = via;

	if (rule(this.middleware.rule) === false) {
		if (typeof via.message === 'undefined') {
			this.middleware.rule.errors().add(
				this.middleware.rule.attribute,
				`${this.middleware.rule} is invalid`
			);
		}
		else {
			this.middleware.rule.errors().add(
				this.middleware.rule.attribute,
				via.message
			);
		}
	}

	next();
};


'use strict';

module.exports = function resolveViaImplicitRule(next) {
	const { rule, via } = this.middleware.rule;

	if (![
		// 'present',
		// 'filled',
		'accepted',
		'required',
		'required_with',
		'required_unless',
		'required_without',
		'required_with_all',
		'required_without_all',
	].includes(rule.options()));

	if (typeof via !== 'string') {
		next();
	}
};


'use strict';

module.exports = function bailOnFirstRuleFailure(next) {
	const { rule } = this.middleware;

	if (rule.raw.includes('bail') === false) {
		next();
	}

	if (rule.errors().has(rule.attribute) === false) {
		next();
	}
};


'use strict';

module.exports = function sometimesRuleIsSkipped(next) {
	const { rule } = this.middleware;

	if (rule.raw.includes('sometimes') === false) {
		next();
	}

	if (rule.fields().includes(rule.attribute)) {
		next();
	}
};

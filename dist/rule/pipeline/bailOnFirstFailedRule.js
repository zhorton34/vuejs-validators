'use strict';

module.exports = function bailOnFirstRuleFailure(next) {
  var rule = this.middleware.rule;

  if (rule.raw.includes('bail') === false) {
    next();
  }

  if (rule.errors().has(rule.attribute) === false) {
    next();
  }
};
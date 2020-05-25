'use strict';

module.exports = function sometimesRuleIsSkipped(next) {
  var rule = this.middleware.rule;

  if (rule.raw.includes('sometimes') === false) {
    next();
  }

  if (rule.fields().includes(rule.attribute)) {
    next();
  }
};
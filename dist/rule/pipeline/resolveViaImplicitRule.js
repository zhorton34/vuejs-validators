'use strict';

module.exports = function resolveViaImplicitRule(next) {
  var _this$middleware$rule = this.middleware.rule,
      rule = _this$middleware$rule.rule,
      via = _this$middleware$rule.via;
  if (![// 'present',
  // 'filled',
  'accepted', 'required', 'required_with', 'required_unless', 'required_without', 'required_with_all', 'required_without_all'].includes(rule.options())) ;

  if (typeof via !== 'string') {
    next();
  }
};
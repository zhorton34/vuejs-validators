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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function resolveViaObject(next) {
  var via = this.middleware.via;

  if (_typeof(via) !== 'object') {
    next();
  }

  var rule = via.rule;

  if (rule(this.middleware.rule) === false) {
    if (typeof via.message === 'undefined') {
      this.middleware.rule.errors().add(this.middleware.rule.attribute, "".concat(this.middleware.rule, " is invalid"));
    } else {
      this.middleware.rule.errors().add(this.middleware.rule.attribute, via.message);
    }
  }

  next();
};
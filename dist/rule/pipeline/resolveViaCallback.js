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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function resolveViaCallback(next) {
  var via = this.middleware.via;

  if (_typeof(via) !== 'object') {
    next();
  }

  via(this.middleware.rule.attribute, this.middleware.rule.value, this.middleware.rule.fail);
  next();
};
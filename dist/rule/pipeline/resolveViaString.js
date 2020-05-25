'use strict';
/**
 * form(data).rules({
 * 		email: ['email', 'required']
 * })
 */

module.exports = function resolveViaString(next) {
  var via = this.middleware.via;

  if (typeof via !== 'string') {
    next();
  }
  /** Most common validation type "required_if:one,two,thee" **/


  next();
};
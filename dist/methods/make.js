'use strict';
/**
 * Example function accepting any number of arguments
 *
 * @returns {*}
 */

module.exports = function make() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var customAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
};
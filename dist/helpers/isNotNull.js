'use strict';
/**
 * Determine if a value is null
 *
 * @param value
 * @returns boolean
 */

module.exports = function (value) {
  return value !== null && value !== 'null';
};
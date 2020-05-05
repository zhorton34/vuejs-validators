'use strict';
/**
 * Determine if a value is a big int
 *
 * @param value
 * @returns boolean
 */

module.exports = function (value) {
  return typeof value === 'bigint' || typeof BigInt(value) === 'bigint';
};
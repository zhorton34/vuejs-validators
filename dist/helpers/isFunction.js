"use strict";

/**
 * Determine if a value is a function
 *
 * @param value
 * @returns boolean
 */
module.exports = function (value) {
  return typeof value === 'function';
};
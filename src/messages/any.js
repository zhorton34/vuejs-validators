
'use strict';

const isEmpty = require('../helpers/isEmpty.js');

/**
 * Determine if there are any messages
 *
 * @returns boolean
 */
module.exports = function () {
	return !isEmpty(this.list());
};

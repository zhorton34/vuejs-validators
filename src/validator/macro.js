
'use strict';

/**
 * Extend Validator Prototype With Custom Function Using "Macro's"
 * (See Laravel Macros For In Depth Explanation)
 *
 * @param name
 * @param fn
 *
 * @return void
 */
module.exports = function (name, fn) {
	if (typeof this.constructor.prototype[name] !== 'undefined') {
		console.error("Cant extend validator with ".concat(name, " macro, it already exists"));
	} else {
		this[name] = fn;
		this.constructor.prototype[name] = fn;
	}
};

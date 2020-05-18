
'use strict';

/**
 * Extend Message Bag Prototype With Custom Function Using "Macro's"
 * (See Laravel Macros For In Depth Explanation)
 *
 * @param name
 * @param fn
 *
 * @return void
 */
module.exports = function (name, fn) {
	if (Object.keys(this.constructor.prototype).includes(name)) {
		console.error("Cant extend message bag with ".concat(name, " macro, it already exists"));
	} else {
		this.constructor.prototype[name] = fn;
	}
};

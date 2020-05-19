
'use strict';

/**
 * Similar to "macro" function, with ability to forcibly overwrite base prototype methods and existing macro methods
 * (See Laravel Macros For In Depth Explanation)
 *
 * @param name
 * @param fn
 *
 * @return void
 */
module.exports = function (name, fn) {
	console.warn(`
		Forcing local macro to implement ${name} method -- Move forward with caution.
		We recommend using "localMacro" in place of "forceLocalMacro" method if you do not 
		need to override pre-existing core behavior.
	`);

	this[name] = fn;
};

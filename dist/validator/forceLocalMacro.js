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
  console.warn("\n\t\tForcing local macro to implement ".concat(name, " method -- Move forward with caution.\n\t\tWe recommend using \"localMacro\" in place of \"forceLocalMacro\" method if you do not \n\t\tneed to override pre-existing core behavior.\n\t"));
  this[name] = fn;
};
var validator =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/errors.js":
/*!************************!*\
  !*** ./dist/errors.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar isEmpty = __webpack_require__(/*! ./helpers/isEmpty.js */ \"./dist/helpers/isEmpty.js\");\n\nvar Errors = function Errors(validator) {\n  this.messages = {};\n  /**\n   * Get Validator\n   *\n   * @returns {*}\n   */\n\n  this.getValidator = function () {\n    return validator;\n  };\n  /**\n   * Determine if there are any error messages.\n   */\n\n\n  this.any = function () {\n    return !isEmpty(this.list());\n  };\n  /**\n   * Determine if there are messages for a given field.\n   */\n\n\n  this.has = function (field) {\n    return Object.keys(this.messages).includes(field) && this.messages[field].length > 0;\n  };\n  /**\n   * Get all of the raw messages for the errors.\n   */\n\n\n  this.all = function () {\n    return this.messages;\n  };\n  /**\n   * Array of messages for every field\n   */\n\n\n  this.list = function () {\n    var _this = this;\n\n    var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n    return field ? this.messages[field] : Object.keys(this.messages).map(function (field) {\n      return _this.messages[field];\n    }).reduce(function (list, messages) {\n      return [].concat(_toConsumableArray(list), _toConsumableArray(messages));\n    }, []);\n  };\n  /**\n   * Get the first message for a given field.\n   */\n\n\n  this.get = function (field) {\n    if (this.has(field)) {\n      return this.messages[field][0];\n    }\n  };\n  /**\n   * Add error messages for a given field\n   * @param field\n   * @param error\n   */\n\n\n  this.add = function (field, error) {\n    this.messages[field] = Array.isArray(this.messages[field]) ? this.messages[field] : [];\n    this.messages[field].push(error);\n  };\n  /**\n   * Set the raw errors for the collection.\n   */\n\n\n  this.set = function (errors) {\n    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n    if (_typeof(errors) === 'object') {\n      this.messages = errors;\n    } else {\n      this.messages[errors] = value;\n    }\n  };\n  /**\n   * Remove messages from all errors or\n   * optionally for errors on a specific field.\n   */\n\n\n  this.forget = function (field) {\n    if (typeof field === 'undefined') {\n      this.messages = {};\n    } else {\n      this.messages[field] = [];\n    }\n  };\n};\n\nvar makeErrorBag = function makeErrorBag() {\n  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return new Errors(validator);\n};\n\nmodule.exports = makeErrorBag;\n\n//# sourceURL=webpack://validator/./dist/errors.js?");

/***/ }),

/***/ "./dist/factory.js":
/*!*************************!*\
  !*** ./dist/factory.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Validator = __webpack_require__(/*! ./validator */ \"./dist/validator.js\");\n\nvar Factory = function Factory() {\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var translator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  return new Validator().make(data, rules, messages, translator);\n};\n\nmodule.exports = Factory;\n\n//# sourceURL=webpack://validator/./dist/factory.js?");

/***/ }),

/***/ "./dist/helpers/isArray.js":
/*!*********************************!*\
  !*** ./dist/helpers/isArray.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determine if a value is an array\n *\n * @param value\n * @returns boolean\n */\n\nmodule.exports = function (value) {\n  return Array.isArray(value);\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isArray.js?");

/***/ }),

/***/ "./dist/helpers/isBigInt.js":
/*!**********************************!*\
  !*** ./dist/helpers/isBigInt.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determine if a value is a big int\n *\n * @param value\n * @returns boolean\n */\n\nmodule.exports = function (value) {\n  return typeof value === 'bigint' || typeof BigInt(value) === 'bigint';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isBigInt.js?");

/***/ }),

/***/ "./dist/helpers/isBool.js":
/*!********************************!*\
  !*** ./dist/helpers/isBool.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determine if a value is a boolean\n *\n * @param value\n * @returns boolean\n */\n\nmodule.exports = function (value) {\n  return typeof value === 'boolean';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isBool.js?");

/***/ }),

/***/ "./dist/helpers/isBooly.js":
/*!*********************************!*\
  !*** ./dist/helpers/isBooly.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isBool = __webpack_require__(/*! ./isBool */ \"./dist/helpers/isBool.js\");\n\nvar isFalsy = __webpack_require__(/*! ./isFalsy */ \"./dist/helpers/isFalsy.js\");\n\nvar isTruthy = __webpack_require__(/*! ./isTruthy */ \"./dist/helpers/isTruthy.js\");\n/**\n * Determine if a value is boolean, truthy, or falsy\n *\n * @param value\n * @returns boolean\n */\n\n\nmodule.exports = function (value) {\n  return isBool(value) || isFalsy(value) || isTruthy(value);\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isBooly.js?");

/***/ }),

/***/ "./dist/helpers/isEmpty.js":
/*!*********************************!*\
  !*** ./dist/helpers/isEmpty.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar isBooly = __webpack_require__(/*! ./isBooly */ \"./dist/helpers/isBooly.js\");\n\nvar isNumeric = __webpack_require__(/*! ./isNumeric */ \"./dist/helpers/isNumeric.js\");\n/**\n * Determine if a value is empty\n *\n * @param value\n * @returns boolean\n */\n\n\nmodule.exports = function (value) {\n  if (value === null || value === '') return true;\n  if (Array.isArray(value)) return value.length === 0;\n  if (_typeof(value) === 'object') return Object.keys(value).length === 0;\n  if (isNumeric(value) || isBooly(value)) return false;\n  return true;\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isEmpty.js?");

/***/ }),

/***/ "./dist/helpers/isFalsy.js":
/*!*********************************!*\
  !*** ./dist/helpers/isFalsy.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determine if a value is Falsy\n *\n * @param value\n * @returns boolean\n */\nmodule.exports = function (value) {\n  var falsy = [0, '0', 'no', 'No', 'NO', 'off', 'Off', 'OFF', false, 'false', 'False', 'FALSE'];\n  return falsy.includes(value);\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isFalsy.js?");

/***/ }),

/***/ "./dist/helpers/isNotEmpty.js":
/*!************************************!*\
  !*** ./dist/helpers/isNotEmpty.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isEmpty = __webpack_require__(/*! ./isEmpty */ \"./dist/helpers/isEmpty.js\");\n/**\n * Determine if a value is empty\n *\n * @param value\n * @returns boolean\n */\n\n\nmodule.exports = function (value) {\n  return isEmpty(value) === false;\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isNotEmpty.js?");

/***/ }),

/***/ "./dist/helpers/isNotNull.js":
/*!***********************************!*\
  !*** ./dist/helpers/isNotNull.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determine if a value is null\n *\n * @param value\n * @returns boolean\n */\n\nmodule.exports = function (value) {\n  return value !== null && value !== 'null';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isNotNull.js?");

/***/ }),

/***/ "./dist/helpers/isNotNumeric.js":
/*!**************************************!*\
  !*** ./dist/helpers/isNotNumeric.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isBigInt = __webpack_require__(/*! ./isBigInt */ \"./dist/helpers/isBigInt.js\");\n/**\n * Determine if a value is NOT numeric\n *\n * @param value\n * @returns boolean\n */\n\n\nmodule.exports = function (value) {\n  return Number.isNaN(Number(value)) && !isBigInt(value);\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isNotNumeric.js?");

/***/ }),

/***/ "./dist/helpers/isNotUndefined.js":
/*!****************************************!*\
  !*** ./dist/helpers/isNotUndefined.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determine if a value is undefined, if so return false\n *\n * @param value\n * @returns boolean\n */\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nmodule.exports = function (value) {\n  return _typeof(value) !== undefined && typeof value !== 'undefined';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isNotUndefined.js?");

/***/ }),

/***/ "./dist/helpers/isNull.js":
/*!********************************!*\
  !*** ./dist/helpers/isNull.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determine if a value is null\n *\n * @param value\n * @returns boolean\n */\n\nmodule.exports = function (value) {\n  return value === null || value === 'null';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isNull.js?");

/***/ }),

/***/ "./dist/helpers/isNumber.js":
/*!**********************************!*\
  !*** ./dist/helpers/isNumber.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determine if a value is a number\n *\n * @param value\n * @returns boolean\n */\nmodule.exports = function (value) {\n  return typeof value === 'number';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isNumber.js?");

/***/ }),

/***/ "./dist/helpers/isNumeric.js":
/*!***********************************!*\
  !*** ./dist/helpers/isNumeric.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isNumber = __webpack_require__(/*! ./isNumber */ \"./dist/helpers/isNumber.js\");\n\nvar isBigInt = __webpack_require__(/*! ./isBigInt */ \"./dist/helpers/isBigInt.js\");\n/**\n * Determine if a value is numeric (a number when casted to a number)\n *\n * @param value\n * @returns boolean\n */\n\n\nmodule.exports = function (value) {\n  return isNumber(value) || typeof Number(value) === 'number' || isBigInt(value);\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isNumeric.js?");

/***/ }),

/***/ "./dist/helpers/isObject.js":
/*!**********************************!*\
  !*** ./dist/helpers/isObject.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar isNull = __webpack_require__(/*! ./isNull */ \"./dist/helpers/isNull.js\");\n\nvar isArray = __webpack_require__(/*! ./isArray */ \"./dist/helpers/isArray.js\");\n/**\n * Determine if a value is a keyed object\n *\n * @param value\n * @returns boolean\n */\n\n\nmodule.exports = function (value) {\n  return !isNull(value) && !isArray(value) && _typeof(value) === 'object';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isObject.js?");

/***/ }),

/***/ "./dist/helpers/isString.js":
/*!**********************************!*\
  !*** ./dist/helpers/isString.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (value) {\n  return typeof value === 'string';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isString.js?");

/***/ }),

/***/ "./dist/helpers/isTruthy.js":
/*!**********************************!*\
  !*** ./dist/helpers/isTruthy.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determine if a value is Truthy\n *\n * @param value\n * @returns boolean\n */\nmodule.exports = function (value) {\n  var truthy = [1, '1', 'on', 'On', 'ON', 'yes', 'Yes', 'YES', true, 'true', 'True', 'TRUE'];\n  return truthy.includes(value);\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isTruthy.js?");

/***/ }),

/***/ "./dist/helpers/isUndefined.js":
/*!*************************************!*\
  !*** ./dist/helpers/isUndefined.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Determine if a value is undefined\n *\n * @param value\n * @returns boolean\n */\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nmodule.exports = function (value) {\n  return _typeof(value) === undefined || typeof value === 'undefined';\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/isUndefined.js?");

/***/ }),

/***/ "./dist/helpers/variadic.js":
/*!**********************************!*\
  !*** ./dist/helpers/variadic.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Variadic helper function\n *\n * @param args\n * @returns {*}\n */\n\nmodule.exports = function variadic(args) {\n  if (Array.isArray(args[0])) {\n    return args[0];\n  }\n\n  return args;\n};\n\n//# sourceURL=webpack://validator/./dist/helpers/variadic.js?");

/***/ }),

/***/ "./dist/hooks.js":
/*!***********************!*\
  !*** ./dist/hooks.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar isEmpty = __webpack_require__(/*! ./helpers/isEmpty.js */ \"./dist/helpers/isEmpty.js\");\n\nvar Hooks = function Hooks() {\n  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  this.life = {};\n  /**\n   * Get Validator\n   *\n   * @returns {*}\n   */\n\n  this.getValidator = function () {\n    return validator;\n  };\n  /**\n   * Determine if there are any error messages.\n   */\n\n\n  this.any = function () {\n    return !isEmpty(this.list());\n  };\n  /**\n   * Determine if there are hooks for a given life cycle moment.\n   */\n\n\n  this.has = function (moment) {\n    return Object.keys(this.life).includes(moment) && this.life[moment].length > 0;\n  };\n  /**\n   * Get all the life cycle moments, with their array of callbacks\n   */\n\n\n  this.all = function () {\n    return this.life;\n  };\n  /**\n   * Array of messages for every field\n   */\n\n\n  this.list = function () {\n    var _this = this;\n\n    var moment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n    return moment ? this.life[moment] : Object.keys(this.life).map(function (moment) {\n      return _this.life[moment];\n    }).reduce(function (interactions, forMoment) {\n      return [].concat(_toConsumableArray(interactions), _toConsumableArray(forMoment));\n    }, []);\n  };\n  /**\n   * Get the first interaction for a given life cycle moment\n   */\n\n\n  this.get = function (moment) {\n    if (this.has(moment)) {\n      return this.life[moment][0];\n    }\n  };\n  /**\n   * Add moment interaction\n   * @param moment\n   * @param interaction\n   */\n\n\n  this.add = function (moment, interaction) {\n    this.life[moment] = Array.isArray(this.life[moment]) ? this.life[moment] : [];\n    this.life[moment] = [].concat(_toConsumableArray(this.life[moment]), [interaction]);\n  };\n  /**\n   * Set the raw life cycle\n   */\n\n\n  this.set = function (cycle) {\n    var interactions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n\n    if (_typeof(cycle) === 'object') {\n      this.life = cycle;\n    } else {\n      this.life[cycle] = interactions;\n    }\n  };\n  /**\n   * Remove interactions from all life cycle moments\n   * Or empty all interactions for specific life cycle moment\n   */\n\n\n  this.forget = function (moment) {\n    if (typeof moment === 'undefined') {\n      this.life = {};\n    } else {\n      this.life[moment] = [];\n    }\n  };\n};\n\nvar makeHookBag = function makeHookBag() {\n  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return new Hooks(validator);\n};\n\nmodule.exports = makeHookBag;\n\n//# sourceURL=webpack://validator/./dist/hooks.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Factory = __webpack_require__(/*! ./factory */ \"./dist/factory.js\");\n\nvar makeErrorBag = __webpack_require__(/*! ./errors */ \"./dist/errors.js\");\n\nvar validator = function validator() {\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var translator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  return new Factory(data, rules, messages, translator);\n};\n\nmodule.exports = validator;\nmodule.exports.Validator = Factory;\nmodule.exports[\"default\"] = validator;\nmodule.exports.validator = validator;\nmodule.exports.makeErrorBag = makeErrorBag;\n\n//# sourceURL=webpack://validator/./dist/index.js?");

/***/ }),

/***/ "./dist/messages.js":
/*!**************************!*\
  !*** ./dist/messages.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  \"boolean\": ':attribute must be a boolean',\n  number: ':attribute must be a number',\n  numeric: ':attribute must be numeric',\n  accepted: \":attribute is not accepted\",\n  same: ':attribute must be the same as :same',\n  different: ':attribute must be different than :different',\n  confirmed: ':attribute must have the same value as :attribute confirmation field',\n  min: \":attribute isn't allowed to be less than :min characters\",\n  max: \":attribute isn't allowed to be greater than :max characters\",\n  within: \":attribute does not exist in :within\",\n  not_within: ':attribute should not be value within :not_within',\n  email: \":attribute must be an email\",\n  phone: \":attribute must be a phone number\",\n  required: \":attribute is required\",\n  regex: \":attribute does not match proper pattern\",\n  not_regex: \":attribute should not match the given pattern pattern\",\n  url: ':attribute is not a valid url',\n  alpha: ':attribute must be entirely alphabetic characters',\n  alpha_dash: ':attribute must be alpha-numeric characters with dashes and underscores',\n  alpha_num: ':attribute must be entirely alpha numeric characters',\n  array: ':attribute must be an array',\n  string: ':attribute must be a string',\n  between: ':attribute must be between :between',\n  json: ':attribute must be a valid json string',\n  digits: ':attribute must be numeric and must be :digits numbers long',\n  digits_between: ':attribute must be numeric and have length between :lower and :upper',\n  distinct: ':attribute must have distinct set of values, there should be no duplicates',\n  integer: ':attribute must be an integer',\n  ends_with: ':attribute must end with :ends_with or any other defined options',\n  starts_with: ':attribute must start with :starts_with or any other of the defined options',\n  ip: ':attribute is not a valid ip4 or ip6 address',\n  ipv4: ':attribute is not a valid ip4 address',\n  ipv6: ':attribute is not a valid ip6 address'\n};\n\n//# sourceURL=webpack://validator/./dist/messages.js?");

/***/ }),

/***/ "./dist/methods/parseData.js":
/*!***********************************!*\
  !*** ./dist/methods/parseData.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nmodule.exports = function parseData() {\n  var _this = this;\n\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var newData = {};\n  Object.entries(data).forEach(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        key = _ref2[0],\n        value = _ref2[1];\n\n    if (_typeof(value) === 'object') {\n      value = _this.parseData(value);\n    }\n\n    key = key.replace(/\\*/g, '__asterisk__');\n    newData[key] = value;\n  });\n  return newData;\n};\n\n//# sourceURL=webpack://validator/./dist/methods/parseData.js?");

/***/ }),

/***/ "./dist/parseRule.js":
/*!***************************!*\
  !*** ./dist/parseRule.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar isArray = __webpack_require__(/*! ./helpers/isArray */ \"./dist/helpers/isArray.js\");\n\nvar isObject = __webpack_require__(/*! ./helpers/isObject */ \"./dist/helpers/isObject.js\");\n\nmodule.exports = function ParseRule(validator, field, rules) {\n  return pipe(field, validator, rules).into(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 5),\n        attribute = _ref2[0],\n        value = _ref2[1],\n        parameters = _ref2[2],\n        rule = _ref2[3],\n        name = _ref2[4];\n\n    return {\n      attribute: attribute,\n      value: value,\n      parameters: parameters,\n      rule: rule,\n      name: name,\n      message: function message() {\n        return resolveMessage({\n          name: name,\n          attribute: attribute,\n          parameters: parameters,\n          validator: validator\n        });\n      },\n      validator: validator\n    };\n  });\n};\n\nvar resolveMessage = function resolveMessage(_ref3) {\n  var attribute = _ref3.attribute,\n      name = _ref3.name,\n      validator = _ref3.validator,\n      parameters = _ref3.parameters;\n  var custom = validator.customMessages,\n      global = validator.messages;\n  /**\n   * Example: Replacers\n   * ~~~~~~~~~~~~~~~~~~\n   * \":attribute must not be greater than :max characters\"\n   * let replacers = ['field_name', '8']\n   * \"field_name must not be greater than 8 characters\"\n   */\n\n  var capitalize = function capitalize(string) {\n    return string[0].toUpperCase() + string.slice(1);\n  };\n\n  return [attribute].concat(_toConsumableArray(parameters[0] ? parameters[0].split(',') : [])).reduce(function (message, replace) {\n    return capitalize(message.replace(/:[a-z]{1,}/i, replace.replace(/_/g, ' ')));\n  }, custom[\"\".concat(attribute, \".\").concat(name)] ? custom[\"\".concat(attribute, \".\").concat(name)] : global[name]);\n};\n\nvar pipe = function pipe(field, validator, rules) {\n  var array = Array.isArray(rules) ? rules : rules.split('|');\n  return {\n    into: function into(shape) {\n      return array.map(function (item) {\n        return item.split(':');\n      }).map(function (_ref4) {\n        var _ref5 = _toArray(_ref4),\n            rule = _ref5[0],\n            args = _ref5.slice(1);\n\n        return [field, validator.data[field], args, validator.rules[rule], rule];\n      }).map(shape);\n    }\n  };\n};\n\n//# sourceURL=webpack://validator/./dist/parseRule.js?");

/***/ }),

/***/ "./dist/rules.js":
/*!***********************!*\
  !*** ./dist/rules.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar isBool = __webpack_require__(/*! ./helpers/isBool */ \"./dist/helpers/isBool.js\");\n\nvar isNull = __webpack_require__(/*! ./helpers/isNull */ \"./dist/helpers/isNull.js\");\n\nvar isBooly = __webpack_require__(/*! ./helpers/isBooly */ \"./dist/helpers/isBooly.js\");\n\nvar isFalsy = __webpack_require__(/*! ./helpers/isFalsy */ \"./dist/helpers/isFalsy.js\");\n\nvar isEmpty = __webpack_require__(/*! ./helpers/isEmpty */ \"./dist/helpers/isEmpty.js\");\n\nvar isString = __webpack_require__(/*! ./helpers/isString */ \"./dist/helpers/isString.js\");\n\nvar isNumber = __webpack_require__(/*! ./helpers/isNumber */ \"./dist/helpers/isNumber.js\");\n\nvar isTruthy = __webpack_require__(/*! ./helpers/isTruthy */ \"./dist/helpers/isTruthy.js\");\n\nvar isNotNull = __webpack_require__(/*! ./helpers/isNotNull */ \"./dist/helpers/isNotNull.js\");\n\nvar isNumeric = __webpack_require__(/*! ./helpers/isNumeric */ \"./dist/helpers/isNumeric.js\");\n\nvar isNotEmpty = __webpack_require__(/*! ./helpers/isNotEmpty */ \"./dist/helpers/isNotEmpty.js\");\n\nvar isUndefined = __webpack_require__(/*! ./helpers/isUndefined */ \"./dist/helpers/isUndefined.js\");\n\nvar isNotNumeric = __webpack_require__(/*! ./helpers/isNotNumeric */ \"./dist/helpers/isNotNumeric.js\");\n\nvar isNotUndefined = __webpack_require__(/*! ./helpers/isNotUndefined */ \"./dist/helpers/isNotUndefined.js\");\n\nmodule.exports = {\n  \"boolean\": function boolean(_ref) {\n    var value = _ref.value;\n    return isBooly(value);\n  },\n  number: function number(_ref2) {\n    var value = _ref2.value;\n    return isNumber(value);\n  },\n  numeric: function numeric(_ref3) {\n    var value = _ref3.value;\n    return isNumeric(value);\n  },\n  accepted: function accepted(_ref4) {\n    var value = _ref4.value;\n    return isTruthy(value);\n  },\n  ends_with: function ends_with(_ref5) {\n    var value = _ref5.value,\n        _ref5$parameters = _slicedToArray(_ref5.parameters, 1),\n        list = _ref5$parameters[0];\n\n    return isString(value) && list.split(',').some(function (check) {\n      return value.endsWith(check);\n    });\n  },\n  starts_with: function starts_with(_ref6) {\n    var value = _ref6.value,\n        _ref6$parameters = _slicedToArray(_ref6.parameters, 1),\n        list = _ref6$parameters[0];\n\n    return isString(value) && list.split(',').some(function (check) {\n      return value.startsWith(check);\n    });\n  },\n  same: function same(_ref7) {\n    var value = _ref7.value,\n        parameters = _ref7.parameters,\n        validator = _ref7.validator;\n    return value === validator.data[parameters[0]];\n  },\n  min: function min(_ref8) {\n    var value = _ref8.value,\n        parameters = _ref8.parameters;\n    return value.length >= parameters[0];\n  },\n  max: function max(_ref9) {\n    var value = _ref9.value,\n        parameters = _ref9.parameters;\n    return value.length <= parameters[0];\n  },\n  within: function within(_ref10) {\n    var value = _ref10.value,\n        parameters = _ref10.parameters;\n    return parameters[0].split(',').includes(value);\n  },\n  not_within: function not_within(_ref11) {\n    var value = _ref11.value,\n        parameters = _ref11.parameters;\n    return !parameters[0].split(',').includes(value);\n  },\n  email: function email(_ref12) {\n    var value = _ref12.value;\n    return /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,8})+$/.test(value);\n  },\n  phone: function phone(_ref13) {\n    var value = _ref13.value;\n    return /^((\\+\\d{1,3}(-| )?\\(?\\d\\)?(-| )?\\d{1,3})|(\\(?\\d{2,3}\\)?))(-| )?(\\d{3,4})(-| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$/.test(value);\n  },\n  required: function required(_ref14) {\n    var value = _ref14.value;\n    return true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value));\n  },\n  regex: function regex(_ref15) {\n    var value = _ref15.value,\n        parameters = _ref15.parameters;\n    return parameters[0].test(value);\n  },\n  not_regex: function not_regex(_ref16) {\n    var value = _ref16.value,\n        parameters = _ref16.parameters;\n    return !parameters[0].test(value);\n  },\n  url: function url(_ref17) {\n    var value = _ref17.value;\n    return /https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)/.test(value);\n  },\n  alpha: function alpha(_ref18) {\n    var value = _ref18.value;\n    return /^[a-zA-Z]*$/.test(value);\n  },\n  alpha_dash: function alpha_dash(_ref19) {\n    var value = _ref19.value;\n    return /^[a-zA-Z0-9-_]+$/.test(value);\n  },\n  alpha_num: function alpha_num(_ref20) {\n    var value = _ref20.value;\n    return /^[a-zA-Z0-9]*$/.test(value);\n  },\n  array: function array(_ref21) {\n    var value = _ref21.value;\n    return Array.isArray(value);\n  },\n  string: function string(_ref22) {\n    var value = _ref22.value;\n    return isString(value);\n  },\n  distinct: function distinct(_ref23) {\n    var value = _ref23.value;\n    return Array.isArray(value) && new Set(value).size === value.length;\n  },\n  integer: function integer(_ref24) {\n    var value = _ref24.value;\n    return !isNaN(Number(value)) && isNumeric(value) && Number.isInteger(Number(value));\n  },\n  different: function different(_ref25) {\n    var value = _ref25.value,\n        parameters = _ref25.parameters,\n        validator = _ref25.validator;\n    return value !== validator.data[parameters[0]];\n  },\n  confirmed: function confirmed(_ref26) {\n    var attribute = _ref26.attribute,\n        value = _ref26.value,\n        validator = _ref26.validator;\n    return Object.keys(validator.data).includes(\"\".concat(attribute, \"_confirmation\")) && value === validator.data[\"\".concat(attribute, \"_confirmation\")];\n  },\n  ip: function ip(_ref27) {\n    var value = _ref27.value;\n    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value) || /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);\n  },\n  ipv4: function ipv4(_ref28) {\n    var value = _ref28.value;\n    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);\n  },\n  ipv6: function ipv6(_ref29) {\n    var value = _ref29.value;\n    return /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/.test(value);\n  },\n  between: function between(_ref30) {\n    var value = _ref30.value,\n        _ref30$parameters = _slicedToArray(_ref30.parameters, 1),\n        _between = _ref30$parameters[0];\n\n    var _between$split = _between.split(','),\n        _between$split2 = _slicedToArray(_between$split, 2),\n        lower = _between$split2[0],\n        upper = _between$split2[1];\n\n    return Boolean(Number(lower) < Number(value) && Number(upper) > Number(value));\n  },\n  json: function json(_ref31) {\n    var value = _ref31.value;\n    value = typeof value !== \"string\" ? JSON.stringify(value) : value;\n\n    try {\n      value = JSON.parse(value);\n    } catch (e) {\n      return false;\n    }\n\n    return _typeof(value) === \"object\" && value !== null;\n  },\n  digits: function digits(_ref32) {\n    var value = _ref32.value,\n        _ref32$parameters = _slicedToArray(_ref32.parameters, 1),\n        length = _ref32$parameters[0];\n\n    return isNumeric(value) && String(value).length === Number(length) && !isNaN(Number(value));\n  },\n  digits_between: function digits_between(_ref33) {\n    var value = _ref33.value,\n        _ref33$parameters = _slicedToArray(_ref33.parameters, 1),\n        between = _ref33$parameters[0];\n\n    var _between$split3 = between.split(','),\n        _between$split4 = _slicedToArray(_between$split3, 2),\n        lower = _between$split4[0],\n        upper = _between$split4[1];\n\n    if (isNaN(Number(value)) || !isNumeric(value)) return false;\n    var check = Number(String(value).length);\n    return Boolean(Number(lower) < check && Number(upper) > check);\n  }\n};\n\n//# sourceURL=webpack://validator/./dist/rules.js?");

/***/ }),

/***/ "./dist/validator.js":
/*!***************************!*\
  !*** ./dist/validator.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar RULES = __webpack_require__(/*! ./rules */ \"./dist/rules.js\");\n\nvar makeHookBag = __webpack_require__(/*! ./hooks */ \"./dist/hooks.js\");\n\nvar MESSAGES = __webpack_require__(/*! ./messages */ \"./dist/messages.js\");\n\nvar ParseRule = __webpack_require__(/*! ./parseRule */ \"./dist/parseRule.js\");\n\nvar makeErrorBag = __webpack_require__(/*! ./errors */ \"./dist/errors.js\");\n\nvar variadic = __webpack_require__(/*! ./helpers/variadic */ \"./dist/helpers/variadic.js\");\n\nvar Validator = function Validator() {\n  this.data = {};\n  this.translator = {};\n  this.rules = _objectSpread({}, RULES);\n  this.messages = _objectSpread({}, MESSAGES);\n  this.hookBag = makeHookBag(this);\n  this.errorBag = makeErrorBag(this);\n};\n\nValidator.prototype.parseData = __webpack_require__(/*! ./methods/parseData */ \"./dist/methods/parseData.js\");\n\nValidator.prototype.hooks = function () {\n  return this.hookBag;\n};\n\nValidator.prototype.hookInto = function (moment) {\n  var _this = this;\n\n  if (this.hooks().has(moment)) {\n    this.hooks().list(moment).forEach(function (event) {\n      return event(_this);\n    });\n  }\n\n  return this;\n};\n\nValidator.prototype.errors = function () {\n  return this.errorBag;\n};\n/**\n * Make Validator\n *\n * @param data\n * @param rules\n * @param messages\n * @param translator\n * @returns {Validator}\n */\n\n\nValidator.prototype.make = function () {\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var translator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  this.parseRules = rules;\n  this.translator = translator;\n  this.customMessages = messages;\n  this.data = this.parseData(data);\n  return this;\n};\n\nValidator.prototype.addMessage = function (field, value) {\n  try {\n    this.customMessages[field] = value;\n  } catch (_unused) {\n    console.error(\"Was not able to add validation customMessages[\".concat(field, \"]: \").concat(value));\n  }\n\n  return this;\n};\n\nValidator.prototype.addRule = function (field, value) {\n  try {\n    this.parseRules[field] = value;\n  } catch (_unused2) {\n    console.error(\"Was not able to add validation parseRules[\".concat(field, \"]: \").concat(value));\n  }\n\n  return this;\n};\n\nValidator.prototype.addData = function (field, value) {\n  try {\n    this.data[field] = value;\n  } catch (_unused3) {\n    console.error(\"Was not able to add validation data[\".concat(field, \"]: \").concat(value));\n  }\n\n  return this;\n};\n/**\n * Set Data Being Validated\n *\n * @param data\n * @returns {Validator}\n */\n\n\nValidator.prototype.setData = function () {\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  this.data = data;\n  return this;\n};\n/**\n * Set Validation Rules\n *\n * @param rules\n * @returns {Validator}\n */\n\n\nValidator.prototype.setRules = function () {\n  var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  this.parseRules = rules;\n  return this;\n};\n/**\n * Set Validation Messages\n *\n * @param messages\n * @returns {Validator}\n */\n\n\nValidator.prototype.setMessages = function () {\n  var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  this.customMessages = messages;\n  return this;\n};\n/**\n * Extend Validator With Custom Rules\n * @param parameters\n * @returns {Validator}\n */\n\n\nValidator.prototype.extend = function () {\n  var _this2 = this;\n\n  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {\n    parameters[_key] = arguments[_key];\n  }\n\n  parameters = variadic.apply(void 0, _toConsumableArray(parameters));\n\n  if (typeof parameters[0] === 'string') {\n    var _parameters = parameters,\n        _parameters2 = _slicedToArray(_parameters, 3),\n        key = _parameters2[0],\n        message = _parameters2[1],\n        rule = _parameters2[2];\n\n    this.rules = _objectSpread(_objectSpread({}, this.rules), {}, _defineProperty({}, key, rule));\n    this.messages = _objectSpread(_objectSpread({}, this.messages), {}, _defineProperty({}, key, message));\n  } else if (_typeof(parameters) === 'object') {\n    Object.entries(parameters).forEach(function (_ref) {\n      var _ref2 = _slicedToArray(_ref, 2),\n          key = _ref2[0],\n          _ref2$ = _slicedToArray(_ref2[1], 2),\n          message = _ref2$[0],\n          rule = _ref2$[1];\n\n      _this2.rules = _objectSpread(_objectSpread({}, _this2.rules), {}, _defineProperty({}, key, rule));\n      _this2.messages = _objectSpread(_objectSpread({}, _this2.messages), {}, _defineProperty({}, key, message));\n    });\n  }\n\n  return this;\n};\n/**\n * Add before for validation hook/callback\n *\n * @param callback\n * @returns {Validator}\n */\n\n\nValidator.prototype.before = function (callback) {\n  this.hooks().add('before', callback);\n  return this;\n};\n/**\n * Add after validation hook/callback\n *\n * @param callback\n * @returns {Validator}\n */\n\n\nValidator.prototype.after = function (callback) {\n  this.hooks().add('after', callback);\n  return this;\n};\n/**\n * Add failed validation hook/callback\n *\n * @param callback\n * @returns {Validator}\n */\n\n\nValidator.prototype.failed = function (callback) {\n  this.hooks().add('failed', callback);\n  return this;\n};\n/**\n * Add passed validation hook/callback\n *\n * @param callback\n * @returns {Validator}\n */\n\n\nValidator.prototype.passed = function (callback) {\n  this.hooks().add('passed', callback);\n  return this;\n};\n/**\n * Prepare To Validate Hooks\n *\n * @returns {Validator}\n */\n\n\nValidator.prototype.beforeValidation = function () {\n  var _this3 = this;\n\n  this.checks = Object.entries(this.parseRules).reduce(function (completed, _ref3) {\n    var _ref4 = _slicedToArray(_ref3, 2),\n        field = _ref4[0],\n        rules = _ref4[1];\n\n    return [].concat(_toConsumableArray(completed), _toConsumableArray(ParseRule(_this3, field, rules)));\n  }, []);\n  return this;\n};\n/**\n * Validate Hook\n * ~~~~~~~~~~~~~~\n * Trigger prepareToValidate Hooks.\n * Trigger Validation Rules\n * Trigger AfterValidation Hooks\n */\n\n\nValidator.prototype.validate = function () {\n  return this.beforeValidation().hookInto('before').checkRulesAndFillErrorBag().hookInto('after').hookInto(this.errors().any() ? 'failed' : 'passed').forgetHooks();\n};\n/**\n * Validate, but don't execute life cycle hooks\n */\n\n\nValidator.prototype.validateWithoutHooks = function () {\n  return this.beforeValidation().checkRulesAndFillErrorBag();\n};\n/**\n * Execute validation rules and fill error bag\n * @returns {Validator}\n */\n\n\nValidator.prototype.checkRulesAndFillErrorBag = function () {\n  this.errors().set(this.checks.reduce(function (errors, check) {\n    return _objectSpread(_objectSpread({}, errors), {}, _defineProperty({}, check.attribute, check.rule(check) ? _toConsumableArray(errors[check.attribute] || []) : [].concat(_toConsumableArray(errors[check.attribute] || []), [check.message()])));\n  }, {}));\n  return this;\n};\n\nValidator.prototype.forgetHooks = function () {\n  this.hooks().forget('before');\n  this.hooks().forget('after');\n  this.hooks().forget('passed');\n  this.hooks().forget('failed');\n  return this;\n};\n\nmodule.exports = Validator;\n\n//# sourceURL=webpack://validator/./dist/validator.js?");

/***/ })

/******/ });
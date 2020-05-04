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

/***/ "./dist/factory.js":
/*!*************************!*\
  !*** ./dist/factory.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Validator = __webpack_require__(/*! ./validator */ \"./dist/validator.js\");\n\nvar Factory = function Factory() {\n  var translator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  this.translator = translator;\n};\n\nFactory.prototype.make = function () {\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var customAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  this.validator = new Validator(data, rules, messages, customAttributes);\n  return this;\n};\n\nFactory.prototype.validate = function () {\n  console.log('factory validates: ', this.validate);\n};\n\nmodule.exports = Factory;\n\n//# sourceURL=webpack://validator/./dist/factory.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Factory = __webpack_require__(/*! ./factory */ \"./dist/factory.js\");\n\nvar validator = function validator() {\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  return new Factory().make(data, rules, messages);\n};\n\nvalidator({\n  name: 'zak',\n  email: 'zak.horton@cleancode.studio'\n}, {\n  name: ['required', 'max:8', 'within:tim,sarah,jimmy'],\n  email: ['email', 'min:7', 'required']\n}, {\n  'name.required': ':attribute is a required field',\n  'name.max': ':attribute may not be more than :max',\n  'email.within': ':attribute not found :within',\n  'email.required': ':attribute is a required field',\n  'email.email': ':attribute must be an email address',\n  'email.min': ':attribute can not be less than :min characters'\n});\nmodule.exports = validator;\nmodule.exports.Validator = Factory;\nmodule.exports[\"default\"] = validator;\nmodule.exports.validator = validator;\n\n//# sourceURL=webpack://validator/./dist/index.js?");

/***/ }),

/***/ "./dist/messages.js":
/*!**************************!*\
  !*** ./dist/messages.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  email: \":attribute must be an email\",\n  \"boolean\": ':attribute must be a boolean',\n  required: \":attribute is required\",\n  phone: \":attribute must be a phone number\",\n  max: \":attribute must at least :max characters\",\n  min: \":attribute must have at least :min characters\",\n  within: \":attribute does not exist in :within\",\n  accepted: \":attribute is not accepted\"\n};\n\n//# sourceURL=webpack://validator/./dist/messages.js?");

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

/***/ "./dist/rules.js":
/*!***********************!*\
  !*** ./dist/rules.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  min: function min(value, _min) {\n    return value.length >= _min;\n  },\n  max: function max(value, _max) {\n    return value.length <= _max;\n  },\n  \"boolean\": function boolean(value) {\n    return typeof value === 'boolean';\n  },\n  within: function within(value, _within) {\n    return _within.split(',').includes(value);\n  },\n  accepted: function accepted(value) {\n    return ['yes', 'on', 1, '1', true, 'true'].includes(value);\n  },\n  required: function required(value) {\n    return [null, undefined, '', {}, []].includes(value) === false;\n  },\n  email: function email(value) {\n    return /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,8})+$/.test(value);\n  },\n  phone: function phone(value) {\n    return /^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);\n  }\n};\n\n//# sourceURL=webpack://validator/./dist/rules.js?");

/***/ }),

/***/ "./dist/validator.js":
/*!***************************!*\
  !*** ./dist/validator.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar RULES = __webpack_require__(/*! ./rules */ \"./dist/rules.js\");\n\nvar MESSAGES = __webpack_require__(/*! ./messages */ \"./dist/messages.js\");\n\nvar Validator = function Validator() {\n  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n  var customAttributes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  this.data = this.parseData(data);\n  this.rules = _objectSpread(_objectSpread({}, RULES), rules);\n  this.messages = _objectSpread(_objectSpread({}, MESSAGES), messages);\n  this.customAttributes = customAttributes;\n};\n\nValidator.prototype.parseData = __webpack_require__(/*! ./methods/parseData */ \"./dist/methods/parseData.js\");\nmodule.exports = Validator;\n\n//# sourceURL=webpack://validator/./dist/validator.js?");

/***/ })

/******/ });
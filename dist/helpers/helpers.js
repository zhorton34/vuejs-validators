"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require('collect.js'),
    Collection = _require.Collection;

var _require2 = require('../support/Arr.js'),
    Arr = _require2.Arr;

var _require3 = require('locutus/php/strings'),
    explode = _require3.explode,
    trim = _require3.trim;

var _require4 = require('locutus/php/funchand'),
    function_exists = _require4.function_exists;

var _require5 = require('locutus/php/var'),
    is_null = _require5.is_null,
    is_object = _require5.is_object,
    isset = _require5.isset,
    is_array = _require5.is_array;

var _require6 = require('locutus/php/array'),
    array_shift = _require6.array_shift,
    in_array = _require6.in_array; // object_get
// value
// _with
// data_set
// data_get


if (!function_exists('object_get')) {
  /**
   * Get an item from an object using "dot" notation.
   *
   * @param  object
   * @param  key
   * @param  original
   * @return mixed
   */
  var _object_get = function _object_get(object, key) {
    var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (is_null(key) || trim(key) == '') {
      return object;
    }

    var resolved = false;
    var segments = explode('.', key);
    segments.forEach(function (segment) {
      if (resolved === false) {
        if (!is_object(object) || !isset(object[segment])) {
          resolved = value(original);
        }

        object = object[segment];
      }
    });
    if (resolved !== false) return resolved;
    return object;
  };
}

if (!function_exists('value')) {
  /**
   * Return the default value of the given value.
   *
   * {mixed} value
   * {mixed} mixed
   */
  var _value = function _value(value) {
    return typeof value === 'function' ? value() : value;
  };
}

if (!function_exists('with')) {
  /**
   * Return the given value, optionally passed through the given callback.
   *
   * {mixed}  value
   * {callable|null}  callback
   * @return mixed
   */
  var _with = function _with(value) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return is_null(callback) ? value : callback(value);
  };
}

if (!function_exists('data_set')) {
  /**
   * Set an item on an array or object using dot notation.
   *
   * @param  target
   * @param  key
   * @param  value
   * @param  overwrite
   * @return mixed
   */
  var _data_set = function _data_set(target, key, value) {
    var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var segment;
    var segments = is_array(key) ? key : explode('.', key);

    function looseJsonParse(obj) {
      return Function('"use strict";return (' + obj + ')')();
    }

    if (segments.includes('*') === false) {
      segments.reduce(function (path, field, iteration, parts) {
        console.log({
          path: path,
          field: field,
          iteration: iteration,
          parts: parts
        });

        if (iteration === parts.length) {
          console.log(parts);

          if (overwrite) {
            looseJsonParse("\n\t\t\t\t\t\t\ttarget.".concat(path, " = value\n\t\t\t\t\t\t"));
          } else {
            looseJsonParse("target.".concat(path, " = target.").concat(path, " ? target.").concat(path, " : value"));
          }
        }
      }, target);
      return target;
    }

    var path = segments.reduce(function (path, segment) {
      if (segment !== '*') {
        return "".concat(path, ".").concat(segment);
      }

      var remaining = segments.slice(path.split('.').length);
      var wildcard = data_get(target, path);
      console.log({
        path: path,
        remaining: remaining,
        segments: segments,
        wildcard: wildcard
      });

      if (Array.isArray(wildcard)) {
        console.log("Array: ", wildcard);
        console.log("Remaining: ", remaining);
        wildcard.forEach(function (item, index) {
          console.log(item, wildcard[index]);
          item = value;
          wildcard[index] = item;
        });
      } else if (_typeof(wildcard) === 'object') {
        console.log('Object: ', wildcard);
      } else if (typeof wildcard === 'undefined' || wildcard === null) {
        console.log('Undefined Or Null: ', wildcard);
      } else {
        console.log(wildcard);
        console.log('Target Path is string, boolean, number');
      }

      return target[path];
    }, '');
    return target; //
    //
    // segments.reduce((build, segment) => {
    // 	if (segment === '*') {
    // 		return build;
    // 	}
    // }, target);
    //
    // if ((segment = array_shift(segments)) === '*') {
    // 	if (!Arr.accessible(target)) {
    // 		target = [];
    // 	}
    // 	if (segments) {
    // 		let [inner] = target;
    //
    // 		target = target.reduce((inner) => {
    // 			target = data_set(inner, segments, value, overwrite);
    //
    // 			return target;
    // 		}, inner);
    // 	} else if (overwrite) {
    // 		let [inner] = target;
    //
    // 		target = target.reduce((inner) => {
    // 			inner = value;
    //
    // 			return inner;
    // 		}, inner);
    // 	}
    // } else if (Arr.accessible(target)) {
    // 	if (segments) {
    // 		if (!Arr.exists(target, segment)) {
    // 			target[segment] = [];
    // 		}
    //
    // 		target[segment] = data_set(target[segment], segments, value, overwrite);
    // 	} else if (overwrite || !Arr.exists(target, segment)) {
    // 		target[segment] = value;
    // 	}
    // } else if (is_object(target)) {
    // 	if (segments) {
    // 		if (!isset(target[segment])) {
    // 			target[segment] = {};
    // 		}
    // 	} else if (overwrite || !isset(target[segment])) {
    // 		target[segment] = value;
    // 	}
    // } else {
    // 	target = {};
    //
    // 	if (segments) {
    // 		data_set(target[segment], segments, value, overwrite)
    // 	} else if (overwrite) {
    // 		target[segment] = value;
    // 	}
    // }

    return target;
  };
}

if (!function_exists('data_get')) {
  /**
   * Get an item from an array or object using "dot" notation.
   *
   * @param  target
   * @param  key
   * @param  fallback
   * @return mixed
   */
  var _data_get = function _data_get(target, key) {
    var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (is_null(key)) {
      return target;
    }

    key = is_array(key) ? key : explode('.', key);
    var wildCardAhead = false;
    key.forEach(function (segment, i) {
      delete segment[i];

      if (wildCardAhead) {
        wildCardAhead = false;
        return target;
      }

      if (is_null(segment)) {
        return target;
      }

      if (segment === '*') {
        var result = [];

        if (Array.isArray(target) && target[0] && _typeof(target[0]) === 'object') {
          var next = false;
          var nextSegment;
          var iteration = 0;
          key.forEach(function (seg, index) {
            if (next === true) {
              nextSegment = seg;
              iteration = index;
              next = false;
            }

            if (seg === segment) {
              next = true;
            }
          });
          wildCardAhead = true;
          var loop = 0;
          result, target = target.reduce(function (build, item) {
            var resolve = [].concat(_toConsumableArray(build), [item[nextSegment] ? item[nextSegment] : item]);
            loop++;
            return resolve;
          }, []).filter(function (value) {
            return typeof value !== 'undefined';
          });

          if (typeof key[iteration + 1] !== 'undefined') {
            return _data_get(result, key.slice(iteration + 1).join('.'));
          } else {
            return result;
          }
        } else if (target instanceof Collection) {
          target = target.all();
        } else if (!Array.isArray(target) && _typeof(target) !== 'object') {
          return value(fallback);
        } else if (_typeof(target) === 'object' && Array.isArray(target) === false) {
          Array.from(target).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                item = _ref2[1];

            result.push(_data_get(target, key));
          });
        } else if (is_array(target)) {
          if (target[0] && _typeof(target[0]) === 'object' && Array.isArray(target[0]) === false) {
            Object.keys(target[0]).reduce(function (results, key) {
              return [result.push(result.reduce(function (list, item) {
                return [item[key]].concat(_toConsumableArray(list));
              }, []))];
            }, result);
          } else {
            target.forEach(function (item) {
              result.push(_data_get(item, key));
            });
          }
        }

        return in_array('*', key) ? Arr.collapse(result) : result;
      }

      if (Arr.accessible(target) && Arr.exists(target, segment)) {
        target = target[segment];
      } else if (is_object(target) && isset(target[segment])) {
        target = target[segment];
      } else {
        return value(fallback);
      }
    });
    return target;
  };
}

module.exports = {
  value: value,
  data_set: data_set,
  data_get: data_get,
  object_get: object_get
};
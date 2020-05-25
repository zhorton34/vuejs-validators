"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('collect.js'),
    Collection = _require.Collection;

var _require2 = require('locutus/php/math'),
    mt_rand = _require2.mt_rand;

var _require3 = require('locutus/php/strings'),
    strpos = _require3.strpos,
    explode = _require3.explode;

var _require4 = require('locutus/php/url'),
    http_build_query = _require4.http_build_query;

var _require5 = require('../helpers/helpers.js'),
    data_get = _require5.data_get,
    util_value = _require5.value;

var _require6 = require('locutus/php/var'),
    is_null = _require6.is_null,
    is_object = _require6.is_object,
    is_string = _require6.is_string,
    is_callable = _require6.is_callable,
    empty = _require6.empty,
    is_array = _require6.is_array,
    isset = _require6.isset;

var _require7 = require('locutus/php/array'),
    _shuffle = _require7.shuffle,
    ksort = _require7.ksort,
    sort = _require7.sort,
    array_rand = _require7.array_rand,
    array_unshift = _require7.array_unshift,
    array_intersect_key = _require7.array_intersect_key,
    array_flip = _require7.array_flip,
    array_key_exists = _require7.array_key_exists,
    count = _require7.count,
    array_reverse = _require7.array_reverse,
    end = _require7.end,
    array_shift = _require7.array_shift,
    array_keys = _require7.array_keys,
    array_values = _require7.array_values,
    array_merge = _require7.array_merge;

var Arr = /*#__PURE__*/function () {
  function Arr() {
    _classCallCheck(this, Arr);
  }

  _createClass(Arr, null, [{
    key: "accessible",
    value: function accessible(value) {
      return Array.isArray(value) && ['offsetExists', 'offsetGet', 'offsetSet', 'offsetUnset'].every(function (key) {
        return Object.keys(value).includes(key);
      });
    }
    /**
     * Add an element to an array using "dot" notation if it doesn't exist.
     *
     * @param  array
     * @param  key
     * @param  value
     * @return array
     */

  }, {
    key: "add",
    value: function add(array, key, value) {
      if (is_null(Arr.get(array, key))) {
        Arr.set(array, key, value);
      }

      return array;
    }
    /**
     * Collapse an array of arrays into a single array.
     *
     * @param  iterable  array
     * @return array
     */

  }, {
    key: "collapse",
    value: function collapse(array) {
      var results = [];
      array.forEach(function (values) {
        if (values instanceof Collection) {
          values = values.all();
        } else if (!is_array(values)) {
          return;
        }

        results.push(values);
      });
      return array_merge.apply(void 0, [[]].concat(results));
    }
    /**
     * Cross join the given arrays, returning all possible permutations.
     *
     * @param  arrays
     * @return array
     */

  }, {
    key: "crossJoin",
    value: function crossJoin() {
      var results = [[]];

      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }

      arrays.forEach(function (array, index) {
        var append = [];
        results.forEach(function (product) {
          array.forEach(function (item) {
            product[index] = item;
            append.push(product);
          });
        });
        results = append;
      });
      return results;
    }
    /**
     * Divide an array into two arrays. One with keys and the other with values.
     *
     * @param  array  array
     * @return array
     */

  }, {
    key: "divide",
    value: function divide(array) {
      return [array_keys(array), array_values(array)];
    }
    /**
     * Flatten a multi-dimensional associative array with dots.
     *
     * @param  array
     * @param  prepend
     * @return array
     */

  }, {
    key: "dot",
    value: function dot(array) {
      var prepend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var results = [];
      array.forEach(function (value, key) {
        if (is_array(value) && !empty(value)) {
          results = array_merge(results, Arr.dot(value, "".concat(prepend[key], ".")));
        } else {
          results[prepend][key] = value;
        }
      });
      return results;
    }
    /**
     * Get all of the given array except for a specified array of keys.
     *
     * @param  array
     * @param  keys
     * @return array
     */

  }, {
    key: "except",
    value: function except(array, keys) {
      Arr.forget(array, keys);
      return array;
    }
    /**
     * Determine if the given key exists in the provided array.
     *
     * @param   array
     * @param  key
     * @return bool
     */

  }, {
    key: "exists",
    value: function exists(array, key) {
      if (Object.keys(array).includes('has')) {
        return array.has(key);
      }

      if (Object.keys(array).includes('offsetExists') && ['offsetExists', 'offsetGet', 'offsetSet', 'offsetUnset'].every(function (fn) {
        return Object.keys(array).includes(fn);
      })) {
        return array.offsetExists(key);
      }

      return array_key_exists(key, array);
    }
    /**
     * Return the first element in an array passing a given truth test.
     *
     * @param  array
     * @param  callback
     * @param  original
     * @return mixed
     */

  }, {
    key: "first",
    value: function first(array) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (is_null(callback)) {
        if (empty(array)) {
          return util_value(value);
        }

        var _array = _slicedToArray(array, 1),
            item = _array[0];

        return item;
      }

      var resolved = false;
      var resolve = array.reduce(function (value, key) {
        if (resolved || !callback(value, key)) return false;
        resolved = true;
        return value;
      }, false);
      return resolved ? resolve : value(original);
    }
    /**
     * Return the last element in an array passing a given truth test.
     *
     * @param  array
     * @param  callback
     * @param  original
     * @return mixed
     */

  }, {
    key: "last",
    value: function last(array) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (is_null(callback)) {
        return empty(array) ? util_value(original) : end(array);
      }

      return Arr.first(array_reverse(array, true), callback, original);
    }
    /**
     * Flatten a multi-dimensional array into a single level.
     *
     * @param  array
     * @param  depth
     * @return array
     */

  }, {
    key: "flatten",
    value: function flatten(array) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
      var result = [];
      array.forEach(function (item) {
        item = item instanceof Collection ? item.all() : item;

        if (!is_array(item)) {
          result.push(item);
        } else {
          var values = depth === 1 ? array_values(item) : Arr.flatten(item, depth - 1);
          values.forEach(function (value) {
            result.push(value);
          });
        }
      });
      return result;
    }
    /**
     * Get an item from an array using "dot" notation.
     *
     * @param  array
     * @param  key
     * @param  original
     * @return mixed
     */

  }, {
    key: "get",
    value: function get(array, key) {
      var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!Arr.accessible(array)) {
        return util_value(original);
      }

      if (is_null(key)) {
        return array;
      }

      if (Arr.exists(array, key)) {
        return array[key];
      }

      if (strpos(key, '.') === false) {
        return (array === null || array === void 0 ? void 0 : array[key]) || util_value(original);
      }

      explode('.', key).reduce(function (resolved, segment) {
        return Arr.accessible(array) && Arr.exists(array, segment) ? resolved[segment] : util_value(original);
      }, array);
      return array;
    }
    /**
     * Check if an item or items exist in an array using "dot" notation.
     *
     * @param  array
     * @param  keys
     * @return boolean
     */

  }, {
    key: "has",
    value: function has(array, keys) {
      keys = Array.isArray(keys) ? keys : Array.of(keys);

      if (!array || keys === []) {
        return false;
      }

      keys.split('.').reduce(function (exists, key) {
        var subKeyArray = array;
        if (Arr.exists(array, key)) return true;
        return key.split('.').reduce(function (condition, segment) {
          if (Arr.accessible(subKeyArray && Arr.exists(subKeyArray, segment))) {
            return subKeyArray[segment];
          } else {
            return false;
          }
        }, false);
      }, false);
      return true;
    }
    /**
     * Determine if any of the keys exist in an array using "dot" notation.
     *
     * @param  array
     * @param  keys
     * @return boolean
     */

  }, {
    key: "hasAny",
    value: function hasAny(array, keys) {
      if (is_null(keys)) {
        return false;
      }

      keys = Array.isArray(keys) ? keys : Array.of(keys);

      if (!array) {
        return false;
      }

      if (keys === []) {
        return false;
      }

      for (var key in keys) {
        if (Arr.has(array, key)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Determines if an array is associative.
     *
     * An array is "associative" if it doesn't have sequential numerical keys beginning with zero.
     *
     * @param  array
     * @return boolean
     */

  }, {
    key: "isAssoc",
    value: function isAssoc(array) {
      return !Array.isArray(array) && _typeof(array) === 'object';
    }
    /**
     * Get a subset of the items from the given array.
     *
     * @param  array
     * @param  keys
     * @return array
     */

  }, {
    key: "only",
    value: function only(array, keys) {
      return array_intersect_key(array, array_flip(Array.is(keys) ? keys : Array.of(keys)));
    }
    /**
     * Pluck an array of values from an array.
     *
     * @param  array
     * @param  value
     * @param  key
     * @return array
     */

  }, {
    key: "pluck",
    value: function pluck(array, value) {
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var results = [];

      var _Arr$explodePluckPara = Arr.explodePluckParameters(value, key);

      var _Arr$explodePluckPara2 = _slicedToArray(_Arr$explodePluckPara, 2);

      value = _Arr$explodePluckPara2[0];
      key = _Arr$explodePluckPara2[1];
      array.forEach(function (item) {
        var itemValue = data_get(item, value); // If the key is "null", we will just append the value to the array and keep
        // looping. Otherwise we will key the array using the value of the key we
        // received from the developer. Then we'll return the final array form.

        if (is_null(key)) {
          results.push(itemValue);
        } else {
          var itemKey = data_get(item, key);

          if (is_object(itemKey) && Object.keys(itemKey).includes('toString')) {
            itemKey = String(itemKey);
          }

          results[itemKey] = itemValue;
        }
      });
      return results;
    }
    /**
     * Explode the "value" and "key" arguments passed to "pluck".
     *
     * @param  value
     * @param  key
     * @return array
     */

  }, {
    key: "explodePluckParameters",
    value: function explodePluckParameters(value, key) {
      value = is_string(value) ? explode('.', value) : value;
      key = is_null(key) || is_array(key) ? key : explode('.', key);
      return [value, key];
    }
    /**
     * Push an item onto the beginning of an array.
     *
     * @param  array
     * @param  value
     * @param  key
     * @return array
     */

  }, {
    key: "prepend",
    value: function prepend(array, value) {
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (is_null(key)) {
        array_unshift(array, value);
      } else {
        array = _objectSpread(_defineProperty({}, key, value), array);
      }

      return array;
    }
    /**
     * Get a value from the array, and remove it.
     *
     * @param  array
     * @param  key
     * @param  original
     * @return mixed
     */

  }, {
    key: "pull",
    value: function pull(array, key) {
      var original = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var value = Arr.get(array, key, original);
      Arr.forget(array, key);
      return value;
    }
    /**
     * Get one or a specified number of random values from an array.
     *
     * @param  array
     * @param  number
     * @return mixed|array results
     */

  }, {
    key: "random",
    value: function random(array) {
      var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var requested = is_null(number) ? 1 : number;
      var count = count(array);

      if (requested > count) {
        throw new Error("\n\t\t\t\tYou requested ".concat(requested, " items, but thare are only ").concat(count, " items available.\n\t\t\t"));
      }

      if (is_null(number)) {
        return array[array_rand(array)];
      }

      if (parseInt(number) === 0) {
        return [];
      }

      var keys = array_rand(array, number);
      var results = [];
      (Array.isArray(keys) ? keys : Array.of(keys)).forEach(function (key) {
        results.push(array[key]);
      });
      return results;
    }
    /**
     * Set an array item to a given value using "dot" notation.
     *
     * If no key is given to the method, the entire array will be replaced.
     *
     * @param  array
     * @param  key
     * @param  value
     * @return array
     */

  }, {
    key: "set",
    value: function set(array, key, value) {
      if (is_null(key)) {
        return array = value;
      }

      var keys = explode('.', key);
      keys.forEach(function (key, index) {
        if (count(keys) === 1) {
          return;
        }

        delete keys[index]; // If the key doesn't exist at this depth, we will just create an empty array
        // to hold the next value, allowing us to create the arrays to hold final
        // values at the correct depth. Then we'll keep digging into the array.

        if (!isset(array[key]) || !is_array(array[key])) {
          array[key] = [];
        }

        array = array[key];
      });
      array[array_shift(keys)] = value;
      return array;
    }
    /**
     * Shuffle the given array and return the result.
     *
     * @param  array
     * @param  seed
     * @return array
     */

  }, {
    key: "shuffle",
    value: function shuffle(array) {
      var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (is_null(seed)) {
        _shuffle(array);
      } else {
        mt_rand(seed);

        _shuffle(array);

        mt_rand();
      }

      return array;
    }
    /**
     * Sort the array using the given callback or "dot" notation.
     *
     * @param  array  array
     * @param  callback
     * @return array
     */

  }, {
    key: "sort",
    value: function sort(array) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return Collection.make(array).sortBy(callback).all();
    }
    /**
     * Recursively sort an array by keys and values.
     *
     * @param  array  array
     * @return array
     */

  }, {
    key: "sortRecursive",
    value: function sortRecursive(array) {
      array.forEach(function (value, index) {
        if (is_array(value)) {
          array[index] = Arr.sortRecursive(array);
        }
      });

      if (Arr.isAssoc(array)) {
        ksort(array);
      } else {
        sort(array);
      }

      return array;
    }
    /**
     * Convert the array into a query string.
     *
     * @param  array  array
     * @return string
     */

  }, {
    key: "query",
    value: function query(array) {
      return http_build_query(array, null, '&', 'PHP_QUERY_RFC3986');
    }
    /**
     * Filter the array using the given callback.
     *
     * @param  array  array
     * @param  callback
     * @return array
     */

  }, {
    key: "where",
    value: function where(array, callback) {
      return array.filter(function (key, value) {
        return callback(key, value);
      });
    }
    /**
     * If the given value is not an array and not null, wrap it in one.
     *
     * @param  value
     * @return array
     */

  }, {
    key: "wrap",
    value: function wrap(value) {
      if (is_null(value)) {
        return [];
      }

      return is_array(value) ? value : [value];
    }
  }]);

  return Arr;
}();

module.exports = Arr;
module.exports.Arr = Arr;
module.exports["default"] = Arr;
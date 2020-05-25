
const { Collection } = require('collect.js');
const { mt_rand } = require('locutus/php/math');
const { strpos, explode } = require('locutus/php/strings');
const { http_build_query } = require('locutus/php/url');
const { data_get, value: util_value } = require('../helpers/helpers.js');
const { is_null, is_object, is_string, empty, is_array, isset } = require('locutus/php/var');
const { shuffle, ksort, sort, array_rand, array_unshift, array_intersect_key, array_flip, array_key_exists, count, array_reverse, end, array_shift, array_keys, array_values, array_merge } = require('locutus/php/array');


class Arr
{
	static accessible(value)
	{
		return Array.isArray(value) && ['offsetExists', 'offsetGet', 'offsetSet', 'offsetUnset'].every(key => Object.keys(value).includes(key));
	}

	/**
	 * Add an element to an array using "dot" notation if it doesn't exist.
	 *
	 * @param  array
	 * @param  key
	 * @param  value
	 * @return array
	 */
	static add(array, key, value)
	{
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
		static collapse(array)
		{
			let results = [];

			array.forEach((values) => {
				if (values instanceof Collection) {
					values = values.all();
				} else if (! is_array(values)) {
					return;
				}

				results.push(values);
			});

			return array_merge([], ...results);
		}

		/**
		 * Cross join the given arrays, returning all possible permutations.
		 *
		 * @param  arrays
		 * @return array
		 */
		static crossJoin(...arrays)
		{
			let results = [[]];

			arrays.forEach((array, index) => {
				let append = [];

				results.forEach((product) => {
					array.forEach((item) => {
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
		static divide(array)
		{
			return [array_keys(array), array_values(array)];
		}

		/**
		 * Flatten a multi-dimensional associative array with dots.
		 *
		 * @param  array
		 * @param  prepend
		 * @return array
		 */
		static dot(array, prepend = '')
		{
			let results = [];

			array.forEach((value, key) => {
				if (is_array(value) && ! empty(value)) {
					results = array_merge(results, Arr.dot(value, `${prepend[key]}.`));
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
		static except(array, keys)
		{
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
		static exists(array, key)
		{
			if (Object.keys(array).includes('has')) {
				return array.has(key);
			}

			if (Object.keys(array).includes('offsetExists') && ['offsetExists', 'offsetGet', 'offsetSet', 'offsetUnset'].every(fn => Object.keys(array).includes(fn))) {
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
		static first(array, callback = null, original = null)
		{
			if (is_null(callback)) {
				if (empty(array)) {
					return util_value(value);
				}

				let [item] = array;

				return item;
			}

			let resolved = false;
			let resolve = array.reduce((value, key) => {
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
	static last(array, callback = null, original = null)
	{
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
	static flatten(array, depth = Infinity)
	{
		let result = [];

		array.forEach((item) => {
			item = item instanceof Collection ? item.all() : item;

			if (! is_array(item)) {
				result.push(item);
			} else {
				let values = depth === 1
					? array_values(item)
					: Arr.flatten(item, depth - 1);

				values.forEach((value) => {
					result.push(value);
				})
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
	static get(array, key, original = null)
	{

		if (! Arr.accessible(array)) {
			return util_value(original);
		}

		if (is_null(key)) {
			return array;
		}

		if (Arr.exists(array, key)) {
			return array[key];
		}

		if (strpos(key, '.') === false) {
			return array?.[key] || util_value(original);
		}

		explode('.', key).reduce((resolved, segment) =>
			Arr.accessible(array) && Arr.exists(array, segment)
				? resolved[segment]
				: util_value(original)
			,
		array);

		return array;
	}

	/**
	 * Check if an item or items exist in an array using "dot" notation.
	 *
	 * @param  array
	 * @param  keys
	 * @return boolean
	 */
	static has(array, keys)
	{
		keys = Array.isArray(keys) ? keys : Array.of(keys);

		if (! array || keys === []) {
			return false;
		}

		keys.split('.').reduce((exists, key) => {
			let subKeyArray = array;

			if (Arr.exists(array, key)) return true;

			return key.split('.').reduce((condition, segment) => {
				if (Arr.accessible((subKeyArray) && Arr.exists(subKeyArray, segment))) {
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
	static hasAny(array, keys)
	{
		if (is_null(keys)) {
			return false;
		}

		keys = Array.isArray(keys) ? keys : Array.of(keys);

		if (! array) {
			return false;
		}

		if (keys === []) {
			return false;
		}

		for (let key in keys)
		{
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
	static isAssoc(array)
	{
		return !Array.isArray(array) && typeof array === 'object';
	}

	/**
	 * Get a subset of the items from the given array.
	 *
	 * @param  array
	 * @param  keys
	 * @return array
	 */
	static only(array, keys)
	{
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
	static pluck(array, value, key = null)
	{
		let results = [];

		[value, key] = Arr.explodePluckParameters(value, key);

		array.forEach((item) => {
			let itemValue = data_get(item, value);

			// If the key is "null", we will just append the value to the array and keep
			// looping. Otherwise we will key the array using the value of the key we
			// received from the developer. Then we'll return the final array form.
			if (is_null(key)) {
				results.push(itemValue);
			} else {
				let itemKey = data_get(item, key);

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
	static explodePluckParameters(value, key)
	{
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
	static prepend(array, value, key = null)
	{
		if (is_null(key)) {
			array_unshift(array, value);
		} else {
			array = { [key]: value, ...array };
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
	static pull(array, key, original = null)
	{
		let value = Arr.get(array, key, original);

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
	static random(array, number = null)
	{
		let requested = is_null(number) ? 1 : number;

		let count = count(array);

		if (requested > count) {
			throw new Error(`
				You requested ${requested} items, but thare are only ${count} items available.
			`);
		}

		if (is_null(number)) {
			return array[array_rand(array)];
		}

		if (parseInt(number) === 0) {
			return [];
		}

		let keys = array_rand(array, number);

		let results = [];

		(Array.isArray(keys) ? keys : Array.of(keys)).forEach((key) => {
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
	static set(array, key, value)
	{
		if (is_null(key)) {
			return array = value;
		}

		let keys = explode('.', key);

		keys.forEach((key, index) => {
			if (count(keys) === 1) {
				return;
			}

			delete keys[index];

			// If the key doesn't exist at this depth, we will just create an empty array
			// to hold the next value, allowing us to create the arrays to hold final
			// values at the correct depth. Then we'll keep digging into the array.
			if (! isset(array[key]) || ! is_array(array[key])) {
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
	static shuffle(array, seed = null)
	{
		if (is_null(seed)) {
			shuffle(array);
		} else {
			mt_rand(seed);
			shuffle(array);
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
	static sort(array, callback = null)
	{
		return Collection.make(array).sortBy(callback).all();
	}

	/**
	 * Recursively sort an array by keys and values.
	 *
	 * @param  array  array
	 * @return array
	 */
	static sortRecursive(array)
	{
		array.forEach((value, index) => {
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
	static query(array)
	{
		return http_build_query(array, null, '&', 'PHP_QUERY_RFC3986');
	}

	/**
	 * Filter the array using the given callback.
	 *
	 * @param  array  array
	 * @param  callback
	 * @return array
	 */
	static where(array, callback)
	{
		return array.filter((key, value) => callback(key, value));
	}

	/**
	 * If the given value is not an array and not null, wrap it in one.
	 *
	 * @param  value
	 * @return array
	 */
	static wrap(value)
	{
		if (is_null(value)) {
			return [];
		}

		return is_array(value) ? value : [value];
	}
}

module.exports = Arr;
module.exports.Arr = Arr;
module.exports.default = Arr;

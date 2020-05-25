
const { Collection } = require('collect.js');
const { Arr } = require('../support/Arr.js');
const { explode } = require('locutus/php/strings');
const { function_exists } = require('locutus/php/funchand');
const { is_null, is_object, isset, is_array } = require('locutus/php/var');
const { in_array } = require('locutus/php/array');
// value
// _with
// data_set
// data_get

if (! function_exists('value')) {
	/**
	 * Return the default value of the given value.
	 *
	 * {mixed} value
	 * {mixed} mixed
	 */
	function value(value)
	{
		return typeof value === 'function' ? value() : value;
	}
}

if (! function_exists('data_fill')) {
	/**
	 * Fill in data where it's missing.
	 *
	 * @param  target
	 * @param  key
	 * @param  value
	 * @return mixed
	 */
	function data_fill(target, key, value)
	{
		return data_set(target, key, value, false);
	}
}

if (! function_exists('data_set')) {
	/**
	 * Set an item on an array or object using dot notation.
	 *
	 * @param  target
	 * @param  path
	 * @param  value
	 * @param  force
	 * @return *
	 */
	function data_set(target, path, value, force = true) {
		let segments = Array.isArray(path) ? path : path.split('.');
		let [segment] = segments;

		if (segments.length === 0)
		{
			target = value;
		}
		else if (segments.length === 1 && !segments.includes('*'))
		{
			target[segment] = force ? value : target[segment] || value;
		}

		else if (segment !== '*') {
			if (!target[segment]) {
				target[segment] = {};

				target = data_set(target[segment], segments.slice(1), value, force);
			}

			let inner = data_set(target[segment], segments.slice(1), value, force);

			if (Array.isArray(target[segment])) {
				if (force && target[segment].length) {
					target[segment] = [ ...target[segment] ];
				} else {
					target[segment] = [ ...inner ];
				}
			} else {
				target[segment] = force ? { ...target[segment], ...inner } : { ...inner, ...target[segment] };
			}
		}

		else if (segment === '*') {
			const partial = segments.slice(path.indexOf('*') + 1, path.length);

			if (typeof target === 'object') {
				target = Object.keys(target).reduce((build, property) => ({
						...build,
						[property]: data_set(target[property], partial, value, force)
					}),
				{});
			}
			else {
				target = data_set(target, partial, value, force);
			}
		}


		/*-----------------------------------------------------------------------------
		 |   Arrayable Requirements
		 *-----------------------------------------------------------------------------
		 |
		 |   . All arrays are converted to objects
		 |   . For Example
		 |      #Code
		 |        Code -> data_set({ list: ['one', 'two', 'three'], 'list.*', 'update', true });
		 |
		 |      #Input
		 |         Input -> { list: ['one', 'two', 'three'] }
		 |
		 |      #During We Convert Arrays To "Indexed Objects"
		 |         During -> { list: { '1': 'one', '2': 'two', '3': 'three' } }
		 |
		 |      #Before Output we convert "Indexed Objects" Back To Arrays
		 |         From -> { list: { '1': 'update', '2': 'update', '3': 'update' } }
		 |         Into -> { list: ['update', 'update', 'update'] }
		 |
		 |   . Arrays convert into "Indexed Objects", allowing for wildcard (*) capabilities
		 |   . "Indexed Objects" are converted back into arrays before returning the updated target
		 |
		 */
		const arrayable = [
			typeof target === 'object',
			Object.keys(target).length,
			Object.keys(target).every(index => index.match(/^(0|[1-9][0-9]*)$/))
		];

		if (arrayable.every(requirement => requirement === true)) {
			return Object.values(target);
		}

		return target;
	}
}


if (! function_exists('data_get')) {
	/**
	 * Get an item from an array or object using "dot" notation.
	 *
	 * @param  target
	 * @param  key
	 * @param  fallback
	 * @return mixed
	 */
	function data_get(target, key, fallback = null) {
		if (is_null(key)) {
			return target;
		}

		key = is_array(key) ? key : explode('.', key);

		let wildCardAhead = false;

		key.forEach((segment, i) => {
			delete segment[i];

			if (wildCardAhead) {
				wildCardAhead = false;

				return target;
			}

			if (is_null(segment)) {
				return target;
			}

			if (segment === '*') {
				let result = [];

				if (Array.isArray(target) && target[0] && typeof target[0] === 'object') {

					let next = false;
					let nextSegment;
					let iteration = 0;

					key.forEach((seg, index) => {
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

					let loop = 0;
					result, target = target.reduce((build, item) => {
						let resolve = [
							...build,
							item[nextSegment] ? item[nextSegment] : item
						];

						loop++;

						return resolve;
					}, []).filter(value => typeof value !== 'undefined');


					if (typeof key[iteration + 1] !== 'undefined') {
						return data_get(result, key.slice(iteration + 1).join('.'));
					} else {
						return result;
					}
				}
				else if (target instanceof Collection) {
					target = target.all();
				} else if (!Array.isArray(target) && typeof target !== 'object') {
					return value(fallback);
				}

				else if (typeof target === 'object' && Array.isArray(target) === false) {
					Array.from(target).forEach(([key, item]) => {
						result.push(data_get(target, key));
					});
				}

				else if (is_array(target)) {
					if (target[0] && typeof target[0] === 'object' && Array.isArray(target[0]) === false) {
						Object.keys(target[0]).reduce((results, key) => [
							result.push(
								result.reduce((list, item) => [
									item[key],
									...list,
								], [])
							)
						], result);
					}
					else {
						target.forEach((item) => {
							result.push(data_get(item, key));
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
	}
}

module.exports = {
	value,
	data_set,
	data_get,
	data_fill,
};

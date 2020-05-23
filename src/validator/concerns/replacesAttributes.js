
'use strict';

const str_replace = require('../../helpers/string_replace.js');
const Arr = {
	accessible: (value) => Array.isArray(value),
}
/*
array_change_key_case
array_chunk
array_column
array_combine
array_count_values
array_diff
array_diff_assoc
array_diff_key
array_diff_uassoc
array_diff_ukey
array_fill
array_fill_keys
array_filter
array_flip
array_intersect
array_intersect_assoc
array_intersect_key
array_intersect_uassoc
array_intersect_ukey
array_key_exists
array_keys
array_map
array_merge
array_merge_recursive
array_multisort
array_pad
array_pop
array_product
array_push
array_rand
array_reduce
array_replace
array_replace_recursive
array_reverse
array_search
array_shift
array_slice
array_splice
array_sum
array_udiff
array_udiff_assoc
array_udiff_uassoc
array_uintersect
array_uintersect_uassoc
array_unique
array_unshift
array_values
array_walk
array_walk_recursive
arsort
asort
count
current
each
end
in_array
key
krsort
ksort
natcasesort
natsort
next
pos
prev
range
reset
rsort
shuffle
sizeof
sort
uasort
uksort
usort
*/
const ReplacesAttributes = {
	/**
	 * Replace all place-holders for the between rule.
	 *
	 * str  message
	 * str  attribute
	 * str  rule
	 * array  parameters
	 * @return string
	 */
	replaceBetween(message, attribute, rule, parameters)
	{
		return str_replace([':min', ':max'], parameters, message);
	},

	/**
	 * Replace all place-holders for the date_format rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceDateFormat(message, attribute, rule, parameters)
	{
		return str_replace(':format', parameters[0], message);
	},

	/**
	 * Replace all place-holders for the different rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceDifferent(message, attribute, rule, parameters)
	{
		return this.replaceSame(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the digits rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceDigits(message, attribute, rule, parameters)
	{
		return str_replace(':digits', parameters[0], message);
	},

	/**
	 * Replace all place-holders for the digits (between) rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceDigitsBetween(message, attribute, rule, parameters)
	{
		return this.replaceBetween(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the min rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceMin(message, attribute, rule, parameters)
	{
		return str_replace(':min', parameters[0], message);
	},

	/**
	 * Replace all place-holders for the max rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceMax(message, attribute, rule, parameters)
	{
		return str_replace(':max', parameters[0], message);
	},

	/**
	 * Replace all place-holders for the in rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceIn(message, attribute, rule, parameters)
	{
		parameters = parameters.map(parameter => this.getDisplayableValue(attribute, parameter));

		return str_replace(':values', parameters.join(', '), message);
	},

	/**
	 * Replace all place-holders for the not_in rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceNotIn(message, attribute, rule, parameters)
	{
		return this.replaceIn(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the in_array rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceInArray(message, attribute, rule, parameters)
	{
		return str_replace(':other', this.getDisplayableAttribute(parameters[0]), message);
	},

	/**
	 * Replace all place-holders for the mimetypes rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceMimetypes(message, attribute, rule, parameters)
	{
		return str_replace(':values', parameters.join(', '), message);
	},

	/**
	 * Replace all place-holders for the mimes rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceMimes(message, attribute, rule, parameters)
	{
		return str_replace(':values', parameters.join(', '), message);
	},

	/**
	 * Replace all place-holders for the required_with rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceRequiredWith(message, attribute, rule, parameters)
	{
		return str_replace(':values', this.getAttributeList(parameters).join('/'), message);
	},

	/**
	 * Replace all place-holders for the required_with_all rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceRequiredWithAll(message, attribute, rule, parameters)
	{
		return this.replaceRequiredWith(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the required_without rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceRequiredWithout(message, attribute, rule, parameters)
	{
		return this.replaceRequiredWith(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the required_without_all rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceRequiredWithoutAll(message, attribute, rule, parameters)
	{
		return this.replaceRequiredWith(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the size rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceSize(message, attribute, rule, parameters)
	{
		return str_replace(':size', parameters[0], message);
	},

	/**
	 * Replace all place-holders for the gt rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceGt(message, attribute, rule, parameters)
	{
		let value;
		if ((value = this.getValue(parameters[0])) === null) {
			return str_replace(':value', this.getDisplayableAttribute(parameters[0]), message);
		}

		return str_replace(':value', this.getSize(attribute, value), message);
	},

	/**
	 * Replace all place-holders for the lt rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceLt(message, attribute, rule, parameters)
	{
		let value;

		if ((value = this.getValue(parameters[0])) === null) {
			return str_replace(':value', this.getDisplayableAttribute(parameters[0]), message);
		}

		return str_replace(':value', this.getSize(attribute, value), message);
	},

	/**
	 * Replace all place-holders for the gte rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceGte(message, attribute, rule, parameters)
	{
		let value;
		if ((value = this.getValue(parameters[0])) === null) {
			return str_replace(':value', this.getDisplayableAttribute(parameters[0]), message);
		}

		return str_replace(':value', this.getSize(attribute, value), message);
	},

	/**
	 * Replace all place-holders for the lte rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceLte(message, attribute, rule, parameters)
	{
		let value;
		if ((value = this.getValue(parameters[0])) === null) {
			return str_replace(':value', this.getDisplayableAttribute(parameters[0]), message);
		}

		return str_replace(':value', this.getSize(attribute, value), message);
	},

	/**
	 * Replace all place-holders for the required_if rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceRequiredIf(message, attribute, rule, parameters)
	{
		// @TODO Transform Laravel Array Get
		// parameters[1] = this.getDisplayableValue(parameters[0], Arr::get(this.data, parameters[0]));

		parameters[0] = this.getDisplayableAttribute(parameters[0]);

		return str_replace([':other', ':value'], parameters, message);
	},

	/**
	 * Replace all place-holders for the required_unless rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceRequiredUnless(message, attribute, rule, parameters)
	{
		let other = this.getDisplayableAttribute(parameters[0]);

		let values = [];

		parameters.slice(1).forEach(value => {
			values.push(this.getDisplayableValue(parameters[0], value))
		});

		return str_replace([':other', ':values'], [other, values.join(', ')], message);
	},

	/**
	 * Replace all place-holders for the same rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceSame(message, attribute, rule, parameters)
	{
		return str_replace(':other', this.getDisplayableAttribute(parameters[0]), message);
	},

	/**
	 * Replace all place-holders for the before rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceBefore(message, attribute, rule, parameters)
	{
		if (new Date(parameters[0]) != 'Invalid Date') {
			return str_replace(':date', this.getDisplayableAttribute(parameters[0]), message);
		}

		return str_replace(':date', this.getDisplayableValue(attribute, parameters[0]), message);
	},

	/**
	 * Replace all place-holders for the before_or_equal rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceBeforeOrEqual(message, attribute, rule, parameters)
	{
		return this.replaceBefore(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the after rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceAfter(message, attribute, rule, parameters)
	{
		return this.replaceBefore(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the after_or_equal rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceAfterOrEqual(message, attribute, rule, parameters)
	{
		return this.replaceBefore(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the date_equals rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceDateEquals(message, attribute, rule, parameters)
	{
		return this.replaceBefore(message, attribute, rule, parameters);
	},

	/**
	 * Replace all place-holders for the dimensions rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceDimensions(message, attribute, rule, parameters)
	{
		parameters = this.parseNamedParameters(parameters);

		if (Array.isArray(parameters)) {
			parameters.forEach((key, value) => {
				message = str_replace(':'.key, value, message);
			});
		}

		return message;
	},

	/**
	 * Replace all place-holders for the ends_with rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceEndsWith(message, attribute, rule, parameters)
	{
		parameters.forEach(parameter => {
	    	parameter = this.getDisplayableValue(attribute, parameter);
		});

		return str_replace(':values', parameters.join(', '), message);
	},

	/**
	 * Replace all place-holders for the starts_with rule.
	 *
	 * {str}  message
	 * {str}  attribute
	 * {str}  rule
	 * {array}  parameters
	 * @return string
	 */
	replaceStartsWith(message, attribute, rule, parameters)
	{

		parameters.forEach(parameter => {
		    parameter = this.getDisplayableValue(attribute, parameter);
		});

		return str_replace(':values', parameters.join(', '), message);
	}
};

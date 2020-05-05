'use strict';

module.exports = {
  "boolean": ':attribute must be a boolean',
  number: ':attribute must be a number',
  numeric: ':attribute must be numeric',
  accepted: ":attribute is not accepted",
  same: ':attribute must be is not the same as :same',
  min: ":attribute isn't allowed to be less than :min characters",
  max: ":attribute isn't allowed to be greater than :max characters",
  within: ":attribute does not exist in :within",
  not_within: ':attribute should not be value within :not_within',
  email: ":attribute must be an email",
  phone: ":attribute must be a phone number",
  required: ":attribute is required",
  regex: ":attribute does not match proper pattern",
  not_regex: ":attribute should not match the given pattern pattern",
  url: ':attribute is not a valid url',
  alpha: ':attribute must be entirely alphabetic characters',
  alpha_dash: ':attribute must be alpha-numeric characters with dashes and underscores',
  alpha_num: ':attribute must be entirely alpha numeric characters',
  array: ':attribute must be an array',
  string: ':attribute must be a string',
  between: ':attribute must be between :between',
  json: ':attribute must be a valid json string'
};
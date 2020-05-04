"use strict";

module.exports = {
  min: function min(value, _min) {
    return value.length >= _min;
  },
  max: function max(value, _max) {
    return value.length <= _max;
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  within: function within(value, _within) {
    return _within.split(',').includes(value);
  },
  accepted: function accepted(value) {
    return ['yes', 'on', 1, '1', true, 'true'].includes(value);
  },
  required: function required(value) {
    return [null, undefined, '', {}, []].includes(value) === false;
  },
  email: function email(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
  },
  phone: function phone(value) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);
  }
};
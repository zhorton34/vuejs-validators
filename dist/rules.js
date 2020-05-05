"use strict";

var isBool = require('./helpers/isBool');

var isNull = require('./helpers/isNull');

var isBooly = require('./helpers/isBooly');

var isFalsy = require('./helpers/isFalsy');

var isEmpty = require('./helpers/isEmpty');

var isNumber = require('./helpers/isNumber');

var isTruthy = require('./helpers/isTruthy');

var isNotNull = require('./helpers/isNotNull');

var isNumeric = require('./helpers/isNumeric');

var isNotEmpty = require('./helpers/isNotEmpty');

var isUndefined = require('./helpers/isUndefined');

var isNotNumeric = require('./helpers/isNotNumeric');

var isNotUndefined = require('./helpers/isNotUndefined');

module.exports = {
  "boolean": function boolean(_ref) {
    var value = _ref.value;
    return isBooly(value);
  },
  number: function number(_ref2) {
    var value = _ref2.value;
    return isNumber(value);
  },
  numeric: function numeric(_ref3) {
    var value = _ref3.value;
    return isNumeric(value);
  },
  accepted: function accepted(_ref4) {
    var value = _ref4.value;
    return isTruthy(value);
  },
  same: function same(_ref5) {
    var value = _ref5.value,
        parameters = _ref5.parameters,
        validator = _ref5.validator;
    return value === validator.data[parameters[0]];
  },
  min: function min(_ref6) {
    var value = _ref6.value,
        parameters = _ref6.parameters;
    return value.length >= parameters[0];
  },
  max: function max(_ref7) {
    var value = _ref7.value,
        parameters = _ref7.parameters;
    return value.length <= parameters[0];
  },
  within: function within(_ref8) {
    var value = _ref8.value,
        parameters = _ref8.parameters;
    return parameters[0].split(',').includes(value);
  },
  email: function email(_ref9) {
    var value = _ref9.value;
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
  },
  phone: function phone(_ref10) {
    var value = _ref10.value;
    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(value);
  },
  required: function required(_ref11) {
    var value = _ref11.value;
    return true === (isNotNull(value) && isNotUndefined(value) && isNotEmpty(value));
  }
};
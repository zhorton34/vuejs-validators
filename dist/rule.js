"use strict";

var Rule = function Rule(attribute, value, parameters, validator) {
  this.value = value;
  this.validator = validator;
  this.attribute = attribute;
  this.parameters = parameters;
};

validator();

var rule = function rule(attribute, value, parameters, validator) {};
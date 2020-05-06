'use strict';

const fs = require('fs');
const path = require('path');
const { it } = require('mocha');
const { expect } = require('chai');
const validator = require('../dist');
const rules = require('../src/rules');
const { describe } = require('mocha');
const { readdirSync } = require('fs');
const messages = require('../src/messages');

let test = process.argv[process.argv.length - 1];
test = test.replace('--', '');
test += '_test.js';

let docs = readdirSync(path.resolve(__dirname, '../docs/api')).map(file => file.replace('.md', ''));

let payload = () => (() => {
    let data = { id: 1, name: '', email: '' };
    let confirm = { id: 'number|required', name: 'required', email: 'required|email' };

    let failingValidator = validator(data, confirm).validate();
    let passingValidator = validator({ ...data, name: 'samuel', email: 'sam@gmail.com' }, confirm).validate();

    return {
      docs,
      rules,
      messages,
      validator,
      failingValidator,
      passingValidator,
      errors: failingValidator.errors(),
      emptyErrors: passingValidator.errors()
    };
})();

const TEST_DIRECTORIES = ['rules', 'errors', 'validator', 'structure'];

Object.entries(
    TEST_DIRECTORIES.reduce(
      (accumulated, directory) => ({
        ...accumulated,
        [directory]: [...fs.readdirSync(path.join(__dirname, directory))]
      }),
    {})
).forEach(([directory, tests]) => {

  tests.forEach(file => {
      describe(file.replace('_test.js', '()'), () => {

      require(path.join(__dirname, directory, file))(it, expect, payload());
    });
  }
  )
});

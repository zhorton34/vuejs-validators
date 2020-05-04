'use strict';

const fs = require('fs');
const { it } = require('mocha');
const { describe } = require('mocha');
const path = require('path');
const { expect } = require('chai');
const validator = require('../dist');
const rules = require('../src/rules');

let test = process.argv[process.argv.length - 1];
const runSingleTest = test.indexOf('--') !== -1;
test = test.replace('--', '');
test += '_test.js';

const tests = fs.readdirSync(path.join(__dirname, 'methods'));

tests.forEach((file) => {
  describe(file.replace('_test.js', '()'), () => {
    if (!runSingleTest) {
      // eslint-disable-next-line
      require(path.join(__dirname, 'methods', file))(it, expect, { validator, rules });
    } else if (runSingleTest && file === test) {
      // eslint-disable-next-line
      require(path.join(__dirname, 'methods', file))(it, expect, { validator, rules });
    }
  });
});

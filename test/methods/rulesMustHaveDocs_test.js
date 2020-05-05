'use strict';

const path = require('path')
const { readdirSync } = require('fs');
const rules = require('../../src/rules');
let docs = readdirSync(path.resolve(__dirname, '../../docs/api')).map(file => file.replace('.md', ''));


module.exports = (it, expect, { validator }) => {
	it('should have been documented...every rule should be documented', () => {

		expect(Object.keys(rules).sort()).to.eql(docs);
	})
};


'use strict';

const { validator } = require('../../dist/index.js');

// errors force macro test
module.exports = (it, expect) => {
	let example = validator({ name: 'sam' }, { name: 'required' });

	it('should extend Errors Api using "forceMacro"', () => {
		expect(typeof example.example_force_macro_method === 'undefined').to.eql(true);

		example.forceMacro('example_force_macro_method', function () {
			return 'hello world';
		}, false);

		expect(typeof example.example_force_macro_method === 'undefined').to.eql(false);
		expect(example.example_force_macro_method()).to.eql('hello world');
	});

	it('should overwrite Validator Api default behavior using "forceMacro"', () => {
		expect(example.errors()).to.eql(example.errorMessageBag);

		example.forceMacro('errors', function () {
			return 'dummy error bag';
		}, false);

		expect(example.errors()).to.eql('dummy error bag');
	});

	it('should overwrite Validator api macros already defined when using "forceMacro"', () => {
		example.macro('inspire', function () {
			return 'hello world';
		}, false);

		expect(example.inspire()).to.eql('hello world');

		example.forceMacro('inspire', function () {
			return 'we believe in you';
		}, false);

		expect(example.inspire()).to.eql('we believe in you');
	});
};


'use strict';

const { validator } = require('../../dist/index.js');

// errors force macro test
module.exports = (it, expect) => {
	let example = validator({ name: 'sam' }, { name: 'required' });

	it('should extend Errors Api using "forceMacro"', () => {
		expect(typeof example.errors().example_force_macro_method === 'undefined').to.eql(true);

		example.errors().forceMacro('example_force_macro_method', function () {
			return 'hello world';
		});

		expect(typeof example.errors().example_force_macro_method === 'undefined').to.eql(false);
		expect(example.errors().example_force_macro_method()).to.eql('hello world');
	});

	it('should overwrite Error Messages Api default behavior using "forceMacro"', () => {
		example.errors().set('prop', ['a', 'b', 'c', 'd']);

		expect(example.errors().get('prop')).to.eql('a');

		example.errors().forceMacro('get', function (field) {
			if (this.has(field)) {
				return this.list(field).join(', ');
			}
		});

		expect(example.errors().get('prop')).to.eql('a, b, c, d');
	});

	it('should overwrite Error Messages Api macros already defined when using "forceMacro"', () => {
		example.errors().macro('inspire', () => 'hello world');

		expect(example.errors().inspire()).to.eql('hello world');

		example.errors().forceMacro('inspire', () => 'we believe in you');

		expect(example.errors().inspire()).to.eql('we believe in you');
	});
};

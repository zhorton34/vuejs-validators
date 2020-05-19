
'use strict';

const { validator } = require('../../dist/index.js');

// errors macro test
module.exports = (it, expect) => {
	let example = validator({ name: '' }, { name: 'required' });

	it('should be able to extend Errors Api using a "macro"', () => {
		expect(typeof example.errors().example_macro_method === 'undefined').to.eql(true);

		example.errors().macro('example_macro_method', function () {
			return 'hello world';
		});

		expect(typeof example.errors().example_macro_method === 'undefined').to.eql(false);
	});

	it('should not overwrite base Error Messages Api behavior using "macro"', () => {
		example.errors().set('prop', ['a', 'b', 'c', 'd']);

		expect(example.errors().get('prop')).to.eql('a');

		example.errors().macro('get', function (field) {
			return this.list(field).join(', ');
		});

		expect(example.errors().get('prop')).to.eql('a');
	});
};


'use strict';

const { validator } = require('../../dist/index.js');

// errors macro test
module.exports = (it, expect) => {
	it('should be able to extend Errors Api using on a specific instance but not globally using "localMacro"', () => {
		let example = validator({ name: '' }, { name: 'required' });

		expect(typeof example.errors().example_local_macro_method === 'undefined').to.eql(true);

		example.errors().localMacro('example_local_macro_method', function () {
			return 'hello world';
		});

		expect(typeof example.errors().example_local_macro_method === 'undefined').to.eql(false);
		expect(typeof validator({}).errors().example_local_macro_method === 'undefined').to.eql(true)
	});

	it('should not overwrite local base Error Messages Api', () => {
		let example = validator({ name: '' }, { name: 'required' });

		example.errors().set('prop', ['a', 'b', 'c', 'd']);

		expect(example.errors().get('prop')).to.eql('a');

		example.errors().localMacro('get', function (field) {
			return this.list(field).join(', ');
		});

		expect(example.errors().get('prop')).to.eql('a');

		let two = validator({});
		two.errors().set('prop', ['a', 'b', 'c', 'd']);

		expect(two.errors().get('prop')).to.eql('a');
	});
};


'use strict';

const { validator } = require('../../dist/index.js');

// errors macro test
module.exports = (it, expect) => {
	let example = validator({ name: '' }, { name: 'required' });

	it('should be able to extend Errors Api globally using "forceMacro"', () => {
		expect(typeof example.errors().force_macro_method === 'undefined').to.eql(true);

		example.errors().forceMacro('force_macro_method', function () {
			return 'hello world';
		});

		expect(typeof example.errors().force_macro_method === 'undefined').to.eql(false);
		expect(example.errors().force_macro_method()).to.eql('hello world');
		expect(validator().errors().force_macro_method()).to.eql('hello world');
	});

	it('should overwrite base Error Messages Api behavior globally using "forceMacro"', () => {
		let example = validator({});

		example.errors().set('prop', ['a', 'b', 'c', 'd']);

		expect(example.errors().get('prop')).to.eql('a');

		example.errors().forceMacro('get', function (field) {
			return this.list(field).join(', ');
		});

		expect(example.errors().get('prop')).to.eql('a, b, c, d');

		let two = validator({});

		two.errors().set('prop', ['a', 'b', 'c', 'd']);

		expect(two.errors().get('prop')).to.eql('a, b, c, d');

		two.errors().forceMacro('get', function (field) {
			if (this.has(field)) {
				return this.list(field)[0];
			}
		});

		expect(two.errors().get('prop')).to.eql('a');
	});
};

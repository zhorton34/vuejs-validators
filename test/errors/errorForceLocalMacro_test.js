
'use strict';

const { validator } = require('../../dist/index.js');

// errors macro test
module.exports = (it, expect) => {

	it('should be able to extend Errors Api using on specific instance but not globally using "forceLocalMacro"', () => {
		let example = validator({ name: '' }, { name: 'required' });
		expect(typeof example.errors().force_local_macro_method === 'undefined').to.eql(true);

		example.errors().forceLocalMacro('force_macro_method', function () {
			return 'hello world';
		});

		expect(typeof example.errors().force_macro_method === 'undefined').to.eql(false);
		expect(typeof validator().errors().force_macro_method === 'undefined').to.eql(true);
	});

	it('should overwrite base Error Messages Api on specific instance but not globally using "forceLocalMacro"', () => {
		let example = validator({});
		example.errors().set('prop', ['a', 'b', 'c', 'd']);

		expect(example.errors().get('prop')).to.eql('a');

		example.errors().forceLocalMacro('get', function (field) {
			return this.list(field).join(', ');
		});

		expect(example.errors().get('prop')).to.eql('a, b, c, d');

		let two = validator({}).errors();

		two.set('prop', ['a', 'b', 'c', 'd']);

		expect(two.get('prop')).to.eql('a');
	});
};

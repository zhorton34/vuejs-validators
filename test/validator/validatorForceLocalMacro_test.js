
'use strict';

const { validator } = require('../../dist/index.js');

module.exports = (it, expect) => {
	it('should be able to extend validator instance using "forceLocalMacro"', () => {
		let example = validator();
		expect(Object.keys(example).includes('example_force_macro_method')).to.eql(false);

		example.forceLocalMacro('example_force_local_macro', function () {
			return 'hello world';
		});

		expect(typeof example.example_force_local_macro === 'undefined').to.eql(false);
		expect(typeof validator().example_force_local_macro === 'undefined').to.eql(true);

		expect(example.example_force_local_macro()).to.eql('hello world');
	});

	it('should forcibly overwrite base validator prototype method on specific instance but not globally using "forceLocalMacro"', () => {
		let example = validator({ name: 'sam' });
		expect(example.errors()).to.eql(example.errorMessageBag);

		example.forceLocalMacro('errors', function () {
			return 'hello world';
		});

		expect(example.errors()).to.eql('hello world');
		expect(validator({}).errors() === 'hello world').to.eql(false);
	});
};

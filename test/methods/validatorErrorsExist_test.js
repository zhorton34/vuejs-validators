'use strict';

module.exports = (it, expect, { validator }) => {
	let data = { name: '' };
	let rules = { name: 'string|min:3 ' };

	let validation = validator(data, rules).validate();

	console.log('list: ', validation.errors.list());
	console.log('get: ', validation.errors.get());
	console.log('exit: ', validation.errors.exist());

	it('error messages "exist"', () =>
	{
		expect(validation.errors.exist()).to.eql(true);

	});
};

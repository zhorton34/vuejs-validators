'use strict';

module.exports = (it, expect, { validator }) => {
	let data = { name: '' };
	let rules = { name: 'string|min:3 ' };

	let validation = validator(data, rules).validate();

	it('error messages "exist"', () =>
	{
		expect(validator(data, rules).validate().errors.any()).to.eql(true);

	});
};

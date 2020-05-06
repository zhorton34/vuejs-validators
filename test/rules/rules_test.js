'use strict';

module.exports = (it, expect, { validator }) => {
	let validation = validator(
		{ name: 'zak' },
		{ name: 'required|min:8' }
	).validate();

	validation.validate();
	it('should return the passed in rules', () => {
		expect(validation.errors().all()).to.eql({
			name: [
				"name isn't allowed to be less than 8 characters"
			]
		});

	})
};

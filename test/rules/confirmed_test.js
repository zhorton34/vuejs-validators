
'use strict';

module.exports = (it, expect, { validator }) => {
	let validation = validator(
		{ password_confirmation: 'secret', password: 'secret' },
		{ password: 'confirmed' },
	).validate();

	it('should not have error message if password is "confirmed"', () => {
		expect(validation.errors().has('password')).to.eql(false);
	});

	let failingValidator = validator(
		{ password_confirmation: 'secret', password: 'not_a_secret' },
		{ password: 'confirmed' },
	).validate();

	it('should have error message if password is NOT confirmed', () => {
		expect(failingValidator.errors().has('password')).to.eql(true);
	});

	let lastFailingValidator = validator(
		{ password: 'not_a_secret' },
		{ password: 'confirmed' },
	).validate();

	it('should have error message if password does not have associated confirmation field', () => {
		expect(lastFailingValidator.errors().has('password')).to.eql(true);
	})
};

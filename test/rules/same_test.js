
'use strict';

module.exports = (it, expect, { validator }) => {
	let validation = validator(
		{ confirm_password: 'secret', password: 'secret' },
		{ password: 'same:confirm_password' },
	).validate();

	it('should not have error message if password is "same" as confirm password', () => {
		expect(validation.errors().has('password')).to.eql(false);
	});

	let failingValidator = validator(
		{ confirm_password: 'secret', password: 'not_a_secret' },
		{ password: 'same:confirm_password' },
	).validate();

	it('should have error message if password is NOT "same" as confirm password', () => {
		expect(failingValidator.errors().has('password')).to.eql(true);
	})
};

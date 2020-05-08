
'use strict';

module.exports = (it, expect, { validator }) => {
	let validation = validator(
		{ old_password: 'password', new_password: 'secret' },
		{ new_password: 'different:old_password' },
		{
			'new_password.different': ':attribute needs to be different than :different field',
		}
	).validate();

	it('should not have error message if old password is "different" from new password', () => {
		expect(validation.errors().has('new_password')).to.eql(false);
	});

	let failingValidator = validator(
		{ old_password: 'password', new_password: 'password' },
		{ new_password: 'different:old_password' },
		{
			'new_password.different': ':attribute needs to be different than :different field',
		}
	).validate();

	it('should not have error message if old password is NOT "different" from new password', () => {
		expect(failingValidator.errors().has('new_password')).to.eql(true);
	})
};

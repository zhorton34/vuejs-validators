
'use strict';

module.exports = (it, expect, { validator }) => {
	let validation = validator(
		{
			password: 'secret',
			confirm_password: '',
		},
		{ password: 'same:confirm_password' },
		{ 'password.same': ':attribute must match :same' }
	);

	validation.validate();

	it('should replace confirm_password attribute with confirm password', () => {
		expect(validation.errors().get('password')).to.eql(
			"Password must match confirm password"
		);
	})
};

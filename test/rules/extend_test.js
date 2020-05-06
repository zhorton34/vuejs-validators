'use strict';

module.exports = (it, expect, { validator }) => {
	let data = {
		name: 'sarah',
		email: 'sarah.black@gmail.com',
		password: 'f',
		confirm_password: 'asdf'
	};

	let rules = {
		name: 'required|uppercase|min:5',
		email: 'required|email|min:4',
		password: 'required|same:confirm_password',
		confirm_password: 'required',
	};

	let validation = validator(data, rules).extend({
		uppercase: [
			':attribute must be uppercase',
			({ value }) => value.toUpperCase() === value
		],

		same: [
			':attribute must be the same as :same field',
			({ value, parameters, validator }) => value === validator.data[parameters[0]]
		],
	})
	.validate();

	it('should fail the test and return the proper message for "must be uppercase"', () => {
		expect(validation.errors().all()).to.eql({
			name: ["name must be uppercase"],
			email: [],
			confirm_password: [],
			password: ["password must be the same as confirm_password field"]
		});
	})
};

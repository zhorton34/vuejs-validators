
module.exports = (it, expect, { validator }) => {
	let data = { name: 'sam', email: '' };
	let rules = { name: 'required|min:8', email: 'email' };
	let messages = {
		'email.email': ':attribute is not email',
		'name.min': ':attribute is a custom :min char minimum error message'
	};

	let errors = validator(data, rules, messages).validate().errors();

	it('should retrieve "all" field messages as object of fields as keys and arrays of messages as values', () => {
		expect(errors.all()).to.eql({
			email: ["email is not email"],
			name: ["name is a custom 8 char minimum error message"]
		});

		expect(errors.all()).to.eql(errors.messages);

		errors.set({ name: ['test'] });

		expect(errors.all()).to.eql({ name: ['test' ] });

		expect(errors.all()).to.eql(errors.messages);
	});
};

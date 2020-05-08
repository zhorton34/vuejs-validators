
module.exports = (it, expect, { validator }) => {
	let data = { name: 'sam', email: '' };
	let rules = { name: 'required|min:8', email: 'email' };
	let messages = {
		'email.email': ':attribute is not email',
		'name.min': ':attribute is a custom :min char minimum error message'
	};

	let errors = validator(data, rules, messages).validate().errors();

	it('should "forget" all error messages', () => {
		expect(errors.all()).to.eql({
			email: ["Email is not email"],
			name: ["Name is a custom 8 char minimum error message"]
		});

		errors.forget();

		expect(errors.all()).to.eql({});
	});


	it('should "forget" only the specified fields error messages', () => {
		errors.set({
			first: ['abc', 'bcd', 'dce'],
			second: ['vwx', 'wxy', 'xyz'],
		});

		expect(errors.all()).to.eql({
			first: ['abc', 'bcd', 'dce'],
			second: ['vwx', 'wxy', 'xyz'],
		});

		errors.forget('second');

		expect(errors.all()).to.eql({
			first: ['abc', 'bcd', 'dce'],
			second: [],
		});

		expect(errors.has('second')).to.eql(false);
	})
};

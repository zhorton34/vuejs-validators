
module.exports = (it, expect, { validator }) => {
	let data = { name: 'sam', email: 'sam@gmail.com' };
	let rules = { name: 'required|min:8', email: 'email' };
	let messages = { 'name.min': ':attribute is a custom :min char minimum error message' };

	let errors = validator(data, rules, messages).validate().errors();

	it('"has" errors should return true for field with errors', () => {
		expect(errors.has('name')).to.eql(true);
	});

	it('"has" errors should return false for field with no errors', () => {
		expect(errors.has('email')).to.eql(false);
	});

	it('"has" errors should return false for field that does not exist', () => {
		expect(errors.has('does_not_exist')).to.eql(false);
	});
};

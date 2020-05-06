
module.exports = (it, expect, { validator }) => {
	let data = { name: 'sam', email: '' };
	let rules = { name: 'required|min:8', email: 'email' };
	let messages = {
		'email.email': ':attribute must be an email',
		'name.min': ':attribute is a custom :min char minimum error message'
	};

	let errors = validator(data, rules, messages).validate().errors();

	it('should properly "list" an array of all error messages', () => {
		expect(errors.list().sort()).to.eql([
			"email must be an email",
			"name is a custom 8 char minimum error message"
		]);
	});

	it('should "list" an array of error messages for a specific field', () => {
		errors.set({
			first: ['abc', 'bcd', 'cde'],
			second: ['def', 'efg', 'fgh'],
			third: ['ghi', 'hij', 'ijk'],
		});

		expect(errors.all()).to.eql({
			first: ['abc', 'bcd', 'cde'],
			second: ['def', 'efg', 'fgh'],
			third: ['ghi', 'hij', 'ijk'],
		});

		expect(errors.list()).to.eql([
			'abc', 'bcd', 'cde',
			'def', 'efg', 'fgh',
			'ghi', 'hij', 'ijk',
		]);

		expect(errors.list('first')).to.eql(['abc', 'bcd', 'cde']);
		expect(errors.list('second')).to.eql(['def', 'efg', 'fgh']);
		expect(errors.list('third')).to.eql(['ghi', 'hij', 'ijk']);
	});
};

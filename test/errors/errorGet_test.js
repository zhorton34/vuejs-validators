'use strict';

module.exports = (it, expect, { validator }) => {
	it('should "get" the first error for the given field', () => {
		let data = { name: 'sam' };
		let rules = { name: 'required|min:8' };
		let messages = { 'name.min': ':attribute is a custom :min char minimum error message' };

		expect(
			validator(data, rules, messages)
				.validate()
				.errors()
				.get('name')
		).to.eql("name is a custom 8 char minimum error message");
	})
};

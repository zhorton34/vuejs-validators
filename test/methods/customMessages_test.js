'use strict';

module.exports = (it, expect, { validator }) => {
	let validation = (validator(
		{ name: 'zak' },
		{ name: 'required|min:8' },
		{ 'name.min': ':attribute is a custom :min char minimum error message' }
	)).validate();

	it('should return the passed in rules', () => {
		expect(validation.getErrors()).to.eql({
			name: ["name is a custom 8 char minimum error message"]
		});
	})
};

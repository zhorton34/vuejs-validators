
module.exports = (it, expect, { validator }) => {
	let data = { name: 'sam', email: 'sam@gmail.com' };
	let rules = { name: 'required|min:8', email: 'email' };
	let messages = { 'name.min': ':attribute is a custom :min char minimum error message' };

	let errors = validator(data, rules, messages).validate().errors();

	it('should properly structure messages in preparation for testing errors "set"', () => {
		expect(errors.messages).to.eql({
			email: [],
			name: ["Name is a custom 8 char minimum error message"]
		});
	});

	it('should "set" error messages array on name single field', () => {
		errors.set('name', ['set', 'error', 'messages on the', 'name', 'field']);

		expect(errors.messages).to.eql({
			email: [],
			name: ['set', 'error', 'messages on the', 'name', 'field']
		});
	});

	it('should "set" entire errors messages object', () => {
		errors.set({ something: ['works'], another: [] });

		expect(errors.messages).to.eql({ something: ['works'], another: [] });
	});

};

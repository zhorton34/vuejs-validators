
'use strict';

module.exports = (it, expect, { validator }) => {
	let form = {};
	let rules = {};
	let successful = (data, rulings) => validator(data, rulings).validate().passing();

	it('should pass "required_with" rule', () => {
		form = { name: 'sam', email: 'example@gmail.com' };
		rules = { name: 'required', email: 'required_with:name' };
		expect(successful(form, rules)).to.eql(true);

		form = { id: 1, email: 'example@gmail.com' };
		rules = { id: 'required', email: 'required_with:id,name' };
		expect(successful(form, rules)).to.eql(true);

		form = { id: 1, name: 'samuel', email: 'example@gmail.com' };
		rules = { id: 'required', name: 'required', email: 'required_with:id,name' };
		expect(successful(form, rules)).to.eql(true);
	});

	it('should fail "required_with" rule', () => {
		form = { name: 'sam', email: '' };
		rules = { name: 'required', email: 'required_with:name' };
		expect(successful(form, rules)).to.eql(false);

		form = { name: '', email: 'example@gmail.com' };
		rules = { email: 'required_with:name' };
		expect(successful(form, rules)).to.eql(false);

		form = { email: 'example@gmail.com' };
		rules = { email: 'required_with:name' };
		expect(successful(form, rules)).to.eql(false);

		form = { id: null, name: 'example', email: 'example@gmail.com '};
		rules = { email: 'required_with:name,id' };
		expect(successful(form, rules)).to.eql(false);

		form = { name: 'example', email: 'example@gmail.com' };
		rules = { email: 'required_with:name,id' };
		expect(successful(form, rules)).to.eql(false);
	});
};

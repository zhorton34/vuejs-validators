
'use strict';

module.exports = (it, expect, { validator }) => {
	// Email Required Without All Fields Id, Name, Password
	let form = {};
	let rules = { email: 'required_without_all:id,name,password' };
	let successful = (data, rulings) => validator(data, rulings).validate().passing();

	it('should pass "required_without_all" rule', () => {
		form = { email: 'example@gmail.com' };
		expect(successful(form, rules)).to.eql(true);
	});

	it('should fail "required_without_all" rule', () => {
		let form = { name: 'example' };
		expect(successful(form, rules)).to.eql(true);

		form = { email: '' };
		expect(successful(form, rules)).to.eql(false);

		form = { name: null, email: 'example@gmail.com' };
		expect(successful(form, rules)).to.eql(false);

		form = { name: 'example', email: 'example@gmail.com' };
		expect(successful(form, rules)).to.eql(false);

		form = { id: 1, name: '', email: '' };
		expect(successful(form, rules)).to.eql(false);

		form = { id: 1, name: '', email: 'example@gmail.com' };
		expect(successful(form, rules)).to.eql(false);
	});
};

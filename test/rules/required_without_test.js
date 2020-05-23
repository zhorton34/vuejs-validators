
'use strict';

module.exports = (it, expect, { validator }) => {
	let form = {};
	let rules = {};
	let successful = (data, rulings) => validator(data, rulings).validate().passing();

	it('should pass "required_without" rule', () => {
		form = { name: 'sam', email: '' };
		rules = { name: 'required', email: 'required_without:name' };
		expect(successful(form, rules)).to.eql(true);

		form = { name: '', email: 'example@gmail.com' };
		rules = { email: 'required_without:name' };
		expect(successful(form, rules)).to.eql(true);

		form = { email: 'example@gmail.com' };
		rules = { email: 'required_without:name' };
		expect(successful(form, rules)).to.eql(true);

		form = { id: null, name: 'example', email: 'example@gmail.com '};
		rules = { email: 'required_without:name,id' };
		expect(successful(form, rules)).to.eql(true);

		form = { name: 'example', email: 'example@gmail.com' };
		rules = { email: 'required_without:name,id' };
		expect(successful(form, rules)).to.eql(true);
	});

	it('should fail "required_without" rule', () => {
		form = { name: 'sam', email: 'example@gmail.com' };
		rules = { name: 'required', email: 'required_without:name' };
		expect(successful(form, rules)).to.eql(false);

		form = { id: 1, email: 'example@gmail.com' };
		rules = { id: 'required', email: 'required_without:id,name' };
		expect(successful(form, rules)).to.eql(false);

		form = { id: 1, name: 'samuel', email: 'example@gmail.com' };
		rules = { id: 'required', name: 'required', email: 'required_without:id,name' };
		expect(successful(form, rules)).to.eql(false);
	});
};

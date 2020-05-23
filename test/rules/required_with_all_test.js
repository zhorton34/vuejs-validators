
'use strict';

module.exports = (it, expect, { validator }) => {
	let form = {};
	let rules = {};
	let succeed = (data, checks) => it(
		`should pass  \n ------------------------------- \n  FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(checks)}`,
		() => { expect(validator(data, checks).validate().errors().any()).to.eql(false) }
	);

	let failure = (data, checks) => it(
		`Should Fail \n ------------------------------- \n FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(checks)}`,
		() => { expect(validator(data, checks).validate().errors().any()).to.eql(true) }
	);

	succeed({ name: 'sam', email: 'example@gmail.com' }, { name: 'required', email: 'required_with_all:name' });
	succeed({ id: 1, name: 'sam', email: 'example@gmail.com' }, { id: 'required', email: 'required_with_all:id,name' });
	succeed({ id: 1, name: 'samuel', email: 'example@gmail.com' }, { id: 'required', name: 'required', email: 'required_with_all:id,name' });

	failure({ name: 'sam', email: '' }, { email: 'required_with_all:name' });
	failure({ name: '', id: 1, email: 'example@gmail.com' }, { email: 'required_with_all:id,name' });
	failure({ email: 'example@gmail.com' },{ email: 'required_with_all:name,id' });
	failure({ id: null, name: 'example', email: 'example@gmail.com '}, { email: 'required_with:name,id' });
	failure({ id: 1, name: 'example', email: 'example@gmail.com' },{ email: 'required_with:name,id,password' });
};

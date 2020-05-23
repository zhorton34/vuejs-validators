
'use strict';

module.exports = (it, expect, { validator }) => {

	let succeed = (data, checks) => it(
		`should pass  \n ------------------------------- \n  FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(checks)}`,
		() => { expect(validator(data, checks).validate().errors().any()).to.eql(false) }
	);

	let failure = (data, checks) => it(
		`Should Fail \n ------------------------------- \n FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(checks)}`,
		() => { expect(validator(data, checks).validate().errors().any()).to.eql(true) }
	);

	succeed(
		{ email: 'example@gmail.com', name: 'dummy_value' },
		{ email: 'required_if:name,dummy_value' }
	);

	succeed({ email: 'example@gmail.com', name: '' }, { email: 'required_if:name,dummy_value' });

	failure({ name: 'example', }, { email: 'required_if:name,example' });
	failure({ name: 'example', email: '' }, { email: 'required_if:name,example' });
	failure({ name: 'example', email: null }, { email: 'required_if:name,example' });
	failure({ name: 'example', email: [] }, { email: 'required_if:name,example' });
	failure({ name: 'example', email: {} }, { email: 'required_if:name,example' });
};

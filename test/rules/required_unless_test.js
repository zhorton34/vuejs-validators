
'use strict';

module.exports = (it, expect, { validator }) => {
	const succeed = (data, rules) => it(
		`should Pass  \n ------------------------------- \n  FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(rules)}`,
		() => { expect(validator(data, rules).validate().errors().any()).to.eql(false) }
	);

	const failure = (data, rules) => it(
		`Should Fail \n ------------------------------- \n FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(rules)}`,
		() => { expect(validator(data, rules).validate().failing()).to.eql(true) }
	);

	failure({ name: 'example', }, { email: 'required_unless:name,dummy_value' });
	failure({ email: '', name: '', }, { email: 'required_unless:name,dummy_value' });
	failure({ email: null, name: 'ex', }, { email: 'required_unless:name,dummy_value' });
	failure({ email: [], name: 'ex', }, { email: 'required_unless:name,dummy_value' });
	failure({ email: {}, name: 'ex', }, { email: 'required_unless:name,dummy_value' });
	failure({ email: null, name: 'ex', }, { email: 'required_unless:name,dummy_value' });

	succeed({ name: 'dummy_value' }, { email: 'required_unless:name,dummy_value' });
	succeed({ email: '', name: 'dummy_value' }, { email: 'required_unless:name,dummy_value' });
	succeed({ email: null, name: 'dummy_value' }, { email: 'required_unless:name,dummy_value' });
	succeed({ email: [], name: 'dummy_value' }, { email: 'required_unless:name,dummy_value' });
	succeed({ email: {}, name: 'dummy_value' }, { email: 'required_unless:name,dummy_value' });
	succeed({ email: 'example@gmail.com', name: 'dummy_value' }, { email: 'required_unless:name,dummy_value' });
	succeed({ email: 'example@gmail.com', name:'dummy_value' }, { email: 'required_unless:name,dummy' });

};

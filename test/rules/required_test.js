
'use strict';


module.exports = (it, expect, { validator }) => {
	const RULE = '"required"';

	let succeed = (data, rules) => it(
		`should pass ${RULE} \n FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(rules)}`,
		() => { expect(validator(data, rules).validate().errors().any()).to.eql(false) }
	);

	let failure = (data, rules) => it(
		`Should Fail \n ------------------------------- \n FORM: (${JSON.stringify(data)}) \n RULES: ${JSON.stringify(rules)}`,
		() => { expect(validator(data, rules).validate().errors().any()).to.eql(true) }
	);

	succeed({ check: 1 }, { check: 'required' });
	succeed({ check: 'text' }, { check: 'required' });
	succeed({ check: ['array'] }, { check: 'required' });
	succeed({ check: { name: 'object' } }, { check: 'required' });

	failure({}, { check: 'required' });
	failure({ check: '' }, { check: 'required' });
	failure({ check: [] }, { check: 'required' });
	failure({ check: {} }, { check: 'required' });
	failure({ check: null }, { check: 'required' });
};

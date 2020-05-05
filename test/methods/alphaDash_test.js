'use strict';

module.exports = (it, expect, { rules }) => {
	const { alpha_dash } = rules;

	it('should pass "alpha_dash" rule', () =>
	{
		expect(alpha_dash({ value: 'abc' })).to.eql(true);
		expect(alpha_dash({ value: 'abc-hey-84' })).to.eql(true);
		expect(alpha_dash({ value: '4--_abc_heY-84' })).to.eql(true);
		expect(alpha_dash({ value: 34 })).to.eql(true);
	});

	it('should fail "alpha_dash" rule', () => {
		expect(alpha_dash({ value: '4 _abc_hey-84' })).to.eql(false);
	});
};

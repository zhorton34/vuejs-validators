'use strict';

module.exports = (it, expect, { rules }) => {
	const { alpha_num } = rules;

	it('should pass "alpha_num" rule', () =>
	{
		expect(alpha_num({ value: 'abc43fasd' })).to.eql(true);
		expect(alpha_num({ value: 'abchey84' })).to.eql(true);
		expect(alpha_num({ value: '4abcheY84' })).to.eql(true);
		expect(alpha_num({ value: 34 })).to.eql(true);
	});

	it('should fail "alpha_num" rule', () => {
		expect(alpha_num({ value: '4_abc_hey-84' })).to.eql(false);
		expect(alpha_num({ value: '4 _abc_hey-84' })).to.eql(false);
		expect(alpha_num({ value: '4@_abc_hey-84' })).to.eql(false);
	});
};

'use strict';

module.exports = (it, expect, { rules }) => {
	const { alpha } = rules;

	it('should pass "alpha" rule', () =>
	{
		expect(alpha({ value: 'abcdefghijklmnopqrstuvwxyz' })).to.eql(true);
		expect(alpha({ value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' })).to.eql(true);
	});

	it('should fail "alpha" rule', () => {
		expect(alpha({ value: 'ab2c' })).to.eql(false);
		expect(alpha({ value: 42345 })).to.eql(false);
	});
};

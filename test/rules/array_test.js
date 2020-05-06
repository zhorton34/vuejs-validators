'use strict';

module.exports = (it, expect, { rules }) => {
	const { array } = rules;

	it('should pass "array" rule', () =>
	{
		expect(array({ value: [] })).to.eql(true);
		expect(array({ value: ['one', 'two'] })).to.eql(true);
	});

	it('should fail "array" rule', () => {
		expect(array({ value: 'ab2c' })).to.eql(false);
		expect(array({ value: 42345 })).to.eql(false);
		expect(array({ value: false })).to.eql(false);
		expect(array({ value: {} })).to.eql(false);
	});
};

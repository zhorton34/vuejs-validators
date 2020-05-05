'use strict';

module.exports = (it, expect, { rules }) => {
	const { between } = rules;

	it('should pass "between" rule', () => {
		expect(between({ value: 5, parameters: ['2,8'] })).to.eql(true);
	});

	it('should fail "between" rule', () => {
		expect(between({ value: 4, parameters: ['3,4'] })).to.eql(false);
		expect(between({ value: 3, parameters: ['3,4'] })).to.eql(false);
		expect(between({ value: 5, parameters: ['1,2'] })).to.eql(false);
		expect(between({ value: 0, parameters: ['1,2'] })).to.eql(false);
	});
};

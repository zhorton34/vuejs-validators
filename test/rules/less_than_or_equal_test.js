
'use strict';

module.exports = (it, expect, { rules }) => {
	const { lte } = rules;

	it('should return true if value passes "lte" (less_than_or_equal) rule', () =>
	{
		expect(lte({ value: 1, parameters:[1] })).to.eql(true)
		expect(lte({ value: '1000', parameters: ['10024'] })).to.eql(true);
		expect(lte({ value: 100, parameters: [300] })).to.eql(true);
		expect(lte({ value: '0.5', parameters: [0.6] })).to.eql(true);
		expect(lte({ value: 0.01, parameters: [4] })).to.eql(true);
	});

	it('should return false if value fails "lte" (less_than_or_equal) rule', () =>
	{
		expect(lte({ value: 'fd', parameters: ['2'] })).to.eql(false);
		expect(lte({ value: '5434', parameters: ['10'] })).to.eql(false);
		expect(lte({ value: 5434345, parameters: ['4'] })).to.eql(false);
		expect(lte({ value: 0.3, parameters: [0.1] })).to.eql(false);
	});
};

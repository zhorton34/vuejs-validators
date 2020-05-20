
'use strict';

module.exports = (it, expect, { rules }) => {
	const { gte } = rules;

	it('should return true if value passes "gte" (greater than or equal) rule', () =>
	{
		expect(gte({ value: '5434', parameters: ['10'] })).to.eql(true);
		expect(gte({ value: 5434345, parameters: ['4'] })).to.eql(true);
		expect(gte({ value: 0.3, parameters: [0.1] })).to.eql(true);
		expect(gte({ value: 1, parameters: [1] })).to.eql(true);
	});

	it('should return false if value fails "gte" (greater than or equal) rule', () =>
	{
		expect(gte({ value: '1000', parameters: ['10024'] })).to.eql(false);
		expect(gte({ value: 100, parameters: [300] })).to.eql(false);
		expect(gte({ value: '0.5', parameters: [0.6] })).to.eql(false);
		expect(gte({ value: 0.01, parameters: [4] })).to.eql(false);
	});
};

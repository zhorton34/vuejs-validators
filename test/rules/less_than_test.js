
'use strict';

module.exports = (it, expect, { rules }) => {
	const { less_than } = rules;

	it('should return true if value passes "less_than" rule', () =>
	{
		expect(less_than({ value: '1000', parameters: ['10024'] })).to.eql(true);
		expect(less_than({ value: 100, parameters: [300] })).to.eql(true);
		expect(less_than({ value: '0.5', parameters: [0.6] })).to.eql(true);
		expect(less_than({ value: 0.01, parameters: [4] })).to.eql(true);
	});

	it('should return false if value fails "less_than" rule', () =>
	{
		expect(less_than({ value: 1, parameters: [1] })).to.eql(false);
		expect(less_than({ value: 'fd', parameters: ['2'] })).to.eql(false);
		expect(less_than({ value: '5434', parameters: ['10'] })).to.eql(false);
		expect(less_than({ value: 5434345, parameters: ['4'] })).to.eql(false);
		expect(less_than({ value: 0.3, parameters: [0.1] })).to.eql(false);
	});
};

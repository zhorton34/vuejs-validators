
'use strict';

module.exports = (it, expect, { rules }) => {
	const { digits } = rules;

	it('should return true if value passes "digits" rule', () =>
	{
		expect(digits({ value: '1000', parameters: ['4'] })).to.eql(true);
		expect(digits({ value: 100, parameters: ['3'] })).to.eql(true);
	});

	it('should return false if value fails "digits" rule', () =>
	{
		expect(digits({ value: 'fd', parameters: ['2'] })).to.eql(false);
		expect(digits({ value: '5434', parameters: ['10'] })).to.eql(false);
		expect(digits({ value: 5434345, parameters: ['4'] })).to.eql(false);
	});
};

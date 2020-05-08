
'use strict';

module.exports = (it, expect, { rules }) => {
	const { digits_between } = rules;

	it('should return true if value passes "digits_between" rule', () =>
	{
		expect(digits_between({ value: '1000', parameters: ['3,5'] })).to.eql(true);
		expect(digits_between({ value: 100, parameters: ['1,8'] })).to.eql(true);
	});

	it('should return false if value fails "digits_between" rule', () =>
	{
		expect(digits_between({ value: 21, parameters: ['1,2'] })).to.eql(false);
		expect(digits_between({ value: 'fd', parameters: ['1,4'] })).to.eql(false);
		expect(digits_between({ value: '5434', parameters: ['4,8'] })).to.eql(false);
		expect(digits_between({ value: 5434345, parameters: ['7,9'] })).to.eql(false);
	});
};

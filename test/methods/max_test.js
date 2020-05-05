'use strict';
module.exports = (it, expect, { rules }) => {
	const { max } = rules;

	it('should return true if length is less than "max"', () =>
	{
		expect(max({ value: 'example', parameters: ['50'] })).to.eql(true);
		expect(max({ value: 'ex', parameters: ['3'] })).to.eql(true);
	});
	it('should return false if length is more than "max"', () =>
	{
		expect(max({ value: 'something', parameters: ['2'] })).to.eql(false);
		expect(max({ value: 'four', parameters: ['3'] })).to.eql(false);
	});
};

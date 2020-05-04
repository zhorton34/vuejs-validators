'use strict';
module.exports = (it, expect, { rules }) => {
	const { max } = rules;

	it('should return true if length is less than "max"', () =>
	{
		expect(max('example', '50')).to.eql(true);
		expect(max('ex', '3')).to.eql(true);
	});
	it('should return false if length is more than "max"', () =>
	{
		expect(max('something', '2')).to.eql(false);
		expect(max('four', '3')).to.eql(false);
	});
};

'use strict';
module.exports = (it, expect, { rules }) => {
	const { min } = rules;

	it('should return true if length is more than "min"', () =>
	{
		expect(min('example', '2')).to.eql(true);
		expect(min('ex', '1')).to.eql(true);
	});
	it('should return false if length is less than "min"', () =>
	{
		expect(min('s', '2')).to.eql(false);
		expect(min('fourteen', '10')).to.eql(false);
	});
};

'use strict';
module.exports = (it, expect, { rules }) => {
	const { boolean } = rules;

	it('should return true if boolean', () =>
	{
		expect(boolean(true)).to.eql(true);
		expect(boolean(false)).to.eql(true);
	});
	it('should return false if not a boolean', () =>
	{
		expect(boolean('something')).to.eql(false);
		expect(boolean('four')).to.eql(false);
		expect(boolean(1)).to.eql(false);
		expect(boolean(0)).to.eql(false);
		expect(boolean({})).to.eql(false);
		expect(boolean([])).to.eql(false);
		expect(boolean('')).to.eql(false);
		expect(boolean(undefined)).to.eql(false);
		expect(boolean(null)).to.eql(false);
	});
};

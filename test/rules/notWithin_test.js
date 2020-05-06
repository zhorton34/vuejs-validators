'use strict';
module.exports = (it, expect, { rules }) => {
	const { not_within } = rules;

	it('should return false for passing "not_within" rule', () =>
	{
		expect(not_within({ value: 'item', parameters: ['one,item,two,three'] })).to.eql(false);
		expect(not_within({ value: 'something', parameters: ['something,item,two,three'] })).to.eql(false);
	});
	it('should return true for "not_within" rule', () =>
	{
		expect(not_within({ value: 'something', parameters: ['one,item,two,three'] })).to.eql(true);
		expect(not_within({ value: 'four', parameters: ['something,item,two,three'] })).to.eql(true);
	});

};

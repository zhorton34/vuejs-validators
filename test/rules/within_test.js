'use strict';
module.exports = (it, expect, { rules }) => {
	const { within } = rules;

	it('should return true if "within" comma delimited list', () =>
	{
		expect(within({ value: 'item', parameters: ['one,item,two,three'] })).to.eql(true);
		expect(within({ value: 'something', parameters: ['something,item,two,three'] })).to.eql(true);
	});
	it('should return false if not "within" comma delimited list', () =>
	{
		expect(within({ value: 'something', parameters: ['one,item,two,three'] })).to.eql(false);
		expect(within({ value: 'four', parameters: ['something,item,two,three'] })).to.eql(false);
	});

};

'use strict';
module.exports = (it, expect, { rules }) => {
	const { within } = rules;

	it('should return true if "within" comma delimited list', () =>
	{
		expect(within('item', 'one,item,two,three')).to.eql(true);
		expect(within('something', 'something,item,two,three')).to.eql(true);
	});
	it('should return false if not "within" comma delimited list', () =>
	{
		expect(within('something', 'one,item,two,three')).to.eql(false);
		expect(within('four', 'something,item,two,three')).to.eql(false);
	});

};

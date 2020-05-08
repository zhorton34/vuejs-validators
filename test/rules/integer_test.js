
'use strict';

module.exports = (it, expect, { rules }) => {
	const { integer } = rules;

	it('should return true if value passes "integer" rule', () =>
	{
		expect(integer({ value: 12 })).to.eql(true);
		expect(integer({ value: "15" })).to.eql(true);
	});

	it('should return false if value fails "integer" rule', () =>
	{
		expect(integer({ value: 'fd', })).to.eql(false);
		expect(integer({ value: '23.233' })).to.eql(false);
		expect(integer({ value: '12.003' })).to.eql(false);
		expect(integer({ value: [0, 1, 2, 0] })).to.eql(false);
	});
};

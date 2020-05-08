
'use strict';

module.exports = (it, expect, { rules }) => {
	const { distinct } = rules;

	it('should return true if value passes "distinct" rule', () =>
	{
		expect(distinct({ value: [0, 1, 2, 6] })).to.eql(true);
		expect(distinct({ value: ['hey', 'oh', 'world', 'do'] })).to.eql(true);
	});

	it('should return false if value fails "distinct" rule', () =>
	{
		expect(distinct({ value: 'fd', })).to.eql(false);
		expect(distinct({ value: 5434345 })).to.eql(false);
		expect(distinct({ value: [0, 1, 2, 0] })).to.eql(false);
	});
};


'use strict';

module.exports = (it, expect, { rules }) => {
	const { min } = rules;

	it('should return true if length is more than "min"', () =>
	{
		expect(min({ value: 'example', parameters: ['2'] })).to.eql(true);
		expect(min({ value: 'ex', parameters: ['1'] })).to.eql(true);
	});
	it('should return false if length is less than "min"', () =>
	{
		expect(min({ value: 's', parameters: ['2'] })).to.eql(false);
		expect(min({ value: 'fourteen', parameters: ['10'] })).to.eql(false);
	});
};

'use strict';

module.exports = (it, expect, { rules }) => {
	const { required } = rules;

	it('should return true if value is properly passed "required" rule', () =>
	{
		expect(required('asdf')).to.eql(true);
		expect(required(5)).to.eql(true);
		expect(required(['one'])).to.eql(true);
		expect(required({ example: 'hey' })).to.eql(true);
	});
	it('should return false value is not passing "required" rule', () =>
	{
		expect(required('')).to.eql(false);
		expect(required({})).to.eql(false);
		expect(required([])).to.eql(false);
		expect(required(null)).to.eql(false);
		expect(required(undefined)).to.eql(false);
	});
};

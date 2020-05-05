'use strict';

module.exports = (it, expect, { rules }) => {
	const { phone } = rules;

	it('should pass "phone" rule when value is a phone number', () =>
	{
		expect(phone({ value: '+61 1 2345 6789' })).to.eql(true);
		expect(phone({ value: '+61 01 2345 6789' })).to.eql(true);
		expect(phone({ value: '01 2345 6789' })).to.eql(true);
		expect(phone({ value: '01-2345-6789' })).to.eql(true);
		expect(phone({ value: '(01) 2345 6789' })).to.eql(true);
		expect(phone({ value: '(01) 2345-6789' })).to.eql(true);
		expect(phone({ value: '5555555555' })).to.eql(true);
		expect(phone({ value: '(555) 555 5555' })).to.eql(true);
		expect(phone({ value: '555 555 5555' })).to.eql(true);
		expect(phone({ value: '+15555555555' })).to.eql(true);
		expect(phone({ value: '555-555-5555' })).to.eql(true);
	});

	it('should fail "phone" rule when value is null valid phone number', () =>
	{
		expect(phone({ value: '234' })).to.eql(false);
		expect(phone({ value: '+(3) - 4 32' })).to.eql(false);
		expect(phone({ value: '234 2344234234234234 234 - 324' })).to.eql(false);
	});
};

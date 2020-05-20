
'use strict';

module.exports =  (it, expect, { rules }) => {
	const { date_equals } = rules;

	it('should not fail the date_equals rule', () => {
		expect(date_equals({ value: '4-22-1997', parameters: ['4-22-1997'] })).to.eql(true);
		expect(date_equals({ value: '4/22/1997', parameters: ['4/22/1997'] })).to.eql(true);
		expect(date_equals({ value: 'April 22 1997', parameters: ['April 22 1997'] })).to.eql(true);
		expect(date_equals({ value: '4.22.1997', parameters: ['4.22.1997'] })).to.eql(true);
		expect(date_equals({ value: 'Tuesday April 22 1997', parameters: ['Tuesday April 22 1997'] })).to.eql(true);
	});

	it('should fail date_equals rule', () => {
		expect(date_equals({ value: '4-22-1997', parameters: ['4-23-1997'] })).to.eql(false);
		expect(date_equals({ value: 'asdfasdf', parameters: ['4-22-1997'] })).to.eql(false);
		expect(date_equals({ value: '4.22.1999', parameters: ['asdfasdf'] })).to.eql(false);
		expect(date_equals({ value: '3.1997.2', parameters: ['23423423']})).to.eql(false);
	})
};

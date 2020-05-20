
'use strict';

module.exports =  (it, expect, { rules }) => {
	const { before } = rules;

	it('should not fail before (date) rule', () => {
		expect(before({ value: '4-22-1997', parameters: ['4-23-1997'] })).to.eql(true);
		expect(before({ value: '4/22/1997', parameters: ['4/23/1997'] })).to.eql(true);
		expect(before({ value: 'April 22 1997', parameters: ['April 23 1997'] })).to.eql(true);
		expect(before({ value: '4.22.1997', parameters: ['4.23.1997'] })).to.eql(true);
		expect(before({ value: 'Tuesday April 22 1997', parameters: ['Tuesday April 23 1997'] })).to.eql(true);
	});

	it('should fail before (date) rule', () => {
		expect(before({ value: '4-22-1997', parameters: ['4-22-1997'] })).to.eql(false);
		expect(before({ parameters: ['4-22-1997'], value: '4-23-1997' })).to.eql(false);
		expect(before({ parameters: ['4/22/1997'], value: '4/23/1997' })).to.eql(false);
		expect(before({ parameters: ['April 22 1997'], value: 'April 23 1997' })).to.eql(false);
		expect(before({ parameters: ['4.22.1997'], value: '4.23.1997' })).to.eql(false);
		expect(before({ parameters: ['Tuesday April 22 1997'], value: 'Tuesday April 23 1997' })).to.eql(false);
	})
};


'use strict';

module.exports =  (it, expect, { rules }) => {
	const { after } = rules;

	it('should not fail after (date) rule', () => {
		expect(after({ parameters: ['4-22-1997'], value: '4-23-1997' })).to.eql(true);
		expect(after({ parameters: ['4/22/1997'], value: '4/23/1997' })).to.eql(true);
		expect(after({ parameters: ['April 22 1997'], value: 'April 23 1997' })).to.eql(true);
		expect(after({ parameters: ['4.22.1997'], value: '4.23.1997' })).to.eql(true);
		expect(after({ parameters: ['Tuesday April 22 1997'], value: 'Tuesday April 23 1997' })).to.eql(true);
	});

	it('should fail after (date) rule', () => {
		expect(after({ value: '4-22-1997', parameters: ['4-22-1997'] })).to.eql(false);
		expect(after({ value: '4-22-1997', parameters: ['4-23-1997'] })).to.eql(false);
		expect(after({ value: '4/22/1997', parameters: ['4/23/1997'] })).to.eql(false);
		expect(after({ value: 'April 22 1997', parameters: ['April 23 1997'] })).to.eql(false);
		expect(after({ value: '4.22.1997', parameters: ['4.23.1997'] })).to.eql(false);
		expect(after({ value: 'Tuesday April 22 1997', parameters: ['Tuesday April 23 1997'] })).to.eql(false);
	});
};

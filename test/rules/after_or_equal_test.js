
'use strict';

module.exports =  (it, expect, { rules }) => {
	const { after_or_equal } = rules;

	it('should fail after_or_equal (date) rule', () => {
		expect(after_or_equal({ value: '4-22-1997', parameters: ['4-23-1997'] })).to.eql(false);
		expect(after_or_equal({ value: '4/22/1997', parameters: ['4/23/1997'] })).to.eql(false);
		expect(after_or_equal({ value: 'April 22 1997', parameters: ['April 23 1997'] })).to.eql(false);
		expect(after_or_equal({ value: '4.22.1997', parameters: ['4.23.1997'] })).to.eql(false);
		expect(after_or_equal({ value: 'Tuesday April 22 1997', parameters: ['Tuesday April 23 1997'] })).to.eql(false);
	});

	it('should not fail after_or_equal (date) rule', () => {
		expect(after_or_equal({ parameters: ['4-22-1997'], value: '4-22-1997' })).to.eql(true);
		expect(after_or_equal({ parameters: ['4-22-1997'], value: '4-23-1997' })).to.eql(true);
		expect(after_or_equal({ parameters: ['4/22/1997'], value: '4/23/1997' })).to.eql(true);
		expect(after_or_equal({ parameters: ['April 22 1997'], value: 'April 23 1997' })).to.eql(true);
		expect(after_or_equal({ parameters: ['4.22.1997'], value: '4.23.1997' })).to.eql(true);
		expect(after_or_equal({ parameters: ['Tuesday April 22 1997'], value: 'Tuesday April 23 1997' })).to.eql(true);
	})
};
